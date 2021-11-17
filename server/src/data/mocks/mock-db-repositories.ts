import {
  IAddContactRepository,
  ICheckContactByEmailRepository,
  IDeleteContactByIdRepository,
  IListContactRepository,
  ILoadContactByIdRepository,
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

export class LoadContactByIdRepositorySpy implements ILoadContactByIdRepository {
  params?: ILoadContactByIdRepository.Params
  result: ILoadContactByIdRepository.Result = mockContactModel()

  async loadById (params: ILoadContactByIdRepository.Params): Promise<ILoadContactByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class DeleteContactByIdRepositorySpy implements IDeleteContactByIdRepository {
  params?: IDeleteContactByIdRepository.Params
  result = true

  async deleteById (params: IDeleteContactByIdRepository.Params): Promise<IDeleteContactByIdRepository.Result> {
    this.params = params
    return this.result
  }
}
