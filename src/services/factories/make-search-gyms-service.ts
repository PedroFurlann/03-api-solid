import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeGetUserMetricsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new SearchGymsUseCase(gymsRepository)

  return service
}
