import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins-repository'

interface FetchUserCheckInsHistoryUseCaseServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseServiceRequest): Promise<FetchUserCheckInsHistoryUseCaseServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
