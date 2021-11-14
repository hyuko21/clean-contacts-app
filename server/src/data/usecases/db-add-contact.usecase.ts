import { IAddContactUseCase } from '@/domain/usecases'
import { ICheckContactByEmailRepository } from '@/data/protocols/db'

export class DbAddContactUseCase implements IAddContactUseCase {
  constructor (private readonly checkContactByEmailRepository: ICheckContactByEmailRepository) {}

  async execute (params: IAddContactUseCase.Params): Promise<IAddContactUseCase.Result> {
    const exists = await this.checkContactByEmailRepository.checkByEmail({ email: params.email })
    let isValid = false
    if (!exists) {
      isValid = true
    }
    return isValid
  }
}
