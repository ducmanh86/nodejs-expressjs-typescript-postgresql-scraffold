import {NextFunction, Request, Response} from 'express'
import {Result, validationResult} from 'express-validator/check'
import configs from '../configs'
import {UnprocessableEntityError} from '../utils/error-helper'

export const handleRuleResult = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new UnprocessableEntityError('invalid inputs!', errors.array()))
  }
  next()
}

export const handlePagingResult = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new UnprocessableEntityError('invalid inputs!', errors.array()))
  }
  const {page, size, order} = req.query
  let {sort} = req.query
  req.query.page = page < 1 ? 1 : page
  req.query.size = size < 1 ? configs.QUERY_LIMIT_SIZE : size
  sort = (sort || 'ASC').toUpperCase()
  req.query.sort = (sort !== 'ASC' && sort !== 'DESC') ? 'ASC' : sort
  req.query.order = order || 'id'
  next()
}
