import { IDeleteContactByIdUseCase } from '@/domain/usecases'
import { HttpResponse, IController } from '@/presentation/protocols'
import { makeAppResponse, ok } from '@/presentation/helpers'

export class DeleteContactByIdController implements IController {
  constructor (
    private readonly deleteContactByIdUseCase: IDeleteContactByIdUseCase
  ) {}

  async handle (request: DeleteContactByIdController.Request): Promise<HttpResponse> {
    await this.deleteContactByIdUseCase.execute({ id: request.contactId })
    return ok(makeAppResponse())
  }
}

export namespace DeleteContactByIdController {
  export type Request = {
    contactId: string
  }
}
