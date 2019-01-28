import BaseRepository from './base.repository'

export default class EmptyMockRepository<T> extends BaseRepository<T> {

  public find(options): Promise<T[]> {
    return Promise.resolve([])
  }

  public findOne(options): Promise<T | null> {
    return Promise.resolve(null)
  }
}
