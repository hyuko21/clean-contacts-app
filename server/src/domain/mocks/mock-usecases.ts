import faker from 'faker'
import {
  IAddContactUseCase,
  IListContactUseCase,
  ILoadByIdContactUseCase,
  ISaveContactUseCase
} from '@/domain/usecases'
import { mockContactModel, mockManyContactModel } from './mock-models'

export class AddContactUseCaseSpy implements IAddContactUseCase {
  params?: IAddContactUseCase.Params
  result = true

  async execute (params: IAddContactUseCase.Params): Promise<IAddContactUseCase.Result> {
    this.params = params
    return this.result
  }
}

export class ListContactUseCaseSpy implements IListContactUseCase {
  result = mockManyContactModel()

  async execute (): Promise<IListContactUseCase.Result> {
    return this.result
  }
}

export class SaveContactUseCaseSpy implements ISaveContactUseCase {
  params?: ISaveContactUseCase.Params
  result = mockContactModel()

  async execute (params: ISaveContactUseCase.Params): Promise<ISaveContactUseCase.Result> {
    this.params = params
    return this.result
  }
}

export class LoadByIdContactUseCaseSpy implements ILoadByIdContactUseCase {
  params?: ILoadByIdContactUseCase.Params
  result: ILoadByIdContactUseCase.Result = mockContactModel()

  async execute (params: ILoadByIdContactUseCase.Params): Promise<ILoadByIdContactUseCase.Result> {
    this.params = params
    return this.result
  }
}

export const mockAddContactUseCaseParams = (): IAddContactUseCase.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})

export const mockSaveContactUseCaseParams = (): ISaveContactUseCase.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})
