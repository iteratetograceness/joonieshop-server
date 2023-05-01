const dotenv = require('dotenv')

let ENV_FILE_NAME = ''
switch (process.env.NODE_ENV) {
  case 'production':
    ENV_FILE_NAME = '.env.production'
    break
  case 'staging':
    ENV_FILE_NAME = '.env.staging'
    break
  case 'test':
    ENV_FILE_NAME = '.env.test'
    break
  case 'development':
  default:
    ENV_FILE_NAME = '.env'
    break
}

try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME })
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || 'http://localhost:7000'

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || 'http://192.168.1.153:8000'

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432'

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const CACHE_REDIS_URL = process.env.CACHE_REDIS_URL || 'redis://localhost:6379'
const EVENTS_REDIS_URL =
  process.env.EVENTS_REDIS_URL || 'redis://localhost:6379'

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ''
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: STRIPE_API_KEY,
      webhook_secret: STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: '@medusajs/admin',
    options: {
      autoRebuild: true,
    },
  },
]

const modules = {
  eventBus: {
    resolve: '@medusajs/event-bus-redis',
    options: {
      redisUrl: EVENTS_REDIS_URL,
      queueOptions: {
        settings: {
          sharedConnection: true,
        },
      },
    },
  },
  cacheService: {
    resolve: '@medusajs/cache-redis',
    options: {
      redisUrl: CACHE_REDIS_URL,
    },
  },
}

const projectConfig = {
  redis_url: REDIS_URL,
  database_url: DATABASE_URL,
  database_type: 'postgres',
  database_logging: true,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
}

module.exports = {
  projectConfig,
  plugins,
  modules,
}
