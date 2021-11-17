import {
  IAddContactRepository,
  ICheckContactByEmailRepository,
  IDeleteContactByIdRepository,
  IListContactRepository,
  ILoadContactByIdRepository,
  ISaveContactRepository
} from '@/data/protocols/db'
import { FileSystemAbstractRepository } from '@/common/db/file-system'
import { ContactModel } from '@/domain/models'

export class FileSystemContactsRepository extends FileSystemAbstractRepository<ContactModel>
  implements ICheckContactByEmailRepository,
    IAddContactRepository,
    IListContactRepository,
    ILoadContactByIdRepository,
    ISaveContactRepository,
    IDeleteContactByIdRepository {
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

  async loadById (params: ILoadContactByIdRepository.Params): Promise<ILoadContactByIdRepository.Result> {
    const contact = await this.repository.findById(params.id)
    if (!contact) return null
    return contact
  }

  async save (params: ISaveContactRepository.Params): Promise<ISaveContactRepository.Result> {
    const contact = await this.repository.updateById(
      params.contactId,
      { ...params, contactId: undefined }
    )
    if (!contact) return null
    return contact
  }

  async deleteById (params: IDeleteContactByIdRepository.Params): Promise<IDeleteContactByIdRepository.Result> {
    return this.repository.deleteById(params.id)
  }
}

export namespace FileSystemContactsRepository {
  export const filename = 'customers.txt'
}
