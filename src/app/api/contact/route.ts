import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import sgClient from '@sendgrid/client'

const useEU = process.env.SENDGRID_EU === '1'

// Configure base URL for EU residency if needed
if (useEU) {
  // @ts-expect-error runtime method
  sgClient.setDefaultRequest('baseUrl', 'https://api.eu.sendgrid.com')
}
sgClient.setApiKey(process.env.SENDGRID_API_KEY!)
// @ts-expect-error setClient is available at runtime
sgMail.setClient?.(sgClient)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(req: Request) {
  try {
    // Validate SendGrid configuration first
    const requiredEnvVars = {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.error('Missing required environment variables for email:', missingVars)
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact support directly at hello@aichatbotsolutions.io' },
        { status: 500 }
      )
    }

    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }


    await sgMail.send({
      to: 'you@yourdomain.com',                 // your inbox
      from: process.env.SENDGRID_FROM_EMAIL!,   // verified sender/domain
      replyTo: email,
      subject: `New lead from ${name}`,
      text: `From: ${email}\n\n${message}`,
      html: `<p><strong>From:</strong> ${email}</p><p>${String(message).replace(/\n/g,'<br/>')}</p>`,
    })


    return NextResponse.json({ ok: true })
    
  } catch (err: any) {
    console.error('SendGrid error:', err?.response?.body || err?.message || err)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}