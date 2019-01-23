import {Request, Response} from 'express'
import {ArticleManager} from '../managers/article_manager'
import {PrismaRepository} from '../repositories/prisma_repository'

class ArticleController {
  private articleManager: ArticleManager

  constructor () {
    this.articleManager = new ArticleManager(new PrismaRepository())
  }

  public index = async(req: Request | any, res: Response) => {
    const articles = await this.articleManager.getArticles()
    res.json(articles)
  }
}

export default new ArticleController()
