import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    // Validate required environment variables first
    const requiredEnvVars = {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.error('Missing required environment variables:', missingVars)
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const { plan, priceId, customerEmail, utm_source, utm_medium, utm_campaign } = await request.json()

    // Input validation
    if (!plan || plan !== 'King Plan') {
      return NextResponse.json(
        { error: 'Invalid plan selected. Only King Plan is available.' },
        { status: 400 }
      )
    }

    // Use environment variable if priceId not provided, with validation
    const finalPriceId = priceId || process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID

    // Additional validation for price ID format
    if (!finalPriceId || !finalPriceId.startsWith('price_')) {
      console.error('Invalid price ID format:', finalPriceId)
      return NextResponse.json(
        { error: 'Invalid pricing configuration. Please contact support.' },
        { status: 500 }
      )
    }

    // Create comprehensive metadata for BotPenguin integration
    const metadata = {
      plan: 'King Plan',
      partner: 'AI Chatbot Solutions',
      partner_id: process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_ID || '',
      redirect_type: 'botpenguin_signup',
      source: 'website',
      created_at: new Date().toISOString(),
      ...(utm_source && { utm_source }),
      ...(utm_medium && { utm_medium }),
      ...(utm_campaign && { utm_campaign }),
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      
      // Metadata for BotPenguin integration
      metadata,
      
      // Success and cancel URLs
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      
      // Customer information
      ...(customerEmail && { customer_email: customerEmail }),
      billing_address_collection: 'required',
      
      // Additional options
      allow_promotion_codes: true,
      automatic_tax: {
        enabled: true,
      },
      
      subscription_data: {
        description: 'BotPenguin King Plan - AI Chatbot Solution (50% Discount)',
        metadata: {
          ...metadata,
          original_price: '$399/month',
          discounted_price: '$199/month',
          discount_percentage: '50%',
        },
      },
      
      // Custom fields for additional customer info
      custom_fields: [
        {
          key: 'company_name',
          label: {
            type: 'text',
            text: 'Company Name',
          },
          type: 'text',
          optional: true,
        },
        {
          key: 'business_size',
          label: {
            type: 'text',
            text: 'Business Size',
          },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Solo/Freelancer', value: 'solo' },
              { label: 'Small Business (2-10 employees)', value: 'small' },
              { label: 'Medium Business (11-50 employees)', value: 'medium' },
              { label: 'Large Business (50+ employees)', value: 'large' },
            ],
          },
          optional: true,
        },
      ],
      
      // Consent collection
      consent_collection: {
        terms_of_service: 'required',
        privacy_policy: 'required',
      },
      
      // Phone number collection
      phone_number_collection: {
        enabled: true,
      },
    })

    // Log successful session creation for debugging
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('Stripe session created:', {
        sessionId: session.id,
        priceId: finalPriceId,
        plan,
        metadata,
      })
    }

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
    })
    
  } catch (error) {
    console.error('Error creating checkout session:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: error.message,
          type: 'stripe_error',
          code: error.code,
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        type: 'server_error',
      },
      { status: 500 }
    )
  }
}