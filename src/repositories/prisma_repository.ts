import {prisma} from '../../prisma/generated/prisma-client'
import {Article} from '../models/article.model'
import {IRepository} from './interfaces/repository.interface'

export class PrismaRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return prisma.articles().$fragment('{ title pages}')
  }
}
