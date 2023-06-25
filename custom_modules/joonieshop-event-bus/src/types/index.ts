import { Job } from 'bullmq'

export interface JobData<T> {
  eventName: string
  data: T
  completedSubscriberIds?: string[] | undefined
}

export type BullJob<T> = {
  data: JobData<T>
} & Job
