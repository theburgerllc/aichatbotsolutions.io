'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  MessageSquare,
  BarChart3,
  Globe
} from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Your AI chatbot works around the clock, providing instant responses to customers anytime, anywhere.'
  },
  {
    icon: TrendingUp,
    title: 'Increase Sales by 40%',
    description: 'Convert more visitors into customers with proactive engagement and personalized product recommendations.'
  },
  {
    icon: Users,
    title: 'Reduce Support Costs',
    description: 'Automate up to 80% of customer inquiries, reducing workload on your support team dramatically.'
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Eliminate wait times with immediate answers to common questions and seamless handoffs to human agents.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with data encryption, compliance certifications, and privacy protection.'
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel Support',
    description: 'Deploy across website, WhatsApp, Facebook Messenger, Telegram, and other popular platforms.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get detailed insights into customer behavior, conversation patterns, and performance metrics.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Support customers in 100+ languages with intelligent translation and localization features.'
  }
]

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50">
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
            Why Choose Our AI Chatbots?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your customer experience with intelligent automation that delivers results
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Icon */}
                    <div className="p-3 bg-brand-blue/10 rounded-xl group-hover:bg-brand-blue/20 transition-colors">
                      <benefit.icon className="h-8 w-8 text-brand-blue" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 font-heading">
                      {benefit.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses already using AI chatbots to grow their revenue and improve customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Start Your Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Schedule a Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}