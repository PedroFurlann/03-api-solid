import { CheckInsRepository } from '../repositories/check-ins-repository'

interface GetUserMetricsUseCaseServiceRequest {
  userId: string
}

interface GetUserMetricsUseCaseServiceResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseServiceRequest): Promise<GetUserMetricsUseCaseServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
