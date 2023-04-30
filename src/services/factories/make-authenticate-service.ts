import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const usersReposistory = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersReposistory)

  return authenticateService
}
