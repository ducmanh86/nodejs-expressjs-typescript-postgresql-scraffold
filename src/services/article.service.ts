import IArticle from '../models/interfaces/article.interface'
import BaseRepository from '../repositories/base.repository'
import BaseService from './index'

export default class ArticleService extends BaseService<IArticle> {
  constructor(repo: BaseRepository<IArticle>) {
    super(repo)
  }

  public getArticle(id: number): Promise<IArticle | null> {
    return this.repo.findOne({
      where: {
        id
      }
    })
  }

  public getArticles(options: {page, limit, sort, order}): Promise<{rows: IArticle[], count: number}> {
    return this.repo.findAndCount({
      limit: options.limit,
      offset: (options.page - 1) * options.limit,
      order: [
        [options.order, options.sort]
      ]
    })
  }

  public count(): Promise<number> {
    return this.repo.count({})
  }

  public createArticle(item: IArticle): Promise<IArticle> {
    return this.repo.create(item)
  }
}
