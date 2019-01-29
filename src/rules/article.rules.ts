import {body, param, query} from 'express-validator/check'
import {sanitizeParam, sanitizeQuery} from 'express-validator/filter'

export default class ArticleRules {

  public forPaging
  public forAddOrUpdate
  public forFindItem

  constructor() {
    this.forFindItem = [
      sanitizeParam('id').toInt(10),
      param('id')
        .isInt().withMessage('Value must be integer!')
    ]

    this.forAddOrUpdate = [
      body('title')
        .custom((title: string) => {
          return (title && title.length > 0)
        }).withMessage('Value must not be empty!'),
      body('content')
        .custom((title: string) => {
          return (title && title.length > 0)
        }).withMessage('Value must not be empty!'),
      body('short_content')
        .custom((title: string) => {
          return (title && title.length > 0)
        }).withMessage('Value must not be empty!'),
      body('thumbnail_image')
        .isURL().withMessage('Value must be URL!')
    ]

    this.forPaging = [
      sanitizeQuery('page').toInt(10),
      sanitizeQuery('size').toInt(10),
      query('page')
        .isInt().withMessage('Value must be integer!'),
      query('size')
        .isInt().withMessage('Value must be integer!')
      // check('order')
      //   .isLength({min: 1}).withMessage('Value must not be empty!'),
      // check('sort')
      //   .isIn(['asc', 'desc']).withMessage('Value is not valid, accept "asc" or "desc"!')
    ]
  }
}
