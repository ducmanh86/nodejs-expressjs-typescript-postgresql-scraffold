import {prisma as db} from '../../prisma/generated/prisma-client'
import {ArticleManager} from '../../src/managers/article_manager'
import {Article} from '../../src/models/article'
import {PrismaRepository} from '../../src/resources/prisma_repository'

test('getArticles_noArticlesInDB_emptyList', async() => {
  await db.deleteManyArticles({})

  const articleManager = new ArticleManager(new PrismaRepository())

  const articles: Article[] = await articleManager.getArticles()
  expect(articles.length).toBe(0)
})

test('getArticles_oneArticleInDB_ListOfOneArticle', async() => {
  await db.deleteManyArticles({})
  await db.createArticle({title: 'Lord Of The Rings', pages: 5})

  const articleManager = new ArticleManager(new PrismaRepository())

  const articles: Article[] = await articleManager.getArticles()

  expect(articles.length).toBe(1)
})
