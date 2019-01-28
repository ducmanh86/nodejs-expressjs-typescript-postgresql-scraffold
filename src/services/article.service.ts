import {IArticle} from '../models/interfaces/article.interface'
import {ArticleRepository} from '../repositories/article.repository'

export class ArticleService {
  private readonly repo: ArticleRepository

  constructor() {
    this.repo = new ArticleRepository()
  }

  public getArticles(): Promise<IArticle[]> {
    return this.repo.find({attributes: ['title', 'pages']})
  }

  public count(): Promise<number> {
    return this.repo.countOfArticles()
  }
}
