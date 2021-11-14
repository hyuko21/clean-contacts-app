import { IAbstractRepository } from '@/common/db/protocols'
import { AbstractModel } from '@/common/models'

export const connect = async <TModel extends AbstractModel> (repository: IAbstractRepository<TModel>): Promise<boolean> => {
  return repository.connect()
}

export const clear = async <TModel extends AbstractModel> (repository: IAbstractRepository<TModel>): Promise<boolean> => {
  return repository.delete()
}

export const mockAddOne = async <TModel extends AbstractModel>(
  repository: IAbstractRepository<TModel>,
  model: Partial<TModel> = {}
): Promise<Required<TModel>> => {
  let _model = model
  if (!_model.id) {
    _model = await repository.add(model as TModel)
  }
  return _model as Required<TModel>
}
