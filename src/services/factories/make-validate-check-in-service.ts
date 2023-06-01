import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInUseCase(checkInsRepository)

  return service
}
