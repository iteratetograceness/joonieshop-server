"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const bullmq_1 = require("bullmq");
const QUEUE_NAME = 'joonishop-event-queue';
class EventBusService extends utils_1.AbstractEventBusModuleService {
    constructor({ logger, redis }) {
        super();
        this.processor_ = async (job) => {
            const { eventName, data } = job.data;
            const eventSubscribers = this.eventToSubscribersMap.get(eventName) || [];
            const wildcardSubscribers = this.eventToSubscribersMap.get('*') || [];
            const subscribers = [...eventSubscribers, ...wildcardSubscribers];
            this.logger_.info(`Processing ${eventName} which has ${eventSubscribers.length} subscribers`);
            const subscribersResult = await Promise.all(subscribers.map(async ({ id, subscriber }) => {
                return await subscriber(data, eventName).catch((err) => {
                    this.logger_.warn(`An error occurred while processing ${eventName}: ${err}`);
                    return err;
                });
            }));
            return Promise.resolve(subscribersResult);
        };
        this.setupWorker = () => {
            setInterval(() => {
                const isPaused = this.worker_.isPaused();
                if (isPaused) {
                    this.worker_.resume();
                }
                else {
                    this.worker_.pause();
                }
            }, 15 * 60 * 1000);
        };
        this.logger_ = logger;
        // @ts-ignore -- Vercel KV types do not match IORedis types (used under the hood by bullmq)
        this.queue_ = new bullmq_1.Queue(QUEUE_NAME, { connection: redis });
        this.worker_ = new bullmq_1.Worker(QUEUE_NAME, this.processor_, {
            // @ts-ignore -- Vercel KV types do not match IORedis types (used under the hood by bullmq)
            connection: redis,
            stalledInterval: 60 * 60 * 1000,
        });
        this.setupWorker();
    }
    async emit(eventNameOrData, data, options = {}) {
        const isBulkEmit = Array.isArray(eventNameOrData);
        const opts = {
            removeOnComplete: true,
            attempts: 1,
        };
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
            ];
        await this.queue_.addBulk(events);
    }
}
exports.default = EventBusService;
//# sourceMappingURL=event-bus.js.map