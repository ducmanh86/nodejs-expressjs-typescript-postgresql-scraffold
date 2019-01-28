import {Model} from 'sequelize'
import {modelInfos, models} from '../../src/models'
import IArticle from '../../src/models/interfaces/article.interface'
import SequelizeRepository from '../../src/repositories/sequelize.repository'
import ArticleService from '../../src/services/article.service'

test('getArticles_noArticlesInDB_emptyList', () => {
  const articleDb: Model<IArticle, IArticle> = models[modelInfos.article.name]
  const articleService = new ArticleService(new SequelizeRepository(modelInfos.article.name))
  return articleDb.destroy({where: {}, truncate: true, force: true})
    .then(() => articleService.getArticles({page: 1, limit: 10, sort: 'asc', order: 'id'}))
    .then((articles: {rows: IArticle[], count: number}) => {
      expect(articles.rows.length).toBe(0)
    })
})

test('getArticles_oneArticleInDB_ListOfOneArticle', () => {
  const articleDb: Model<IArticle, IArticle> = models[modelInfos.article.name]
  const articleService = new ArticleService(new SequelizeRepository(modelInfos.article.name))
  return articleDb.destroy({where: {}, truncate: true, force: true})
    .then(() => articleDb.create({
      title: 'Test 123',
      content: 'Test content 1',
      short_content: 'Test short content 1',
      thumbnail_image: ''
    }))
    .then(() => articleService.getArticles({page: 1, limit: 10, sort: 'asc', order: 'id'}))
    .then((articles: {rows: IArticle[], count: number}) => {
      expect(articles.rows.length).toBe(1)
    })
})
