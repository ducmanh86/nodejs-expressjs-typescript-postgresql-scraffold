require('dotenv-extended').load({
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
  assignToProcessEnv: true,
  overrideProcessEnv: false // không ghi đè nếu đã tồn tại
});

const configs = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  timezone: process.env.DB_TIMEZONE,
  benchmark: process.env.NODE_ENV === 'development',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize',
  define: {
    freezeTableName: true,
    underscored: true
  }
};

module.exports = {
  development: configs,
  staging: configs,
  production: configs
};
