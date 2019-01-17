import {IRepository} from '../interfaces/repository.interface'
import {Article} from '../models/article'

export class EmptyMockRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return []
  }
}
