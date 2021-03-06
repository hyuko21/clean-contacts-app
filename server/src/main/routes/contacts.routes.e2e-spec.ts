
import faker from 'faker'
import request from 'supertest'
import * as testDb from '@/test-helpers/db'
import * as testApp from '@/test-helpers/app'
import setupContactsRoutes from './contacts.routes'
import { mockAddManyContact, mockAddOneContact } from '@/infra/db/file-system/test-helpers/fs-contacts'
import { FileSystemContactsRepository } from '@/infra/db/file-system'
import { mockAddContactRequest, mockSaveContactRequest } from '@/presentation/mocks/mock-controllers'
import { ContactModel } from '@/domain/models'

describe('Contacts Routes', () => {
  const contactsRepository = new FileSystemContactsRepository()
  const basePath = '/contacts'
  let agentTest: request.SuperTest<request.Test>
  let requestTest: request.Test

  beforeAll(async () => {
    await testDb.connect(contactsRepository)
    const { app, router } = testApp.mockApp()
    setupContactsRoutes(router)
    agentTest = request(app)
  })

  beforeEach(async () => {
    await testDb.clear(contactsRepository)
  })

  afterAll(async () => {
    await testDb.clear(contactsRepository)
  })

  describe('POST /', () => {
    const apiPath = `${basePath}/`
    let requestBody: any

    beforeEach(() => {
      requestBody = mockAddContactRequest()
      requestTest = agentTest.post(apiPath).send(requestBody)
    })

    it('should return 200 with `success` as false if contact already exists', async () => {
      await mockAddOneContact(requestBody)
      await requestTest.expect(200, {
        success: false,
        error: 'Contact for this e-mail address already exists'
      })
    })

    describe('when contact is invalid should return 200 with `success` as false', () => {
      it('if contact "name" is missing', async () => {
        requestBody.name = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"name" is required' })
      })

      it('if contact "name" is empty', async () => {
        requestBody.name = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"name" is not allowed to be empty' })
      })

      it('if contact "name" is invalid', async () => {
        requestBody.name = faker.datatype.number()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"name" must be a string' })
      })

      it('if contact "email" is missing', async () => {
        requestBody.email = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"email" is required' })
      })

      it('if contact "email" is empty', async () => {
        requestBody.email = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"email" is not allowed to be empty' })
      })

      it('if contact "email" is invalid', async () => {
        requestBody.email = faker.random.word()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"email" must be a valid email' })
      })

      it('if contact "phone" is missing', async () => {
        requestBody.phone = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"phone" is required' })
      })

      it('if contact "phone" is empty', async () => {
        requestBody.phone = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"phone" is not allowed to be empty' })
      })

      it('if contact "phone" is invalid', async () => {
        requestBody.phone = faker.datatype.number()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"phone" must be a string' })
      })

      it('if contact "address.houseNumber" is missing', async () => {
        requestBody.address.houseNumber = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.houseNumber" is required' })
      })

      it('if contact "address.houseNumber" is invalid', async () => {
        requestBody.address.houseNumber = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.houseNumber" must be a number' })
      })

      it('if contact "address.streetName" is missing', async () => {
        requestBody.address.streetName = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.streetName" is required' })
      })

      it('if contact "address.streetName" is empty', async () => {
        requestBody.address.streetName = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.streetName" is not allowed to be empty' })
      })

      it('if contact "address.streetName" is invalid', async () => {
        requestBody.address.streetName = faker.datatype.number()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.streetName" must be a string' })
      })

      it('if contact "address.city" is missing', async () => {
        requestBody.address.city = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.city" is required' })
      })

      it('if contact "address.city" is empty', async () => {
        requestBody.address.city = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.city" is not allowed to be empty' })
      })

      it('if contact "address.city" is invalid', async () => {
        requestBody.address.city = faker.datatype.number()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.city" must be a string' })
      })

      it('if contact "address.state" is missing', async () => {
        requestBody.address.state = undefined
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.state" is required' })
      })

      it('if contact "address.state" is empty', async () => {
        requestBody.address.state = ''
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.state" is not allowed to be empty' })
      })

      it('if contact "address.state" is invalid', async () => {
        requestBody.address.state = faker.datatype.number()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"address.state" must be a string' })
      })

      it('if contact has unknown property', async () => {
        requestBody.unknown = faker.random.word()
        await requestTest.send(requestBody)
          .expect(200, { success: false, error: '"unknown" is not allowed' })
      })
    })

    it('should return 200 with `success` as true', async () => {
      await requestTest.expect(200, { success: true })
    })
  })

  describe('GET /', () => {
    const apiPath = `${basePath}/`

    beforeEach(() => {
      requestTest = agentTest.get(apiPath)
    })

    it('should return 200 with `success` as true and result empty if no contacts exists', async () => {
      await requestTest.expect(200, {
        success: true,
        result: []
      })
    })

    it('should return 200 with `success` as true and result with correct data', async () => {
      const existingContacts = await mockAddManyContact()
      await requestTest.expect(200)
        .expect(({ body }) => {
          expect(body).toEqual({
            success: true,
            result: expect.arrayContaining(existingContacts)
          })
        })
    })
  })

  describe('PATCH /:contactId', () => {
    const apiPath = (contactId = faker.datatype.uuid()) => `${basePath}/${contactId}`

    it('should return 404 if contact not found by id', async () => {
      await agentTest.patch(apiPath()).expect(404, { error: 'Contact not found' })
    })

    describe('when contact exists', () => {
      let contact: ContactModel
      let requestBody: any

      beforeEach(async () => {
        contact = await mockAddOneContact()
        requestBody = {
          ...mockSaveContactRequest(),
          contactId: undefined
        }
        requestTest = agentTest.patch(apiPath(contact.id))
      })

      it('should return 200 with `success` as true even with empty body', async () => {
        requestBody = {}
        await requestTest.send(requestBody)
          .expect(200, { success: true, result: contact })
      })

      describe('when contact is invalid should return 200 with `success` as false', () => {
        it('if contact "name" is empty', async () => {
          requestBody.name = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"name" is not allowed to be empty' })
        })

        it('if contact "name" is invalid', async () => {
          requestBody.name = faker.datatype.number()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"name" must be a string' })
        })

        it('if contact "email" is empty', async () => {
          requestBody.email = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"email" is not allowed to be empty' })
        })

        it('if contact "email" is invalid', async () => {
          requestBody.email = faker.random.word()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"email" must be a valid email' })
        })

        it('if contact "phone" is empty', async () => {
          requestBody.phone = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"phone" is not allowed to be empty' })
        })

        it('if contact "phone" is invalid', async () => {
          requestBody.phone = faker.datatype.number()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"phone" must be a string' })
        })

        it('if contact "address.houseNumber" is invalid', async () => {
          requestBody.address.houseNumber = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.houseNumber" must be a number' })
        })

        it('if contact "address.streetName" is empty', async () => {
          requestBody.address.streetName = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.streetName" is not allowed to be empty' })
        })

        it('if contact "address.streetName" is invalid', async () => {
          requestBody.address.streetName = faker.datatype.number()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.streetName" must be a string' })
        })

        it('if contact "address.city" is empty', async () => {
          requestBody.address.city = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.city" is not allowed to be empty' })
        })

        it('if contact "address.city" is invalid', async () => {
          requestBody.address.city = faker.datatype.number()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.city" must be a string' })
        })

        it('if contact "address.state" is empty', async () => {
          requestBody.address.state = ''
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.state" is not allowed to be empty' })
        })

        it('if contact "address.state" is invalid', async () => {
          requestBody.address.state = faker.datatype.number()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"address.state" must be a string' })
        })

        it('if contact has unknown property', async () => {
          requestBody.unknown = faker.random.word()
          await requestTest.send(requestBody)
            .expect(200, { success: false, error: '"unknown" is not allowed' })
        })
      })

      it('should return 200 with `success` as true and `result` with correct data', async () => {
        await requestTest.send(requestBody).expect(200).expect(({ body }) => {
          expect(body).toEqual({
            success: true,
            result: {
              ...contact,
              ...requestBody
            }
          })
        })
      })
    })
  })

  describe('DELETE /:contactId', () => {
    const apiPath = (contactId = faker.datatype.uuid()) => `${basePath}/${contactId}`

    it('should return 404 if contact not found by id', async () => {
      await agentTest.delete(apiPath()).expect(404, { error: 'Contact not found' })
    })

    describe('when contact exists', () => {
      let existingContacts: ContactModel[]

      beforeEach(async () => {
        existingContacts = await mockAddManyContact()
      })

      it('should return 200 with `success` as true and delete contact on success', async () => {
        const contactToDelete = faker.random.arrayElement(existingContacts)
        await agentTest.delete(apiPath(contactToDelete.id))
          .expect(200, { success: true })
      })
    })
  })
})
