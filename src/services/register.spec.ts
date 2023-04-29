import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jane Doe',
      email: 'janedoeaa@example.com',
      password: 'imjanedoe123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jane Doe',
      email: 'janedoeaa@example.com',
      password: 'imjanedoe123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'imjanedoe123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Jane Doe',
      email: 'janedoeaa@example.com',
      password: 'imjanedoe123',
    })

    await expect(() =>
      sut.execute({
        name: 'Jane Doe',
        email: 'janedoeaa@example.com',
        password: 'imjanedoe123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
