import { adaptExpressRoute } from '@/main/adapters'
import {
  makeAddContactController,
  makeDeleteContactController,
  makeListContactController,
  makeSaveContactController
} from '@/main/factories/controllers/contacts-controllers.factory'
import { Router } from 'express'
import { checkContactById } from '@/main/middlewares'
import {
  AddContactValidation,
  SaveContactValidation
} from './validations/contacts.validation'

export default (router: Router): void => {
  router.route('/contacts/:contactId?')
    .post(AddContactValidation, adaptExpressRoute(makeAddContactController()))
    .get(adaptExpressRoute(makeListContactController()))
    .patch(SaveContactValidation, checkContactById, adaptExpressRoute(makeSaveContactController()))
    .delete(checkContactById, adaptExpressRoute(makeDeleteContactController()))
}
