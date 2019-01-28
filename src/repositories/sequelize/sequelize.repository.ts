import {Model} from 'sequelize'
import {modelInfos, models} from '../../models'
import BaseRepository from '../base.repository'

export default class SequelizeRepository<T> extends BaseRepository<T> {
  protected readonly model: Model<T, T>

  public constructor(modelName: string) {
    super()
    this.model = models[modelInfos[modelName].name]
  }

  public create(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  public update(id: string, item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  public delete(id: string): Promise<boolean> {
    return Promise.resolve(this.model.destroy({
      where: {
        id
      }
    })
      .then(() => {
        return Promise.resolve(true)
      })
      .catch((error) => {
        return Promise.reject(error)
      }))
  }

  public count(options): Promise<number> {
    return Promise.resolve(this.model.count(options))
  }

  public find(options): Promise<T[]> {
    return Promise.resolve(this.model.findAll(options))
  }

  public findOne(options): Promise<T | null> {
    return Promise.resolve(this.model.findOne(options))
  }
}
