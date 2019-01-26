import {IArticle} from '../models/interfaces/article.interface'
import {BaseRepository} from './base.repository'

export class ArticleRepository extends BaseRepository<IArticle> {
  public countOfArticles(): Promise<number> {
    return Promise.resolve(this._model.count())
  }
}
