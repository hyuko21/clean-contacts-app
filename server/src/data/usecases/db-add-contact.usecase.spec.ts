import faker from 'faker'
import { AddContactRepositorySpy, CheckContactByEmailRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { IAddContactUseCase } from '@/domain/usecases'
import { DbAddContactUseCase } from './db-add-contact.usecase'

type SutTypes = {
  sut: DbAddContactUseCase
  checkContactByEmailRepository: CheckContactByEmailRepositorySpy
  addContactRepository: AddContactRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkContactByEmailRepository = new CheckContactByEmailRepositorySpy()
  const addContactRepository = new AddContactRepositorySpy()
  const sut = new DbAddContactUseCase(checkContactByEmailRepository, addContactRepository)
  return { sut, checkContactByEmailRepository, addContactRepository }
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

  describe('when contact by email not found', () => {
    beforeEach(() => {
      jest.spyOn(sutTypes.checkContactByEmailRepository, 'checkByEmail')
        .mockResolvedValueOnce(false)
    })

    describe('AddContact Repository dependency', () => {
      it('should call add() with correct params', async () => {
        const { sut, addContactRepository } = sutTypes
        const params = mockParams()

        await sut.execute(params)

        expect(addContactRepository.params).toEqual(params)
      })

      it('should return same as add() returns', async () => {
        const { sut, addContactRepository } = sutTypes
        const result = await sut.execute(mockParams())
        expect(result).toBe(addContactRepository.result)
      })
    })
  })
})
