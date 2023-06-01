import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsUseCase(checkInsRepository)

  return service
}
