import {
  IAddContactRepository,
  ICheckContactByEmailRepository,
  IListContactRepository,
  ISaveContactRepository
} from '@/data/protocols/db'
import { mockContactModel, mockManyContactModel } from '@/domain/mocks/mock-models'

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

  async add (params: IAddContactRepository.Params): Promise<IAddContactRepository.Result> {
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

export class SaveContactRepositorySpy implements ISaveContactRepository {
  params?: ISaveContactRepository.Params
  result = mockContactModel()

  async save (params: ISaveContactRepository.Params): Promise<ISaveContactRepository.Result> {
    this.params = params
    return this.result
  }
}
