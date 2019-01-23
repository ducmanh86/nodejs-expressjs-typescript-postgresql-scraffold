import {Router} from 'express'
import configs from '../configs'
import {router as articles} from './articles.routes'

const router = Router()

router.get('/version', (req, res) => {
  res.json({version: configs.VERSION})
})

router.use(articles)

export {router}
