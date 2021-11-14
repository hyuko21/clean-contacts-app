import { ICheckContactByEmailRepository } from '@/data/protocols/db'

export class CheckContactByEmailRepositorySpy implements ICheckContactByEmailRepository {
  params?: ICheckContactByEmailRepository.Params
  result = true

  async checkByEmail (params: ICheckContactByEmailRepository.Params): Promise<ICheckContactByEmailRepository.Result> {
    this.params = params
    return this.result
  }
}
