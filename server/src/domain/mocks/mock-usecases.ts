import faker from 'faker'
import {
  IAddContactUseCase,
  IDeleteContactByIdUseCase,
  IListContactUseCase,
  ILoadContactByIdUseCase,
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

export class LoadContactByIdUseCaseSpy implements ILoadContactByIdUseCase {
  params?: ILoadContactByIdUseCase.Params
  result: ILoadContactByIdUseCase.Result = mockContactModel()

  async execute (params: ILoadContactByIdUseCase.Params): Promise<ILoadContactByIdUseCase.Result> {
    this.params = params
    return this.result
  }
}

export class DeleteContactByIdUseCaseSpy implements IDeleteContactByIdUseCase {
  params?: IDeleteContactByIdUseCase.Params
  result = true

  async execute (params: IDeleteContactByIdUseCase.Params): Promise<IDeleteContactByIdUseCase.Result> {
    this.params = params
    return this.result
  }
}

export const mockAddContactUseCaseParams = (): IAddContactUseCase.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    country: faker.address.countryCode(),
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})

export const mockSaveContactUseCaseParams = (): ISaveContactUseCase.Params => ({
  contactId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  address: {
    country: faker.address.countryCode(),
    houseNumber: faker.datatype.number(),
    streetName: faker.address.streetName(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr()
  }
})

export const mockLoadContactByIdUseCaseParams = (): ILoadContactByIdUseCase.Params => ({
  id: faker.datatype.uuid()
})

export const mockDeleteContactByIdUseCaseParams = (): IDeleteContactByIdUseCase.Params => ({
  id: faker.datatype.uuid()
})
