import {IArticle} from '../../models/article.model'
// import {Article} from 'prisma/generated/prisma-client'

export interface IRepository {
  articles (): Promise<IArticle[]>
}
