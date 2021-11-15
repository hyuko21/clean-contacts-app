import { adaptExpressRoute } from '@/main/adapters'
import { makeAddContactsController } from '@/main/factories/controllers/contacts-controllers.factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/contacts', adaptExpressRoute(makeAddContactsController()))
}
