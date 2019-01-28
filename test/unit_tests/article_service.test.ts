import IArticle from '../../src/models/interfaces/article.interface'
import EmptyMockRepository from '../../src/repositories/mock_empty.repository'
import SingleMockRepository from '../../src/repositories/mock_single.repository'
import ArticleService from '../../src/services/article.service'

test('getArticles_noArticlesInDB_emptyList', async() => {
  const articleService = new ArticleService(new EmptyMockRepository())
  const articles: IArticle[] = await articleService.getArticles()

  expect(articles.length).toBe(0)
})

test('getArticles_oneArticleInDB_ListOfOneArticle', async() => {
  const articleService = new ArticleService(new SingleMockRepository({
    title: 'Test 1',
    content: 'Test content 1',
    short_content: 'Test short content 1',
    thumbnail_image: ''
  }))
  const articles: IArticle[] = await articleService.getArticles()

  expect(articles.length).toBe(1)
})
