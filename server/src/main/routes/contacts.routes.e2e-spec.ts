import request from 'supertest'
import * as testDb from '@/test-helpers/db'
import * as testApp from '@/test-helpers/app'
import setupContactsRoutes from './contacts.routes'
import { mockAddOneContact } from '@/infra/db/file-system/test-helpers/fs-contacts'
import { FileSystemContactsRepository } from '@/infra/db/file-system'
import { mockAddContactRequest } from '@/presentation/controllers/mocks/mock-contacts-controller'

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
      await requestTest.expect(200, { success: false, error: 'Contact is invalid' })
    })

    it('should return 200 with `success` as true', async () => {
      await requestTest.expect(200, { success: true })
    })
  })
})
