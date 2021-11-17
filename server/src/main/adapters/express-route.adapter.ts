import { Request, RequestHandler, Response } from 'express'
import { IController } from '@/presentation/protocols'

export const adaptExpressRoute = (controller: IController): RequestHandler => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...(request.body ?? {}),
      ...(request.params ?? {}),
      contactId: request.contactId
    }

    const httpResponse = await controller.handle(requestData)
    response.status(httpResponse.statusCode)

    if (response.statusCode >= 200 && response.statusCode <= 299) {
      response.json(httpResponse.body)
    } else {
      response.json({ error: httpResponse.body.message })
    }
  }
}
