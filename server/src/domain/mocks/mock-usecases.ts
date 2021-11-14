import { IAddContactUseCase } from '@/domain/usecases'
import faker from 'faker'

export class AddContactUseCaseSpy implements IAddContactUseCase {
  result = true

  async execute (params: IAddContactUseCase.Params): Promise<IAddContactUseCase.Result> {
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
