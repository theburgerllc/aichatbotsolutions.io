import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Log successful checkout
        console.log('Checkout session completed:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amount: session.amount_total,
          currency: session.currency,
          metadata: session.metadata,
        })

        // If this is a King Plan purchase, trigger any additional processing
        if (session.metadata?.plan === 'King Plan') {
          await handleKingPlanPurchase(session)
        }
        
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Log successful recurring payment
        console.log('Invoice payment succeeded:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          customerEmail: invoice.customer_email,
          amount: invoice.amount_paid,
          currency: invoice.currency,
        })
        
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Log failed payment
        console.error('Invoice payment failed:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          customerEmail: invoice.customer_email,
          amount: invoice.amount_due,
          currency: invoice.currency,
        })
        
        // Here you could implement customer notification logic
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Log subscription cancellation
        console.log('Subscription cancelled:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
        })
        
        // Here you could implement cleanup logic or notify BotPenguin
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleKingPlanPurchase(session: Stripe.Checkout.Session) {
  try {
    // Additional processing for King Plan purchases
    console.log('Processing King Plan purchase:', {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
    })

    // Here you could:
    // 1. Send welcome email via SendGrid
    // 2. Track conversion in analytics
    // 3. Update internal records
    // 4. Notify team of new purchase
    
    // Example: Track conversion event (if Google Analytics is set up)
    await trackConversionEvent(session)
    
  } catch (error) {
    console.error('Error processing King Plan purchase:', error)
  }
}

// Optional: Track conversion events
async function trackConversionEvent(session: Stripe.Checkout.Session) {
  // Implementation would depend on your analytics setup
  // This could integrate with Google Analytics 4, Mixpanel, etc.
  console.log('Tracking conversion event:', {
    event: 'king_plan_purchase',
    value: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency,
    customer_email: session.customer_details?.email,
  })
}