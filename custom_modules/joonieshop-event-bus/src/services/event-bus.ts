import { VercelKV } from '@vercel/kv'
import { Logger } from '@medusajs/modules-sdk'
import { EmitData } from '@medusajs/types'
import { AbstractEventBusModuleService } from '@medusajs/utils'
import { Queue, Worker, BulkJobOptions, JobsOptions } from 'bullmq'
import { BullJob } from '../types'

interface InjectedDependencies {
  logger: Logger
  redis: VercelKV
}

const QUEUE_NAME = 'joonishop-event-queue'

export default class EventBusService extends AbstractEventBusModuleService {
  protected readonly logger_: Logger
  protected queue_: Queue
  protected worker_: Worker

  constructor({ logger, redis }: InjectedDependencies) {
    super()

    this.logger_ = logger
    // @ts-ignore -- Vercel KV types do not match IORedis types (used under the hood by bullmq)
    this.queue_ = new Queue(QUEUE_NAME, { connection: redis })
    this.worker_ = new Worker(QUEUE_NAME, this.processor_, {
      // @ts-ignore -- Vercel KV types do not match IORedis types (used under the hood by bullmq)
      connection: redis,
      stalledInterval: 60 * 60 * 1000,
    })

    this.setupWorker()
  }

  async emit<T>(
    eventName: string,
    data: T,
    options: Record<string, unknown>
  ): Promise<void>

  async emit<T>(data: EmitData<T>[]): Promise<void>

  async emit<T, TInput extends string | EmitData<T>[] = string>(
    eventNameOrData: unknown,
    data?: unknown,
    options: BulkJobOptions | JobsOptions = {}
  ): Promise<void> {
    const isBulkEmit = Array.isArray(eventNameOrData)

    const opts = {
      removeOnComplete: true,
      attempts: 1,
    }

    const events = isBulkEmit
      ? eventNameOrData.map((event) => ({
          name: event.eventName,
          data: { eventName: event.eventName, data: event.data },
          opts: { ...opts, ...event.options },
        }))
      : [
          {
            name: eventNameOrData,
            data: { eventName: eventNameOrData, data },
            opts: { ...opts, ...options },
          },
        ]

    await this.queue_.addBulk(events)
  }

  processor_ = async <T>(job: BullJob<T>): Promise<unknown> => {
    const { eventName, data } = job.data
    const eventSubscribers = this.eventToSubscribersMap.get(eventName) || []
    const wildcardSubscribers = this.eventToSubscribersMap.get('*') || []

    const subscribers = [...eventSubscribers, ...wildcardSubscribers]

    this.logger_.info(
      `Processing ${eventName} which has ${eventSubscribers.length} subscribers`
    )

    const subscribersResult = await Promise.all(
      subscribers.map(async ({ id, subscriber }) => {
        return await subscriber(data, eventName).catch((err) => {
          this.logger_.warn(
            `An error occurred while processing ${eventName}: ${err}`
          )
          return err
        })
      })
    )

    return Promise.resolve(subscribersResult)
  }

  setupWorker = () => {
    setInterval(() => {
      const isPaused = this.worker_.isPaused()
      if (isPaused) {
        this.worker_.resume()
      } else {
        this.worker_.pause()
      }
    }, 15 * 60 * 1000)
  }
}
