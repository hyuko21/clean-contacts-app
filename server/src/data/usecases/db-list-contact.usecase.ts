import { IListContactUseCase } from '@/domain/usecases'
import { IListContactRepository } from '@/data/protocols/db'

export class DbListContactUseCase implements IListContactUseCase {
  constructor (
    private readonly listContactRepository: IListContactRepository
  ) {}

  async execute (): Promise<IListContactUseCase.Result> {
    return this.listContactRepository.list()
  }
}
