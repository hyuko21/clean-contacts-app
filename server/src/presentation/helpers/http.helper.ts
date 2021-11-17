import { HttpResponse } from '@/presentation/protocols'
import { NotFoundError } from '@/presentation/errors'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (resourceName: string): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError(resourceName)
})
