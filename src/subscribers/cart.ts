import { EventBusService } from '@medusajs/medusa'

class CartSubscriber {
  eventBus_: EventBusService

  constructor({ eventBusService }) {
    this.eventBus_ = eventBusService

    this.eventBus_.subscribe('cart.updated', async (data) => {
      console.log('cart updated!')
    })
  }
}

export default CartSubscriber
