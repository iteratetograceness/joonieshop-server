import { LoaderOptions } from '@medusajs/modules-sdk'
import { asValue } from 'awilix'
import { kv } from '@vercel/kv'

export default async ({ container, logger }: LoaderOptions) => {
  logger.info('joonieshop-event-bus: registering redis client...')
  container.register({
    redis: asValue(kv),
  })
}
