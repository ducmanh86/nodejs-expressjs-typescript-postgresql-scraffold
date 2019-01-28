import {Request, Response, Router} from 'express'
import ArticleController from '../controllers/article.controller'
import {handleRuleResult} from '../rules'
import ArticleRules from '../rules/article.rules'

export default class ArticlesRoutes {
  private router: Router
  private articleRules: ArticleRules

  constructor() {
    this.articleRules = new ArticleRules()
    this.setupRoutes()
  }

  public getRouter(): Router {
    return this.router
  }

  private setupRoutes() {
    this.router = Router()
    this.router.get('/', ArticleController.index)
    this.router.get('/count', ArticleController.count)

    this.router.post('/', this.articleRules.forAddOrUpdate, handleRuleResult, (req: Request, res: Response) => {
      res.json({message: 'Done'})
    })
  }
}
