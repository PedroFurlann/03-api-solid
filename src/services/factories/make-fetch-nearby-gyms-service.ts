import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsUseCase(gymsRepository)

  return service
}
