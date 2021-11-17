import { ISaveContactUseCase } from '@/domain/usecases'
import { ISaveContactRepository } from '@/data/protocols/db'

export class DbSaveContactUseCase implements ISaveContactUseCase {
  constructor (
    private readonly saveContactRepository: ISaveContactRepository
  ) {}

  async execute (params: ISaveContactUseCase.Params): Promise<ISaveContactUseCase.Result> {
    return this.saveContactRepository.save(params)
  }
}
