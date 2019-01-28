import {prisma as db} from '../../prisma/generated/prisma-client'
import {ArticleService} from '../../src/services/article.service'
import {Article} from '../../src/models/article.model'
import {PrismaRepository} from '../../src/repositories/prisma_repository'

test('getArticles_noArticlesInDB_emptyList', async() => {
  await db.deleteManyArticles({})

  const articleManager = new ArticleService(new PrismaRepository())

  const articles: Article[] = await articleManager.getArticles()
  expect(articles.length).toBe(0)
})

test('getArticles_oneArticleInDB_ListOfOneArticle', async() => {
  await db.deleteManyArticles({})
  await db.createArticle({title: 'Lord Of The Rings', pages: 5})

  const articleManager = new ArticleService(new PrismaRepository())

  const articles: Article[] = await articleManager.getArticles()

  expect(articles.length).toBe(1)
})
