export interface IAddContactRepository {
  add: (params: IAddContactRepository.Params) => Promise<IAddContactRepository.Result>
}

export namespace IAddContactRepository {
  export type Params = {
    name: string
    email: string
    phone: string
    address: {
      houseNumber: number
      streetName: string
      city: string
      state: string
    }
  }

  export type Result = boolean
}
