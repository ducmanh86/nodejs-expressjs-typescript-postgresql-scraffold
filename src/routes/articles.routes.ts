import {Router} from 'express'
import ArticleController from '../controllers/article.controller'
import {handlePagingResult, handleRuleResult} from '../rules'
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
    this.router.get('/', this.articleRules.forPaging, handlePagingResult, ArticleController.index)
    this.router.get('/:id', this.articleRules.forFindItem, handleRuleResult, ArticleController.getArticle)
    this.router.get('/count', ArticleController.count)

    this.router.post('/', this.articleRules.forAddOrUpdate, handleRuleResult, ArticleController.create)
  }
}
