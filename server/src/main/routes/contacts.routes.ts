import { adaptExpressRoute } from '@/main/adapters'
import {
  makeAddContactController,
  makeListContactController,
  makeSaveContactController
} from '@/main/factories/controllers/contacts-controllers.factory'
import { Router } from 'express'
import { AddContactValidation, SaveContactValidation } from './validations/contacts.validation'

export default (router: Router): void => {
  router.route('/contacts/:contactId?')
    .post(AddContactValidation, adaptExpressRoute(makeAddContactController()))
    .get(adaptExpressRoute(makeListContactController()))
    .patch(SaveContactValidation, adaptExpressRoute(makeSaveContactController()))
}
