import {DefineModelAttributes} from 'sequelize'
import database from '../configs/database.config'
import {IArticle} from './interfaces/article.interface'
import {Article} from './sequelize/article.seq'

interface IModel {
  name: string,
  seq: DefineModelAttributes<any>
}

interface IModels {
  [index: string]: IModel
}

const modelInfos = {
  article: {name: 'article', seq: Article}
}

function defineTable<TAttributes>(model: IModel) {
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
