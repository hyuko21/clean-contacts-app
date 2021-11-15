import { IAddContactUseCase } from '@/domain/usecases'
import { IController, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class AddContactController implements IController {
  constructor (private readonly addContactUseCase: IAddContactUseCase) {}

  async handle (request: AddContactController.Request): Promise<HttpResponse> {
    const isValid = await this.addContactUseCase.execute({
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: {
        houseNumber: request.address.houseNumber,
        streetName: request.address.streetName,
        city: request.address.city,
        state: request.address.state
      }
    })
    const response = { success: isValid }

    return ok(response)
  }
}

export namespace AddContactController {
  export interface Request {
    name: string
    email: string
    phone: string
    address: {
      houseNumber: number
      streetName: string
      city: string
      state: string
    }
  }
}
