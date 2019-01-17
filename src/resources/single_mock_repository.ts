import {IRepository} from '../interfaces/repository.interface'
import {Article} from '../models/article'

export class SingleMockRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return [new Article('Lord Of The Rings', 5)]
  }
}
