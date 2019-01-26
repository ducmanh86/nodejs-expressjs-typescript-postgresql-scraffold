import {check} from 'express-validator/check'
import {Article, IArticle} from '../models/article.model'

export const articleRules = {
  forAddOrUpdate: [
    check('title')
      .custom((title: string) => {
        return (title && title.length > 0)
      }).withMessage('Value must not be empty!')
      .custom((title: string) =>
        Article.find({where: {title: title.trim()}})
          .then((article: IArticle) => !article)
      ).withMessage('Duplicate title!'),
    check('pages')
      .isInt().withMessage('Value must be integer!')
  ]
}
