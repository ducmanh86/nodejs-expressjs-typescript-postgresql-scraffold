import {Model} from 'sequelize'
import request from 'supertest'
import {modelInfos, models} from '../../src/models'
import Article from '../../src/models/article.model'
import IArticle from '../../src/models/interfaces/article.interface'
import {app} from '../../src/server'

describe('GET /articles', () => {
  it('SHOULD return 200Ok', async(done) => {
    const articleDb: Model<IArticle, IArticle> = models[modelInfos.article.name]
    return articleDb.destroy({where: {}, truncate: true, force: true})
      .then(() => {
        request(app)
          .get('/articles')
          .end((err: any, res: { status: any; }) => {
            if (err) {
              throw err
            }
            expect(res.status).toBe(200)
            done()
          })
      })
  })

  it('SHOULD return list of 2 articles WHEN db containes 2 articles', async(done) => {
    const articles = [
      new Article({
        title: 'Test 1',
        content: 'Test content 1',
        short_content: 'Test short content 1',
        thumbnail_image: ''
      }),
      new Article({
        title: 'Test 2',
        content: 'Test content 2',
        short_content: 'Test short content 2',
        thumbnail_image: ''
      })
    ]
    const articleDb: Model<IArticle, IArticle> = models[modelInfos.article.name]
    return articleDb.destroy({where: {}, truncate: true, force: true})
      .then(() => articleDb.create(articles[0]))
      .then(() => articleDb.create(articles[1]))
      .then(() => {
        request(app)
          .get('/articles')
          .end((err: any, res: { body: any; }) => {
            if (err) {
              throw err
            }
            expect(res.body.length).toEqual(articles.length)

            expect(res.body[0].title).toEqual(articles[0].title)
            expect(res.body[0].content).toEqual(articles[0].content)
            expect(res.body[0].short_content).toEqual(articles[0].short_content)
            expect(res.body[0].thumbnail_image).toEqual(articles[0].thumbnail_image)

            expect(res.body[1].title).toEqual(articles[1].title)
            expect(res.body[1].content).toEqual(articles[1].content)
            expect(res.body[1].short_content).toEqual(articles[1].short_content)
            expect(res.body[1].thumbnail_image).toEqual(articles[1].thumbnail_image)

            done()
          })
      })
  })
})
