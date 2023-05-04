import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be possible to search gyms by name', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    await gymsRepository.create({
      title: 'Umbrella Academy',
      description: null,
      phone: null,
      latitude: -22.9792537,
      longitude: -43.6477965,
    })

    await gymsRepository.create({
      title: 'Salvatore Academy',
      description: null,
      phone: null,
      latitude: -22.9792537,
      longitude: -43.6477965,
    })

    const { gyms } = await sut.execute({
      query: 'Academy',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Umbrella Academy' }),
      expect.objectContaining({ title: 'Salvatore Academy' }),
    ])
  })

  it('should be possible to fetch paginated gyms search', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Umbrella Academy ${i}`,
        description: null,
        phone: null,
        latitude: -22.9792537,
        longitude: -43.6477965,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Umbrella Academy',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Umbrella Academy 21' }),
      expect.objectContaining({ title: 'Umbrella Academy 22' }),
    ])
  })
})
