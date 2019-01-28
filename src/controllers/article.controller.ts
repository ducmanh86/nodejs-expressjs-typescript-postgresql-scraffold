import {NextFunction, Request, Response} from 'express'
import configs from '../configs'
import {modelInfos} from '../models'
import IArticle from '../models/interfaces/article.interface'
import SequelizeRepository from '../repositories/sequelize.repository'
import ArticleService from '../services/article.service'

class ArticleController {
  private articleService: ArticleService

  constructor() {
    this.articleService = new ArticleService(new SequelizeRepository(modelInfos.article.name))
  }

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.articleService.getArticles({page: 1, order: 'id', sort: 'asc', limit: configs.QUERY_LIMIT_SIZE})
      .then((value: {
        rows: IArticle[],
        count: number
      }) => {
        res.json(this.articleService.paging({
          page: 1,
          size: configs.QUERY_LIMIT_SIZE,
          data: value.rows,
          total_items: value.count,
          protocol: req.protocol,
          host: req.get('host') || '',
          query: req.query,
          originalUrl: req.originalUrl
        }))
      })
      .catch(next)
  }

  public count = (req: Request, res: Response, next: NextFunction) => {
    this.articleService.count()
      .then((total) => {
        res.json({total})
      })
      .catch(next)
  }
}

export default new ArticleController()
