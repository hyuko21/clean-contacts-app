import { NextFunction, Request, RequestHandler, Response } from 'express'
import { IMiddleware } from '@/presentation/protocols'

export const adaptExpressMiddleware = (middleware: IMiddleware): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      ...(request.params ?? {}),
      ...(request.headers ?? {})
    }
    const httpResponse = await middleware.handle(requestData)
    response.status(httpResponse.statusCode)

    if (response.statusCode >= 200 && response.statusCode <= 299) {
      Object.assign(request, httpResponse.body)
      next()
    } else {
      response.json({ error: httpResponse.body.message })
    }
  }
}
