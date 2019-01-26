import {Request, Response, Router} from 'express'
import ArticleController from '../controllers/article_controller'
import {handleRuleResult} from '../rules'
import {articleRules} from '../rules/article.rules'

const router = Router()

router.get('/articles', ArticleController.index)
router.get('/articles/count', ArticleController.count)

router.post('/articles', articleRules.forAddOrUpdate, handleRuleResult, (req: Request, res: Response) => {
  res.json({message: 'Done'})
})

export {router}
