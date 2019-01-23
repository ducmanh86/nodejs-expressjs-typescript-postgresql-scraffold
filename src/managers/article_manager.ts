import {Article} from '../models/article'
import {IRepository} from '../repositories/interfaces/repository.interface'

export class ArticleManager {
  private repo: IRepository

  constructor(repo: IRepository) {
    this.repo = repo
  }

  public async getArticles(): Promise<Article[]> {
    return this.repo.articles()
  }
}
