import {check} from 'express-validator/check'
import IArticle from '../models/interfaces/article.interface'
import articleService from '../services/article.service'

export default class ArticleRules {

  public forAddOrUpdate
  private articleService

  constructor() {
    this.articleService = articleService
    this.forAddOrUpdate = [
      check('title')
        .custom((title: string) => {
          return (title && title.length > 0)
        }).withMessage('Value must not be empty!')
        .custom((title: string) =>
          this.articleService.getArticle(title.trim())
            .then((article: IArticle) => !article)
        ).withMessage('Duplicate title!'),
      check('pages')
        .isInt().withMessage('Value must be integer!')
    ]
  }
}
