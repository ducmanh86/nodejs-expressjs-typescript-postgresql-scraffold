import {NextFunction, Request, Response} from 'express'
import {Result, validationResult} from 'express-validator/check'
import {UnprocessableEntityError} from '../utils/error-helper'

export const handleRuleResult = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new UnprocessableEntityError('invalid inputs!', errors.array()))
  }
  next()
}
