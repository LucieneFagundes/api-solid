import { PrismaCheckInsRepository } from 'src/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms-repository'
import { CheckInService } from '../check-in'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const service = new CheckInService(checkInsRepository, gymsRepository)

  return service
}
