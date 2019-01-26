import {Model} from 'sequelize'
import {models} from '../models'
import {IRead} from './interfaces/read.interface'
import {IWrite} from './interfaces/write.interface'

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _model: Model<T, T>

  constructor(modelName: string) {
    this._model = models[modelName]
  }

  public create(item: T): Promise<T> {
    return Promise.resolve(this._model.create(item))
  }
  public update(id: string, item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  public delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  public find(options): Promise<T[]> {
    return Promise.resolve(this._model.findAll<T>(options))
  }
  public findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
