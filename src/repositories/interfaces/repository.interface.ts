import IArticle from '../../models/interfaces/article.interface'
// import {Article} from 'prisma/generated/prisma-client'

export default interface IRepository {
  articles (): Promise<IArticle[]>
}
