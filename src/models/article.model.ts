import {IArticle} from './interfaces/article.interface'

export class Article implements IArticle {
  public title: string
  public pages: number

  constructor(title: string, pages: number) {
    this.title = title
    this.pages = pages
  }
}
