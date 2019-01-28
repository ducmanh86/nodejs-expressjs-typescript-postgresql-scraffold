import {modelInfos} from '../../models'
import IArticle from '../../models/interfaces/article.interface'
import SequelizeRepository from './sequelize.repository'

export default class ArticleRepository extends SequelizeRepository<IArticle> {
  constructor() {
    super(modelInfos.article.name)
  }

  public countOfArticles(): Promise<number> {
    return Promise.resolve(this.model.count({}))
  }
}
