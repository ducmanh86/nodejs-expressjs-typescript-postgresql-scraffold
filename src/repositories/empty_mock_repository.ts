import {Article} from '../models/article'
import {IRepository} from './interfaces/repository.interface'

export class EmptyMockRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return []
  }
}
