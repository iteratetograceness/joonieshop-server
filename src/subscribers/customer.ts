import { EventBusService } from '@medusajs/medusa'
import ResendService from 'services/resend'

class CustomerSubscriber {
  resendService_: ResendService
  eventBus_: EventBusService

  constructor({ resendService, eventBusService }) {
    this.resendService_ = resendService
    this.eventBus_ = eventBusService

    // this.eventBus_.subscribe('customer.password_reset', async (data) => {
    //   await this.resendService_.sendNotification(
    //     'user.password_reset',
    //     data,
    //     null
    //   )
    // })

    this.eventBus_.subscribe('customer.created', async (data) => {
      await this.resendService_.sendNotification('customer.created', data, null)
    })
  }
}

export default CustomerSubscriber
