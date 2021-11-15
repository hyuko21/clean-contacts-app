import { makeAppResponse } from '@/presentation/helpers'
import { isCelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  if (isCelebrateError(error)) {
    const errorMessage = error.details.get('body')?.message
    const appResponse = makeAppResponse({ error: errorMessage })
    response.status(200).json(appResponse)
  } else {
    next()
  }
}
