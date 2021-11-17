type AppResponseOpts = {
  result?: any
  error?: string
}

type AppResponse = {
  success: boolean
  result?: any
  error?: string
}

export const makeAppResponse = (opts: AppResponseOpts = {}): AppResponse => ({
  success: !opts.error,
  result: opts.error ? undefined : opts.result,
  error: opts.error
})
