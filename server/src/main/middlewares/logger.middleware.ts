import expressWinston from 'express-winston'
import { Logger } from '@/utils/logger'

export const loggerHandler = expressWinston.logger({
  winstonInstance: Logger,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  metaField: null, // this causes the metadata to be stored at the root of the log entry
  requestWhitelist: ['headers', 'body', 'query'], // these are not included in the standard StackDriver httpRequest
  responseWhitelist: ['body'] // this populates the `res.body` so we can get the response size (not required)
})
