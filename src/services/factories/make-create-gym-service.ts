import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new CreateGymUseCase(gymsRepository)

  return service
}
