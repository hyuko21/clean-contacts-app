import { AbstractModel } from '@/common/models'

export interface ContactModel extends AbstractModel {
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
