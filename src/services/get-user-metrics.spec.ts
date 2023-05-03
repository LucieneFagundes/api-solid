import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Ger User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to get check-ins count from metrics', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
