type AppResponseOpts = {
  error?: string
}

type AppResponse = {
  success: boolean
  error?: string
}

export const makeAppResponse = (opts: AppResponseOpts = {}): AppResponse => ({
  success: !opts.error,
  error: opts.error
})
