import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch nearby gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to fetch nearby gyms', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
