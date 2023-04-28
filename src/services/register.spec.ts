import { describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'Jane Doe',
      email: 'janedoeaa@example.com',
      password: 'imjanedoe123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute({
      name: 'Jane Doe',
      email: 'janedoeaa@example.com',
      password: 'imjanedoe123',
    })

    await expect(() =>
      registerService.execute({
        name: 'Jane Doe',
        email: 'janedoeaa@example.com',
        password: 'imjanedoe123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
