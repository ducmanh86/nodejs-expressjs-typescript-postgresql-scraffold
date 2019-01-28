import {NextFunction, Request, Response} from 'express'
import {modelInfos} from '../models'
import IArticle from '../models/interfaces/article.interface'
import SequelizeRepository from '../repositories/sequelize/sequelize.repository'
import ArticleService from '../services/article.service'

class ArticleController {
  private articleService: ArticleService

  constructor () {
    this.articleService = new ArticleService(new SequelizeRepository(modelInfos.article.name))
  }

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.articleService.getArticles()
      .then((articles: IArticle[]) => {
        res.json(articles)
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
