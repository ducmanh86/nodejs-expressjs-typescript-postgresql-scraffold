import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import configs from '../configs'

const basename = path.basename(module.filename)
const db = {}

const sequelize = new Sequelize({
  dialect: configs.DB_DIALECT,
  host: configs.DB_HOST,
  port: parseInt(configs.DB_PORT as string, 10),
  username: configs.DB_USERNAME,
  password: configs.DB_PASSWORD,
  database: configs.DB_DATABASE,
  timezone: configs.DB_TIMEZONE,
  logging: configs.NODE_ENV === 'development',
  benchmark: configs.NODE_ENV === 'development'
})

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })
