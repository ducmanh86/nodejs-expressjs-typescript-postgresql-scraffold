import {FindOptions} from 'sequelize'
import BaseRepository from './base.repository'

export default class EmptyMockRepository<T> extends BaseRepository<T> {

  public find(options): Promise<T[]> {
    return Promise.resolve([])
  }

  public findAndCount(options: FindOptions<T>): Promise<{rows: T[], count: number}> {
    return Promise.resolve({rows: [], count: 0})
  }

  public findOne(options): Promise<T | null> {
    return Promise.resolve(null)
  }
}
