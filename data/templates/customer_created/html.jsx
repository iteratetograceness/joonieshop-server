import { Button } from '@react-email/button'
import { Container } from '@react-email/container'
import { Font } from '@react-email/font'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Tailwind } from '@react-email/tailwind'
import { Text } from '@react-email/text'
import { Hr } from '@react-email/hr'
import * as React from 'react'

const Email = ({ first_name = 'there!' }) => {
  return (
    <Html lang='en'>
      <Head>
        <title>welcome 2 joonieshop</title>
        <Font
          fontFamily='Libre Caslon Text'
          fallbackFontFamily='Times New Roman'
          webFont={{
            url: 'https://fonts.gstatic.com/s/librecaslontext/v5/DdT878IGsGw1aF1JU10PUbTvNNaDMfq41-JJHRO0.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>thanks for signing up!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                dark: '#071013',
                light: '#F8F7F7',
                'dark-blue': '#274496',
                'light-blue': 'hsl(216, 25%, 75%)',
                yellow: 'hsl(41, 68%, 54%)',
                brown: '#903C18',
                'light-brown': 'hsl(21, 38%, 55%)',
                'dark-brown': 'hsl(18, 97%, 17%)',
                red: 'hsl(12, 61%, 47%)',
              },
            },
          },
        }}
      >
        <Container className='mx-0 my-auto p-6'>
          <Button
            href='https://shop.joonie.dev'
            className='text-brown text-4xl'
            style={{ fontFamily: 'Libre Caslon Text' }}
          >
            joonieshop
          </Button>

          <Section className='text-brown'>
            <Text>hi {first_name.toLowerCase()},</Text>
            <Text>
              welcome to joonieshop! i'm happy you're here. and don't worry, i
              won't spam you with emails (yet and only if you explicitly say
              yes)! your email will be used for order updates and in case your
              need to reset your password.
            </Text>
            <Button
              href='https://shop.joonie.dev'
              className='text-light bg-brown px-4 py-2 rounded my-2'
            >
              shop now
            </Button>
            <Hr className='border-brown border-px mt-8' />
            <Text>© {new Date().getFullYear()}</Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  )
}

export default Email
