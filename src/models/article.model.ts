import IArticle from './interfaces/article.interface'

export default class Article implements IArticle {
  public id?: number
  public title: string
  public content: string
  public short_content: string
  public thumbnail_image: string
  public keywords?: string
  public status?: boolean
  public created_at?: string
  public updated_at?: string
  public deleted_at?: string

  constructor(object: IArticle) {
    this.title = object.title
    this.content = object.content
    this.short_content = object.short_content
    this.thumbnail_image = object.thumbnail_image
  }
}
