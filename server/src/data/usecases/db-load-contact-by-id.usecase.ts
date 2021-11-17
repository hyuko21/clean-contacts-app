import { ILoadContactByIdUseCase } from '@/domain/usecases'
import { ILoadContactByIdRepository } from '@/data/protocols/db'

export class DbLoadContactByIdUseCase implements ILoadContactByIdUseCase {
  constructor (
    private readonly loadContactByIdRepository: ILoadContactByIdRepository
  ) {}

  async execute (params: ILoadContactByIdUseCase.Params): Promise<ILoadContactByIdUseCase.Result> {
    return this.loadContactByIdRepository.loadById(params)
  }
}
