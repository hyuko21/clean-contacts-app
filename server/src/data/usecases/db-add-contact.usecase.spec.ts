import faker from 'faker'
import { CheckContactByEmailRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { IAddContactUseCase } from '@/domain/usecases'
import { DbAddContactUseCase } from './db-add-contact.usecase'

type SutTypes = {
  sut: DbAddContactUseCase
  checkContactByEmailRepository: CheckContactByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkContactByEmailRepository = new CheckContactByEmailRepositorySpy()
  const sut = new DbAddContactUseCase(checkContactByEmailRepository)
  return { sut, checkContactByEmailRepository }
}

const mockParams = (): IAddContactUseCase.Params => ({
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

describe('DbAddContact UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('CheckContactByEmail Repository dependency', () => {
    it('should call checkByEmail() with correct params', async () => {
      const { sut, checkContactByEmailRepository } = sutTypes
      const params = mockParams()

      await sut.execute(params)

      expect(checkContactByEmailRepository.params).toEqual({ email: params.email })
    })

    it('should return true if checkByEmail() returns false', async () => {
      const { sut, checkContactByEmailRepository } = sutTypes
      checkContactByEmailRepository.result = false

      const result = await sut.execute(mockParams())

      expect(result).toBe(true)
    })
  })
})
