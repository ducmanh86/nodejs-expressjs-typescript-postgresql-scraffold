import dotenv from 'dotenv-extended'
import getenv from 'getenv'

dotenv.load({
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true,
  assignToProcessEnv: true,
  overrideProcessEnv: false // không ghi đè nếu đã tồn tại
})

if (process.env.NODE_ENV === 'production') {
  // disabble fallback trong production
  getenv.disableFallbacks()
}
// throw error khi key không tồn tại trong env
getenv.enableErrors()

const getVersion = () => {
  const packageVersion: string = getenv('npm_package_version')
  const lastDotIndex = packageVersion.lastIndexOf('.')
  const version = packageVersion.slice(0, lastDotIndex)
  return `${version}.${getenv('BUILD_NUMBER')}`
}

export default {
  VERSION: getVersion(),
  APP_NAME: getenv('npm_package_name'),
  NODE_ENV: getenv('NODE_ENV'),
  LOG_LEVEL: getenv('LOG_LEVEL'),
  PORT: getenv.int('PORT'),
  DB_HOST: getenv('DB_HOST'),
  DB_PORT: getenv.int('DB_PORT'),
  DB_DATABASE: getenv('DB_DATABASE'),
  DB_USERNAME: getenv('DB_USERNAME'),
  DB_PASSWORD: getenv('DB_PASSWORD'),
  DB_DIALECT: getenv('DB_DIALECT'),
  DB_TIMEZONE: getenv('DB_TIMEZONE')
}
