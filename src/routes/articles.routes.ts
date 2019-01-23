import {Router} from 'express'
import ArticleController from '../controllers/article_controller'

const router = Router()

router.get('/articles', ArticleController.index)

export {router}
