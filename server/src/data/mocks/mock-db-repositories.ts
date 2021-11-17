import {
  IAddContactRepository,
  ICheckContactByEmailRepository,
  IListContactRepository
} from '@/data/protocols/db'
import { mockManyContactModel } from '@/domain/mocks/mock-models'

export class CheckContactByEmailRepositorySpy implements ICheckContactByEmailRepository {
  params?: ICheckContactByEmailRepository.Params
  result = true

  async checkByEmail (params: ICheckContactByEmailRepository.Params): Promise<ICheckContactByEmailRepository.Result> {
    this.params = params
    return this.result
  }
}

export class AddContactRepositorySpy implements IAddContactRepository {
  params?: IAddContactRepository.Params
  result = true

  async add (params: IAddContactRepository.Params): Promise<ICheckContactByEmailRepository.Result> {
    this.params = params
    return this.result
  }
}

export class ListContactRepositorySpy implements IListContactRepository {
  result = mockManyContactModel()

  async list (): Promise<IListContactRepository.Result> {
    return this.result
  }
}
