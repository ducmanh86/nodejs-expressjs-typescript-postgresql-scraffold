export default interface IArticle {
  id?: number
  title: string
  short_content: string
  content: string
  thumbnail_image: string
  keywords?: string
  status?: boolean
  created_at?: string
  updated_at?: string
  deleted_at?: string
}
