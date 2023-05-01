import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryGymRepository } from 'src/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInService

describe('Check In Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Gan Academy',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9792537),
      longitude: new Decimal(-43.6477965),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -22.9792537,
      userLongitude: -43.6477965,
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(expect.any(String))
  })

  it('should not be possible to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9792537,
      userLongitude: -43.6477965,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.9792537,
        userLongitude: -43.6477965,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be possible to check in twice, but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9792537,
      userLongitude: -43.6477965,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9792537,
      userLongitude: -43.6477965,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('It should not be possible to check in at a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gan Academy',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9781497),
      longitude: new Decimal(-43.640426),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -22.9792537,
        userLongitude: -43.6477965,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
