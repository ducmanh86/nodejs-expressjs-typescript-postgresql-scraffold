import {Article} from '../models/article'
import {BaseRepository} from './base.repository'

// now, we have all code implementation from BaseRepository
export class ArticleRepository extends BaseRepository<Article> {

  // here, we can create all especific stuffs of Spartan IRepository
  // countOfSpartans(): Promise<number> {
    // return this._collection.count({})
  // }
}
