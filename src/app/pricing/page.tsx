import { Metadata } from 'next'
import PricingTable from '@/components/sections/PricingTable'
import FAQAccordion from '@/components/sections/FAQAccordion'

export const metadata: Metadata = {
  title: 'Pricing - AI Chatbot Solutions | BotPenguin King Plan',
  description: 'Get the BotPenguin King Plan for just $199/month (50% off). Unlimited conversations, multi-platform support, advanced AI features, and 24/7 priority support.',
  openGraph: {
    title: 'Pricing - AI Chatbot Solutions | BotPenguin King Plan',
    description: 'Get the BotPenguin King Plan for just $199/month (50% off). Unlimited conversations, multi-platform support, advanced AI features, and 24/7 priority support.',
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Get the most powerful AI chatbot solution at an unbeatable price
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full border border-green-200">
            <span className="text-green-800 font-semibold">
              🎉 Limited Time: 50% OFF King Plan - Save $200/month!
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable />

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">
            Why Businesses Choose Our King Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-brand-blue mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-brand-blue mb-2">10k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-brand-blue mb-2">24/7</div>
              <div className="text-gray-600">Priority Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}