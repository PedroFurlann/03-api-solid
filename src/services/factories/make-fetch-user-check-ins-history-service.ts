import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return service
}
