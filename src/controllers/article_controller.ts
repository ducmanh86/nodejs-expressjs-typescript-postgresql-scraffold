import {NextFunction, Request, Response} from 'express'
import {ArticleManager} from '../managers/article_manager'
import {modelInfos} from '../models'
import {IArticle} from '../models/interfaces/article.interface'
import {ArticleRepository} from '../repositories/article.repository'
import {logger} from '../utils/logger'
// import {PrismaRepository} from '../repositories/prisma_repository'

class ArticleController {
  private articleManager: ArticleManager

  constructor () {
    this.articleManager = new ArticleManager(new ArticleRepository(modelInfos.article.name))
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
