import { AddContactRepositorySpy, CheckContactByEmailRepositorySpy } from '@/data/mocks/mock-db-repositories'
import { DbAddContactUseCase } from './db-add-contact.usecase'
import { mockAddContactUseCaseParams } from '@/domain/mocks/mock-usecases'

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

describe('DbAddContact UseCase', () => {
  let sutTypes: SutTypes

  beforeEach(() => {
    sutTypes = makeSut()
  })

  describe('CheckContactByEmail Repository dependency', () => {
    it('should call checkByEmail() with correct params', async () => {
      const { sut, checkContactByEmailRepository } = sutTypes
      const params = mockAddContactUseCaseParams()

      await sut.execute(params)

      expect(checkContactByEmailRepository.params).toEqual({ email: params.email })
    })

    it('should return true if checkByEmail() returns false', async () => {
      const { sut, checkContactByEmailRepository } = sutTypes
      checkContactByEmailRepository.result = false

      const result = await sut.execute(mockAddContactUseCaseParams())

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
        const params = mockAddContactUseCaseParams()

        await sut.execute(params)

        expect(addContactRepository.params).toEqual(params)
      })
    })

    it('should return result with correct data on success', async () => {
      const { sut, addContactRepository } = sutTypes
      const result = await sut.execute(mockAddContactUseCaseParams())
      expect(result).toBe(addContactRepository.result)
    })
  })
})
