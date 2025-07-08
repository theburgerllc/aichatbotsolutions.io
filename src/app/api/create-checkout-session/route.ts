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

    const { plan, industry, priceId, customerEmail, utm_source, utm_medium, utm_campaign } = await request.json()

    // Input validation
    const validPlans = ['Legal Chatbot Suite', 'Healthcare Chatbot Suite', 'E‑Commerce Chatbot Suite']
    if (!plan || !validPlans.includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan selected. Please choose Legal, E‑Commerce, or Healthcare Chatbot Suite.' },
        { status: 400 }
      )
    }

    // Determine price based on industry
    let finalPriceId = priceId
    let setupAmount = 0
    
    if (!finalPriceId) {
      if (industry === 'legal') {
        finalPriceId = process.env.NEXT_PUBLIC_STRIPE_LEGAL_SUITE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID
        setupAmount = 1500 // $1,500 setup fee
      } else if (industry === 'ecommerce') {
        finalPriceId = process.env.NEXT_PUBLIC_STRIPE_ECOMMERCE_SUITE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID
        setupAmount = 1700 // $1,700 setup fee
      } else if (industry === 'healthcare') {
        finalPriceId = process.env.NEXT_PUBLIC_STRIPE_HEALTHCARE_SUITE_PRICE_ID || process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID
        setupAmount = 1800 // $1,800 setup fee
      } else {
        return NextResponse.json(
          { error: 'Invalid industry specified. Please select legal, e‑commerce, or healthcare.' },
          { status: 400 }
        )
      }
    }

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
      plan: plan,
      industry: industry,
      setup_amount: setupAmount.toString(),
      partner: 'AI Chatbot Solutions',
      partner_id: process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_ID || '',
      redirect_type: 'botpenguin_signup',
      source: 'website',
      service_type: industry === 'legal' ? 'Legal Chatbot Solution' : 
                   industry === 'ecommerce' ? 'E‑Commerce Chatbot Solution' : 
                   'Healthcare Chatbot Solution',
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
        description: `${plan} - Custom AI Chatbot Solution`,
        metadata: {
          ...metadata,
          setup_fee: `$${setupAmount}`,
          monthly_fee: industry === 'legal' ? '$200/month' : 
                      industry === 'ecommerce' ? '$225/month' : 
                      '$250/month',
        },
      },
      
      // Custom fields for additional customer info
      custom_fields: [
        {
          key: industry === 'legal' ? 'firm_name' : 
               industry === 'ecommerce' ? 'store_name' : 
               'practice_name',
          label: {
            type: 'text',
            text: industry === 'legal' ? 'Law Firm Name' : 
                  industry === 'ecommerce' ? 'Store/Business Name' : 
                  'Practice Name',
          },
          type: 'text',
          optional: false,
        },
        {
          key: industry === 'ecommerce' ? 'business_size' : 'practice_size',
          label: {
            type: 'text',
            text: industry === 'legal' ? 'Firm Size' : 
                  industry === 'ecommerce' ? 'Business Size' : 
                  'Practice Size',
          },
          type: 'dropdown',
          dropdown: {
            options: industry === 'legal' ? [
              { label: 'Solo Practitioner', value: 'solo' },
              { label: 'Small Firm (2-10 attorneys)', value: 'small' },
              { label: 'Medium Firm (11-50 attorneys)', value: 'medium' },
              { label: 'Large Firm (50+ attorneys)', value: 'large' },
            ] : industry === 'ecommerce' ? [
              { label: 'Solo Entrepreneur', value: 'solo' },
              { label: 'Small Business (2-10 employees)', value: 'small' },
              { label: 'Medium Business (11-50 employees)', value: 'medium' },
              { label: 'Large Business (50+ employees)', value: 'large' },
            ] : [
              { label: 'Solo Practitioner', value: 'solo' },
              { label: 'Small Practice (2-10 providers)', value: 'small' },
              { label: 'Medium Practice (11-50 providers)', value: 'medium' },
              { label: 'Large Practice/Hospital (50+ providers)', value: 'large' },
            ],
          },
          optional: true,
        },
        {
          key: 'specialty',
          label: {
            type: 'text',
            text: industry === 'legal' ? 'Practice Area' : 
                  industry === 'ecommerce' ? 'Industry/Product Category' : 
                  'Medical Specialty',
          },
          type: 'text',
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