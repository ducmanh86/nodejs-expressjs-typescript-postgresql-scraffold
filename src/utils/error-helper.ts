import {NextFunction, Request, Response} from 'express'
import {logger} from './logger'

const defaultMessage = 'Đã xảy ra lỗi trong khi xử lý yêu cầu của bạn!'
  + ' Bạn vui lòng liện hệ ban quản trị để được hổ trợ'

interface Error {
  message: string
  stack?: string | undefined
  code?: string
  statusCode?: number
  status?: number
}

export class HttpRequestError extends Error implements Error {
  public code: string
  public status: number
  public statusCode: number

  constructor(message: string | any, code: string, status: number) {
    super(message)
    this.code = code
    this.status = status
    this.statusCode = status
  }
}

export class BadRequestError extends HttpRequestError {
  constructor(message: string | any) {
    super(message, 'E400', 400)
  }
}

export class UnauthorizedError extends HttpRequestError {
  constructor(message: string | any) {
    super(message, 'E401', 401)
  }
}

export class ForbiddenError extends HttpRequestError {
  constructor(message: string | any) {
    super(message, 'E403', 403)
  }
}

export class NotFoundError extends HttpRequestError {
  constructor(message: string | any) {
    super(message, 'E404', 404)
  }
}

export class UnprocessableEntityError extends HttpRequestError {
  public extra: any
  constructor(message: string | any, extra?: any) {
    super(message, 'E422', 422)
    this.extra = extra
  }
}

export class InternalServerError extends HttpRequestError {
  constructor(message: string | any, code?: string) {
    super(message, code || 'E500', 500)
  }
}

export const errorDefaultHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.debug(err)
  const statusCode = err.status || err.statusCode || 500
  const message = (err && err.message) ? err.message : defaultMessage
  const result: any = {
    error: {
      code: err.code || err.name,
      message
    }
  }
  if (err.extra) {
    result.error.extra = err.extra
  }
  res.status(statusCode)
    .json(result)
}
