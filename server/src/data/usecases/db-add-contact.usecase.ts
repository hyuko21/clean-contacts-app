import { IAddContactUseCase } from '@/domain/usecases'
import { IAddContactRepository, ICheckContactByEmailRepository } from '@/data/protocols/db'

export class DbAddContactUseCase implements IAddContactUseCase {
  constructor (
    private readonly checkContactByEmailRepository: ICheckContactByEmailRepository,
    private readonly addContactRepository: IAddContactRepository
  ) {}

  async execute (params: IAddContactUseCase.Params): Promise<IAddContactUseCase.Result> {
    const exists = await this.checkContactByEmailRepository.checkByEmail({ email: params.email })
    let isValid = false
    if (!exists) {
      isValid = await this.addContactRepository.add(params)
    }
    return isValid
  }
}
