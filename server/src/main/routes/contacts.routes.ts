import { adaptExpressRoute } from '@/main/adapters'
import { makeAddContactsController } from '@/main/factories/controllers/contacts-controllers.factory'
import { Router } from 'express'
import { AddContactValidation } from './validations/contacts.validation'

export default (router: Router): void => {
  router.post('/contacts', AddContactValidation, adaptExpressRoute(makeAddContactsController()))
}
