import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'GAN ACADEMY',
      description: null,
      phone: null,
      latitude: -22.9792537,
      longitude: -43.6477965,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
