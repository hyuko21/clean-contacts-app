import { IDeleteContactByIdUseCase } from '@/domain/usecases'
import { IDeleteContactByIdRepository } from '@/data/protocols/db'

export class DbDeleteContactByIdUseCase implements IDeleteContactByIdUseCase {
  constructor (
    private readonly deleteContactByIdRepository: IDeleteContactByIdRepository
  ) {}

  async execute (params: IDeleteContactByIdUseCase.Params): Promise<IDeleteContactByIdUseCase.Result> {
    return this.deleteContactByIdRepository.deleteById(params)
  }
}
