import * as express from 'express'

export interface IRequest extends express.Request {
  log: any
}
