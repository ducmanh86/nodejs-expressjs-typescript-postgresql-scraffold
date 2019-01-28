import {NextFunction, Request, Response} from 'express'
import {ArticleService} from '../services/article.service'
import {IArticle} from '../models/interfaces/article.interface'

class ArticleController {
  private articleManager: ArticleService

  constructor () {
    this.articleManager = new ArticleService()
  }

  public index = (req: Request, res: Response, next: NextFunction) => {
    this.articleManager.getArticles()
      .then((articles: IArticle[]) => {
        res.json(articles)
      })
      .catch(next)
  }

  public count = (req: Request, res: Response, next: NextFunction) => {
    this.articleManager.count()
      .then((total) => {
        res.json({total})
      })
      .catch(next)
  }
}

export default new ArticleController()
