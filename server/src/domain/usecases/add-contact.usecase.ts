export interface IAddContactUseCase {
  execute: (params: IAddContactUseCase.Params) => Promise<IAddContactUseCase.Result>
}

export namespace IAddContactUseCase {
  export type Params = {
    name: string
    email: string
    phone: string
    address: {
      country: string
      houseNumber: number
      streetName: string
      city: string
      state: string
    }
  }

  export type Result = boolean
}
