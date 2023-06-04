import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInService() {
  const gymsRepository = new PrismaGymsRepository()
  const checkInsRepository = new PrismaCheckInsRepository()

  const service = new CheckInUseCase(checkInsRepository, gymsRepository)

  return service
}
