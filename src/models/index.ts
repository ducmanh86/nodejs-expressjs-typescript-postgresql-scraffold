import {DefineModelAttributes} from 'sequelize'
import Article from '../../db/models/article.seq'
import database from '../configs/database.config'
import IArticle from './interfaces/article.interface'

interface IModelInfo {
  name: string,
  seq: DefineModelAttributes<any>
}

interface IModelInfos {
  [index: string]: IModelInfo
}

const modelInfos: IModelInfos = {
  article: {name: 'article', seq: Article}
}

function defineTable<TAttributes>(model: IModelInfo) {
  return database.define<TAttributes, TAttributes>(model.name, model.seq, {paranoid: true})
}

const models = {}
Object.keys(modelInfos).forEach((key) => {
  models[modelInfos[key].name] = defineTable<IArticle>(modelInfos[key])
})

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

const connectDb = () => {
  return database.authenticate()
}

export {
  database,
  models,
  modelInfos,
  connectDb
}
