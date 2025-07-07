'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Crown, Zap, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small businesses getting started with AI chatbots',
    features: [
      'Up to 1,000 conversations/month',
      '24/7 basic chatbot support',
      'Website integration',
      'Basic analytics dashboard',
      'Email support',
      'Standard templates'
    ],
    cta: 'Start Free Trial',
    popular: false,
    comingSoon: true
  },
  {
    name: 'King Plan',
    price: '$199',
    period: '/month',
    originalPrice: '$399',
    description: 'Our most popular plan - everything you need to scale your business',
    features: [
      'Unlimited conversations',
      'Advanced AI with GPT-4 integration',
      'Multi-platform deployment (Website, WhatsApp, Facebook, Telegram)',
      'Advanced analytics & reporting',
      'Custom branding & white-label options',
      'Priority 24/7 support',
      'API access & integrations',
      'Lead generation tools',
      'E-commerce integrations',
      'Custom workflows & automations',
      'Team collaboration tools',
      'Advanced security features'
    ],
    cta: 'Get King Plan Now',
    popular: true,
    comingSoon: false,
    badge: 'Most Popular',
    savings: 'Save 50%'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations with specific requirements',
    features: [
      'Everything in King Plan',
      'Dedicated account manager',
      'Custom AI model training',
      'On-premise deployment options',
      'Advanced security & compliance',
      'Custom integrations',
      'SLA guarantees',
      'Training & onboarding'
    ],
    cta: 'Contact Sales',
    popular: false,
    comingSoon: true
  }
]

export default function PricingTable() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handlePlanSelection = async (planName: string) => {
    if (planName !== 'King Plan') {
      // For non-King plans, show coming soon or contact
      return
    }

    setIsLoading(planName)
    
    try {
      // Create Stripe checkout session for King Plan
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: 'King Plan',
          priceId: process.env.NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get started with our AI chatbot solutions. All plans include a 14-day free trial.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-brand-green/20 rounded-full border border-brand-green/30">
            <Crown className="h-4 w-4 text-brand-green mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Powered by BotPenguin - Trusted by 100,000+ businesses
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'md:scale-105 md:-mt-4' : ''}`}
            >
              <Card className={`h-full border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-brand-green shadow-xl bg-white' 
                  : 'border-gray-200 bg-white hover:border-brand-blue/30'
              }`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-green text-black px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {plan.savings}
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <div className="flex items-center justify-center">
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-lg mr-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-brand-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelection(plan.name)}
                    disabled={plan.comingSoon || isLoading === plan.name}
                    className={`w-full py-3 font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-brand-green hover:bg-brand-green/90 text-black hover:scale-105'
                        : plan.comingSoon
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-blue hover:bg-brand-blue/90 text-white hover:scale-105'
                    }`}
                  >
                    {isLoading === plan.name ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Processing...
                      </div>
                    ) : plan.comingSoon ? (
                      'Coming Soon'
                    ) : (
                      <>
                        {plan.cta}
                        {plan.name === 'King Plan' && (
                          <Zap className="ml-2 h-4 w-4" />
                        )}
                      </>
                    )}
                  </Button>

                  {/* Additional Info */}
                  {plan.name === 'King Plan' && (
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        14-day free trial • No setup fees • Cancel anytime
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Why Choose Our King Plan?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">50%</div>
                <div className="text-gray-600 text-sm">Cost Savings vs Enterprise Plans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Priority Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">Unlimited</div>
                <div className="text-gray-600 text-sm">Conversations & Integrations</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full border border-green-200">
            <Check className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              30-day money-back guarantee on all plans
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}