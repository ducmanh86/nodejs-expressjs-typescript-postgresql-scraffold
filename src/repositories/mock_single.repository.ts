import {FindOptions} from 'sequelize'
import BaseRepository from './base.repository'

export default class SingleMockRepository<T> extends BaseRepository<T> {
  private readonly mockObject: T

  public constructor(mockObject: T) {
    super()
    this.mockObject = mockObject
  }

  public find(options): Promise<T[]> {
    return Promise.resolve([this.mockObject])
  }

  public findAndCount(options: FindOptions<T>): Promise<{rows: T[], count: number}> {
    return Promise.resolve({rows: [this.mockObject], count: 1})
  }

  public findOne(options): Promise<T | null> {
    return Promise.resolve(null)
  }
}
