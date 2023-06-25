import { Lifetime } from 'awilix'
import { Resend } from 'resend'
import path from 'path'
import fs from 'fs'
import {
  AbstractNotificationService,
  Customer,
  CustomerService,
} from '@medusajs/medusa'

class ResendService extends AbstractNotificationService {
  static LIFE_TIME = Lifetime.SCOPED

  static identifier = 'resend'

  private resendClient: Resend
  private templatePath_: string
  private from_: string

  private customerService_: CustomerService

  constructor({ customerService }) {
    super({ customerService })

    this.customerService_ = customerService

    this.from_ = 'hello@shop.joonie.dev'
    this.templatePath_ = 'data/templates'
    this.resendClient = new Resend(process.env.RESEND_API_KEY)
  }

  async sendNotification(
    event: string,
    data: unknown,
    attachmentGenerator: unknown
  ): Promise<{
    to: string
    status: string
    data: Record<string, unknown>
  }> {
    const templateId = this.getTemplateId(event)
    if (!templateId) return

    const templateData = await this.fetchData(event, data, attachmentGenerator)
    if (!templateData) return

    const subject = fs.existsSync(
      path.join(this.templatePath_, templateId, 'subject.txt')
    )
      ? fs.readFileSync(
          path.join(this.templatePath_, templateId, 'subject.txt'),
          'utf8'
        )
      : null

    const react = await this.compileReactTemplate(templateId, data)

    const sendOptions = {
      to: templateData.email,
      from: this.from_,
      subject,
      react,
    }

    if (!sendOptions.subject || !sendOptions.react) return

    const attachments = await this.fetchAttachments(
      event,
      data,
      attachmentGenerator
    )

    if (attachments?.length) {
      // @ts-ignore
      sendOptions.attachments = attachments.map((a) => {
        return {
          content: a.base64,
          filename: a.name,
        }
      })
    }

    let status: string

    await this.resendClient
      .sendEmail(sendOptions)
      .then(() => {
        status = 'sent'
      })
      .catch((error) => {
        status = 'failed'
      })

    // @ts-ignore
    if (sendOptions.attachments) delete sendOptions.attachments

    return { to: templateData.email, status, data: sendOptions }
  }

  resendNotification(
    notification: unknown,
    config: unknown,
    attachmentGenerator: unknown
  ): Promise<{
    to: string
    status: string
    data: Record<string, unknown>
  }> {
    throw new Error('Method not implemented.')
  }

  getTemplateId(event: string) {
    switch (event) {
      case 'customer.created':
        return 'customer_created'
      default:
        return null
    }
  }

  fetchData(event: string, data: any, attachmentGenerator: unknown) {
    switch (event) {
      case 'customer.created':
        return this.fetchCustomerData(data)
      default:
        return null
    }
  }

  async fetchCustomerData(data: Customer) {
    return {
      email: data.email,
    }
  }

  async compileReactTemplate(templateId: string, data: any) {
    if (fs.existsSync(path.join(this.templatePath_, templateId, 'html.js'))) {
      const EmailTemplate = await import(
        path.resolve(this.templatePath_, templateId, 'html.js')
      )
      return EmailTemplate.default(data)
    }
  }

  async fetchAttachments(
    event: string,
    data: any,
    attachmentGenerator: unknown
  ) {
    switch (event) {
      default:
        return null
    }
  }
}

export default ResendService
