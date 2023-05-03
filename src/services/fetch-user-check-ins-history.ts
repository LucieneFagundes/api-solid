import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from 'src/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )
    return { checkIns }
  }
}
