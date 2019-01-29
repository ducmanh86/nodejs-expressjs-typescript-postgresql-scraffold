import {NextFunction, Request, Response} from 'express'
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
    const {page, size, order, sort} = req.query
    this.articleService.getArticles({page, order, sort, limit: size})
      .then((value: {
        rows: IArticle[],
        count: number
      }) => {
        res.json(this.articleService.paging({
          page,
          size,
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

  public getArticle = (req: Request, res: Response, next: NextFunction) => {
    this.articleService.getArticle(req.params.id)
      .then((article: IArticle) => {
        res.json(article)
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

  public create = (req: Request, res: Response, next: NextFunction) => {
    this.articleService.createArticle(req.body)
      .then((item: IArticle) => {
        res.json(item)
      })
      .catch(next)
  }
}

export default new ArticleController()
