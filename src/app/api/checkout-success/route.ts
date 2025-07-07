import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'subscription.items'],
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Extract comprehensive customer information
    const customerEmail = session.customer_details?.email || (session.customer as any)?.email
    const customerName = session.customer_details?.name || ''
    const customerPhone = session.customer_details?.phone || ''
    const customerAddress = session.customer_details?.address
    const customFields = session.custom_fields || []

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
      )
    }

    // Extract custom field values
    const companyName = customFields.find(field => field.key === 'company_name')?.text?.value || ''
    const businessSize = customFields.find(field => field.key === 'business_size')?.dropdown?.value || ''

    // Validate BotPenguin configuration
    if (!process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_REDIRECT_URL) {
      console.error('BotPenguin partner redirect URL not configured')
      const fallbackUrl = new URL('/success', process.env.NEXT_PUBLIC_APP_URL!)
      fallbackUrl.searchParams.set('error', 'configuration_error')
      return NextResponse.redirect(fallbackUrl.toString())
    }

    // Construct BotPenguin partner signup URL with comprehensive data
    const botpenguinRedirectUrl = new URL(
      process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_REDIRECT_URL
    )
    
    // Add customer information as query parameters
    botpenguinRedirectUrl.searchParams.set('customer_email', customerEmail)
    botpenguinRedirectUrl.searchParams.set('customer_name', customerName)
    botpenguinRedirectUrl.searchParams.set('plan', 'King Plan')
    botpenguinRedirectUrl.searchParams.set('partner_id', process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_ID || '')
    botpenguinRedirectUrl.searchParams.set('session_id', sessionId)
    botpenguinRedirectUrl.searchParams.set('subscription_id', (session.subscription as any)?.id || '')
    botpenguinRedirectUrl.searchParams.set('amount', (session.amount_total || 0).toString())
    botpenguinRedirectUrl.searchParams.set('currency', session.currency || 'usd')
    botpenguinRedirectUrl.searchParams.set('payment_date', new Date().toISOString())
    
    // Add optional fields if available
    if (customerPhone) {
      botpenguinRedirectUrl.searchParams.set('customer_phone', customerPhone)
    }
    if (companyName) {
      botpenguinRedirectUrl.searchParams.set('company_name', companyName)
    }
    if (businessSize) {
      botpenguinRedirectUrl.searchParams.set('business_size', businessSize)
    }
    if (customerAddress) {
      botpenguinRedirectUrl.searchParams.set('customer_country', customerAddress.country || '')
      botpenguinRedirectUrl.searchParams.set('customer_city', customerAddress.city || '')
    }

    // Add UTM parameters from session metadata if available
    const sessionMetadata = session.metadata || {}
    if (sessionMetadata.utm_source) {
      botpenguinRedirectUrl.searchParams.set('utm_source', sessionMetadata.utm_source)
    }
    if (sessionMetadata.utm_medium) {
      botpenguinRedirectUrl.searchParams.set('utm_medium', sessionMetadata.utm_medium)
    }
    if (sessionMetadata.utm_campaign) {
      botpenguinRedirectUrl.searchParams.set('utm_campaign', sessionMetadata.utm_campaign)
    }

    // Log the successful conversion for analytics and debugging
    const conversionData = {
      sessionId,
      customerEmail,
      customerName,
      customerPhone,
      companyName,
      businessSize,
      subscriptionId: (session.subscription as any)?.id,
      amount: session.amount_total,
      currency: session.currency,
      paymentDate: new Date().toISOString(),
      botpenguinRedirectUrl: botpenguinRedirectUrl.toString(),
      metadata: sessionMetadata,
    }

    console.log('Successful King Plan purchase:', conversionData)

    // For debugging mode, also log the full session object
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('Full Stripe session:', JSON.stringify(session, null, 2))
    }

    // Redirect to BotPenguin partner portal
    return NextResponse.redirect(botpenguinRedirectUrl.toString())
    
  } catch (error) {
    console.error('Error processing checkout success:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      // Log Stripe-specific errors
      console.error('Stripe error details:', {
        type: error.type,
        code: error.code,
        message: error.message,
        param: error.param,
      })
      
      return NextResponse.json(
        { 
          error: error.message,
          type: 'stripe_error',
          code: error.code,
        },
        { status: 400 }
      )
    }
    
    // Redirect to a fallback success page if BotPenguin redirect fails
    const fallbackUrl = new URL('/success', process.env.NEXT_PUBLIC_APP_URL!)
    fallbackUrl.searchParams.set('error', 'redirect_failed')
    fallbackUrl.searchParams.set('message', 'Payment successful but redirect failed')
    
    return NextResponse.redirect(fallbackUrl.toString())
  }
}