import {
  IAddContactRepository,
  ICheckContactByEmailRepository,
  IListContactRepository
} from '@/data/protocols/db'
import { FileSystemAbstractRepository } from '@/common/db/file-system'
import { ContactModel } from '@/domain/models'

export class FileSystemContactsRepository extends FileSystemAbstractRepository<ContactModel>
  implements ICheckContactByEmailRepository, IAddContactRepository, IListContactRepository {
  constructor () {
    super({ filename: FileSystemContactsRepository.filename })
  }

  async checkByEmail (params: ICheckContactByEmailRepository.Params): Promise<boolean> {
    const customers = await this.repository.find()
    const exists = customers.some((customer: any) => customer.email === params.email)
    return exists
  }

  async add (params: IAddContactRepository.Params): Promise<IAddContactRepository.Result> {
    await this.repository.add({
      name: params.name,
      email: params.email,
      phone: params.phone,
      address: params.address
    })
    return true
  }

  async list (): Promise<IListContactRepository.Result> {
    return this.repository.find()
  }
}

export namespace FileSystemContactsRepository {
  export const filename = 'customers.txt'
}
