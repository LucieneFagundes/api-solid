import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-ins Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.only('should be possible to fetch check-in history', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it.only('should be possible to fetch paginated check-in history', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
