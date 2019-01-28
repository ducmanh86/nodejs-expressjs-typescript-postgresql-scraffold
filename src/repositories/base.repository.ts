import IRead from './interfaces/read.interface'
import IWrite from './interfaces/write.interface'

// that class only can be extended
export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public create(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  public update(id: string, item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  public delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  public count(options): Promise<number> {
    throw new Error('Method not implemented.')
  }
  public find(options): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  public findOne(options): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
}
