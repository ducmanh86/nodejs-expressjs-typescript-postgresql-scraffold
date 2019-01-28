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

  public findOne(options): Promise<T | null> {
    return Promise.resolve(null)
  }
}
