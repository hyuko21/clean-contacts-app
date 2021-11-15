import { ICheckContactByEmailRepository } from '@/data/protocols/db'
import { FileSystemAbstractRepository } from '@/common/db/file-system'
import { ContactModel } from '@/domain/models'

export class FileSystemContactsRepository extends FileSystemAbstractRepository<ContactModel> implements ICheckContactByEmailRepository {
  constructor () {
    super({ filename: FileSystemContactsRepository.filename })
  }

  async checkByEmail (params: ICheckContactByEmailRepository.Params): Promise<boolean> {
    const customers = await this.repository.find()
    const exists = customers.some((customer: any) => customer.email === params.email)
    return exists
  }
}

export namespace FileSystemContactsRepository {
  export const filename = 'customers.txt'
}
