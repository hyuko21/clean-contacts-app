import faker from 'faker'
import * as testDb from '@/test-helpers/db'
import { mockAddOneContact, mockAddManyContact } from './test-helpers/fs-contacts'
import { FileSystemContactsRepository } from './fs-contacts.repository'
import {
  mockAddContactUseCaseParams,
  mockSaveContactUseCaseParams
} from '@/domain/mocks/mock-usecases'

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

  describe('list()', () => {
    it('should return empty if no contacts exists', async () => {
      const result = await sut.list()
      expect(result).toEqual([])
    })

    it('should return contacts list on success', async () => {
      const existingContacts = await mockAddManyContact()
      const result = await sut.list()
      expect(result).toEqual(expect.arrayContaining(existingContacts))
    })
  })

  describe('loadById()', () => {
    it('should return null if no contact exists by id', async () => {
      const contactId = faker.datatype.uuid()
      const result = await sut.loadById({ id: contactId })
      expect(result).toBeNull()
    })

    it('should return contact with correct data on success', async () => {
      const existingContacts = await mockAddManyContact()
      const randomContact = faker.random.arrayElement(existingContacts)

      const result = await sut.loadById({ id: randomContact.id })

      expect(result).toEqual(randomContact)
    })
  })

  describe('save()', () => {
    it('should return null if no contact exists by id', async () => {
      const result = await sut.save(mockSaveContactUseCaseParams())
      expect(result).toBeNull()
    })

    it('should not update if params is empty', async () => {
      const existingContacts = await mockAddManyContact()
      const randomContact = faker.random.arrayElement(existingContacts)

      const result = await sut.save({ contactId: randomContact.id })

      expect(result).toEqual(randomContact)
    })

    it('should only update desired params', async () => {
      const existingContacts = await mockAddManyContact()
      const randomContact = faker.random.arrayElement(existingContacts)

      const saveContactUseCaseParams = mockSaveContactUseCaseParams()
      const result = await sut.save({
        email: saveContactUseCaseParams.email,
        phone: saveContactUseCaseParams.phone,
        address: {
          city: saveContactUseCaseParams.address?.city
        },
        contactId: randomContact.id
      })

      expect(result).toEqual({
        ...randomContact,
        email: saveContactUseCaseParams.email,
        phone: saveContactUseCaseParams.phone,
        address: {
          ...randomContact.address,
          city: saveContactUseCaseParams.address?.city
        },
        contactId: undefined
      })
    })

    it('should update and return contact with correct data on success', async () => {
      const existingContacts = await mockAddManyContact()
      const randomContact = faker.random.arrayElement(existingContacts)

      const saveContactUseCaseParams = mockSaveContactUseCaseParams()
      const result = await sut.save({
        ...saveContactUseCaseParams,
        contactId: randomContact.id
      })

      expect(result).toEqual({
        id: randomContact.id,
        ...saveContactUseCaseParams,
        contactId: undefined
      })
    })
  })

  describe('loadById()', () => {
    it('should return false if contact not deleted by id', async () => {
      const contactId = faker.datatype.uuid()
      const result = await sut.deleteById({ id: contactId })
      expect(result).toBe(false)
    })

    it('should return true and delete correct contact', async () => {
      const existingContacts = await mockAddManyContact()
      const randomContact = faker.random.arrayElement(existingContacts)

      const result = await sut.deleteById({ id: randomContact.id })

      const stillContacts = await sut.repository.find()
      expect(result).toBe(true)
      expect(stillContacts).toEqual(
        existingContacts.filter(item => item.id !== randomContact.id)
      )
    })
  })
})
