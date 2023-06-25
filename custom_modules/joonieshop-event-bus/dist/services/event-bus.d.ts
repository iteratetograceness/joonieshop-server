import { VercelKV } from '@vercel/kv';
import { Logger } from '@medusajs/modules-sdk';
import { EmitData } from '@medusajs/types';
import { AbstractEventBusModuleService } from '@medusajs/utils';
import { Queue, Worker } from 'bullmq';
import { BullJob } from '../types';
interface InjectedDependencies {
    logger: Logger;
    redis: VercelKV;
}
export default class EventBusService extends AbstractEventBusModuleService {
    protected readonly logger_: Logger;
    protected queue_: Queue;
    protected worker_: Worker;
    constructor({ logger, redis }: InjectedDependencies);
    emit<T>(eventName: string, data: T, options: Record<string, unknown>): Promise<void>;
    emit<T>(data: EmitData<T>[]): Promise<void>;
    processor_: <T>(job: BullJob<T>) => Promise<unknown>;
    setupWorker: () => void;
}
export {};
