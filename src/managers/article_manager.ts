import {IArticle} from '../models/interfaces/article.interface'
import {ArticleRepository} from '../repositories/article.repository'

export class ArticleManager {
  private readonly repo: ArticleRepository

  constructor(repo: ArticleRepository) {
    this.repo = repo
  }

  public getArticles(): Promise<IArticle[]> {
    return this.repo.find({attributes: ['title', 'pages']})
  }

  public count(): Promise<number> {
    return this.repo.countOfArticles()
  }
}
