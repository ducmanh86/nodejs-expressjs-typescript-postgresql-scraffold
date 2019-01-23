import {Article} from '../models/article'
import {IRepository} from './interfaces/repository.interface'

export class SingleMockRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return [new Article('Lord Of The Rings', 5)]
  }
}
