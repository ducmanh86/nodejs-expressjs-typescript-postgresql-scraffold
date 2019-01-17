import {IRepository} from '../interfaces/repository.interface'
import {Article} from '../models/article'

export class ArticleManager {
  private repo: IRepository

  constructor(repo: IRepository) {
    this.repo = repo
  }

  public async getArticles(): Promise<Article[]> {
    return this.repo.articles()
  }
}
