import dotenv from 'dotenv-extended'
import getenv from 'getenv'
import zlib from 'zlib'
import packages from '../../package.json'

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
  const packageVersion: string = packages.version
  const lastDotIndex = packageVersion.lastIndexOf('.')
  const version = packageVersion.slice(0, lastDotIndex)
  return `${version}.${getenv('BUILD_NUMBER')}`
}

export const compressionConfig = {
  chunkSize: 16 * 1024,
  level: zlib.constants.Z_DEFAULT_COMPRESSION,
  memLevel: 8,
  strategy: zlib.constants.Z_DEFAULT_STRATEGY,
  threshold: '1kb',
  windowBits: 15
}

export const urlencodedConfig = {
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}

export default {
  VERSION: getVersion(),
  APP_NAME: packages.name,
  NODE_ENV: getenv('NODE_ENV'),
  DEBUG: getenv('NODE_ENV') === 'development',
  LOG_LEVEL: getenv('LOG_LEVEL'),
  PORT: getenv.int('PORT'),

  QUERY_LIMIT_SIZE: getenv.int('QUERY_LIMIT_SIZE'),
  UPLOAD_MAX_FILE_SIZE: getenv.int('UPLOAD_MAX_FILE_SIZE') * 1024,

  DB_HOST: getenv('DB_HOST'),
  DB_PORT: getenv.int('DB_PORT'),
  DB_DATABASE: getenv('DB_DATABASE'),
  DB_USERNAME: getenv('DB_USERNAME'),
  DB_PASSWORD: getenv('DB_PASSWORD'),
  DB_DIALECT: getenv('DB_DIALECT'),
  DB_TIMEZONE: getenv('DB_TIMEZONE')
}
