import Sequelize from 'sequelize'
import configs from './index'

export default new Sequelize({
  dialect: configs.DB_DIALECT,
  host: configs.DB_HOST,
  port: configs.DB_PORT,
  username: configs.DB_USERNAME,
  password: configs.DB_PASSWORD,
  database: configs.DB_DATABASE,
  timezone: configs.DB_TIMEZONE,
  benchmark: configs.DEBUG,
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    underscored: true
  }
})
