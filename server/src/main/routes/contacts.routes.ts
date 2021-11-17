import { adaptExpressRoute } from '@/main/adapters'
import {
  makeAddContactController,
  makeListContactController
} from '@/main/factories/controllers/contacts-controllers.factory'
import { Router } from 'express'
import { AddContactValidation } from './validations/contacts.validation'

export default (router: Router): void => {
  router.route('/contacts')
    .post(AddContactValidation, adaptExpressRoute(makeAddContactController()))
    .get(adaptExpressRoute(makeListContactController()))
}
