'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Crown, Zap, Star } from 'lucide-react'

const plans = [
  {
    name: 'Legal Chatbot Suite',
    price: '$1,500',
    period: ' setup + $200/mo',
    description: 'Complete AI automation solution for law firms and legal practices',
    features: [
      'Automated client intake forms',
      'Appointment scheduling & calendar integration',
      'Document collection & organization',
      'Lead qualification & routing',
      'Multi-platform deployment (Website, WhatsApp, Facebook)',
      'Custom legal workflows & automations',
      'Client communication templates',
      'Case status updates & notifications',
      'Analytics & reporting dashboard',
      'Priority support & training'
    ],
    cta: 'Get Legal Suite',
    popular: true,
    comingSoon: false,
    badge: 'Popular Choice',
    industry: 'legal'
  },
  {
    name: 'Healthcare Chatbot Suite',
    price: '$1,800',
    period: ' setup + $250/mo',
    description: 'HIPAA-compliant AI solution for healthcare practices and medical facilities',
    features: [
      'HIPAA-compliant patient messaging',
      'Appointment scheduling & reminders',
      'Symptom triage & pre-screening',
      'Patient follow-up automation',
      'Insurance verification assistance',
      'Prescription refill requests',
      'Patient education & resources',
      'Multi-language support',
      'EMR/EHR integration capabilities',
      'Dedicated healthcare support team'
    ],
    cta: 'Get Healthcare Suite',
    popular: false,
    comingSoon: false,
    badge: 'HIPAA Compliant',
    industry: 'healthcare'
  }
]

export default function PricingTable() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handlePlanSelection = async (planName: string, industry: string) => {
    setIsLoading(planName)
    
    try {
      // Get UTM parameters for tracking
      const urlParams = new URLSearchParams(window.location.search)
      const utm_source = urlParams.get('utm_source')
      const utm_medium = urlParams.get('utm_medium') 
      const utm_campaign = urlParams.get('utm_campaign')

      // Create Stripe checkout session for the selected suite
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planName,
          industry: industry,
          ...(utm_source && { utm_source }),
          ...(utm_medium && { utm_medium }),
          ...(utm_campaign && { utm_campaign }),
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }
      
      if (data.url) {
        // Track the checkout initiation
        if (typeof window !== 'undefined' && window.gtag) {
          const value = industry === 'legal' ? 1500 : 1800
          window.gtag('event', 'begin_checkout', {
            currency: 'USD',
            value: value,
            items: [{
              item_id: industry === 'legal' ? 'legal_chatbot_suite' : 'healthcare_chatbot_suite',
              item_name: planName,
              category: 'Service',
              quantity: 1,
              price: value
            }]
          })
        }
        
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      alert(`Payment Error: ${errorMessage}\n\nIf this problem persists, please contact support at hello@aichatbotsolutions.io`)
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
            Industry-Specific Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Custom AI chatbot solutions designed specifically for legal and healthcare practices.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-brand-green/20 rounded-full border border-brand-green/30">
            <Crown className="h-4 w-4 text-brand-green mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Powered by Enterprise AI Technology - HIPAA Compliant
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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


                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <div className="flex items-center justify-center">
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
                    onClick={() => handlePlanSelection(plan.name, plan.industry)}
                    disabled={isLoading === plan.name}
                    className={`w-full py-3 font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-brand-green hover:bg-brand-green/90 text-black hover:scale-105'
                        : 'bg-brand-blue hover:bg-brand-blue/90 text-white hover:scale-105'
                    }`}
                  >
                    {isLoading === plan.name ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        {plan.cta}
                        <Zap className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Additional Info */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Free consultation • Full setup included • Ongoing support
                    </p>
                  </div>
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
              Why Choose Our Industry-Specific Solutions?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">40%</div>
                <div className="text-gray-600 text-sm">Reduction in No-Shows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Automated Client Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-2">HIPAA</div>
                <div className="text-gray-600 text-sm">Compliant & Secure</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
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
              Free consultation and setup support included
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}