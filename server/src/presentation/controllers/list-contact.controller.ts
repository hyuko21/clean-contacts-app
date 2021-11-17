import { IListContactUseCase } from '@/domain/usecases'
import { HttpResponse, IController } from '@/presentation/protocols'
import { makeAppResponse, ok } from '@/presentation/helpers'

export class ListContactController implements IController {
  constructor (private readonly listContactUseCase: IListContactUseCase) {}

  async handle (): Promise<HttpResponse> {
    const contacts = await this.listContactUseCase.execute()
    const response = makeAppResponse({ result: contacts })
    return ok(response)
  }
}
