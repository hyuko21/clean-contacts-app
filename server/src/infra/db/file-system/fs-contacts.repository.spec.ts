import faker from 'faker'
import * as testDb from '@/test-helpers/db'
import { mockAddOneContact } from './test-helpers/fs-contacts'
import { FileSystemContactsRepository } from './fs-contacts.repository'
import { mockAddContactUseCaseParams } from '@/domain/mocks/mock-usecases'

const makeSut = (): FileSystemContactsRepository => {
  return new FileSystemContactsRepository()
}

describe('Contacts FileSystem Repository', () => {
  let sut: FileSystemContactsRepository

  beforeAll(async () => {
    sut = makeSut()
    await testDb.connect(sut)
  })

  beforeEach(async () => {
    sut = makeSut()
    await testDb.clear(sut)
  })

  afterAll(async () => {
    await testDb.clear(sut)
  })

  describe('checkByEmail()', () => {
    it('should return true if contact found by email', async () => {
      const params = mockAddContactUseCaseParams()
      await mockAddOneContact(params)

      const result = await sut.checkByEmail({ email: params.email })

      expect(result).toBe(true)
    })

    it('should return false if contact not found by email', async () => {
      await mockAddOneContact(mockAddContactUseCaseParams())
      const result = await sut.checkByEmail({ email: faker.internet.email() })
      expect(result).toBe(false)
    })
  })

  describe('add()', () => {
    it('should return true and insert contact on success', async () => {
      const params = mockAddContactUseCaseParams()

      const result = await sut.add(params)

      const [addedContact] = await sut.repository.find()
      expect(result).toBe(true)
      expect(addedContact).toEqual(expect.objectContaining(params))
    })
  })
})
