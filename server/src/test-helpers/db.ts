import { IAbstractRepository } from '@/common/db/protocols'
import { AbstractModel } from '@/common/models'

export const connect = async <TModel extends AbstractModel> (db: IAbstractRepository<TModel>): Promise<boolean> => {
  return db.connect()
}

export const clear = async <TModel extends AbstractModel> (db: IAbstractRepository<TModel>): Promise<boolean> => {
  return db.repository.delete()
}

export const mockAddOne = async <TModel extends AbstractModel>(
  db: IAbstractRepository<TModel>,
  model: Partial<TModel> = {}
): Promise<TModel> => {
  let _model = model
  if (!_model.id) {
    _model = await db.repository.add(model as TModel)
  }
  return _model as Required<TModel>
}

export const mockAddMany = async <TModel extends AbstractModel>(
  db: IAbstractRepository<TModel>,
  models: TModel[]
): Promise<TModel[]> => {
  const _models = await db.repository.replace(models)
  return _models
}
