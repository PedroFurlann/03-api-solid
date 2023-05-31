import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface SearchGymsParams {
  query: string
  page: number
}

interface SearchGymsServiceResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsParams): Promise<SearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
