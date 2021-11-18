import { IAddContactUseCase } from '@/domain/usecases'
import { IController, HttpResponse } from '@/presentation/protocols'
import { ok, makeAppResponse } from '@/presentation/helpers'

export class AddContactController implements IController {
  constructor (private readonly addContactUseCase: IAddContactUseCase) {}

  async handle (request: AddContactController.Request): Promise<HttpResponse> {
    const isValid = await this.addContactUseCase.execute(request)
    let response = makeAppResponse()
    if (!isValid) {
      response = makeAppResponse({
        error: 'Contact for this e-mail address already exists'
      })
    }

    return ok(response)
  }
}

export namespace AddContactController {
  export interface Request {
    name: string
    email: string
    phone: string
    address: {
      country: string
      houseNumber: number
      streetName: string
      city: string
      state: string
    }
  }
}
