import {Article} from '../../models/article'

export interface IRepository {
  articles (): Promise<Article[]>
}
