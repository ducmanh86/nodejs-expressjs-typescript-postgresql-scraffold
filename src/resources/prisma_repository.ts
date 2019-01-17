import {prisma} from '../../prisma/generated/prisma-client'
import {IRepository} from '../interfaces/repository.interface'
import {Article} from '../models/article'

export class PrismaRepository implements IRepository {
  public async articles (): Promise<Article[]> {
    return prisma.articles().$fragment('{ title pages}')
  }
}
