import IArticle from '../models/interfaces/article.interface'
import BaseRepository from '../repositories/base.repository'

export default class ArticleService {
  private readonly repo: BaseRepository<IArticle>

  constructor(repo: BaseRepository<IArticle>) {
    this.repo = repo
  }

  public getArticle(title: string): Promise<IArticle | null> {
    return this.repo.findOne({
      where: {
        title
      }
    })
  }

  public getArticles(): Promise<IArticle[]> {
    return this.repo.find({})
  }

  public count(): Promise<number> {
    return this.repo.count({})
  }
}
