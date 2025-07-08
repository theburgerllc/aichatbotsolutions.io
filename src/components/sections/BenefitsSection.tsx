'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  MessageSquare,
  BarChart3,
  Globe,
  ShoppingCart,
  Package
} from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: '24/7 Client Support',
    description: 'Your AI assistant handles client inquiries and appointment scheduling around the clock, even after hours.'
  },
  {
    icon: TrendingUp,
    title: 'Reduce No-Shows by 40%',
    description: 'Automated appointment reminders and confirmations significantly improve patient/client attendance rates.'
  },
  {
    icon: Users,
    title: 'Streamline Intake Process',
    description: 'Automatically collect client information, medical history, and legal case details before appointments.'
  },
  {
    icon: ShoppingCart,
    title: 'Cart Abandonment Recovery',
    description: 'Automatically recover lost sales with personalized messages and incentives when customers leave items in their cart.'
  },
  {
    icon: Package,
    title: 'Order Tracking & Support',
    description: 'Provide instant order status updates and handle customer service inquiries about shipping and returns.'
  },
  {
    icon: Zap,
    title: 'Instant Triage & Routing',
    description: 'Intelligently categorize urgent cases and route them to the appropriate staff members immediately.'
  },
  {
    icon: Shield,
    title: 'HIPAA Compliant Security',
    description: 'Bank-level encryption and HIPAA compliance ensures patient data and legal information stays protected.'
  },
  {
    icon: MessageSquare,
    title: 'Multi-Platform Messaging',
    description: 'Connect with clients through website chat, WhatsApp, SMS, and patient portal integrations.'
  },
  {
    icon: BarChart3,
    title: 'Practice Analytics',
    description: 'Track appointment patterns, common inquiries, and client satisfaction to optimize your practice.'
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Serve diverse communities with intelligent translation capabilities in 100+ languages.'
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
            Streamline Your Business with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Automate routine tasks, improve client experience, and focus on what matters most - providing excellent care
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <FadeIn delay={index * 100}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group h-full"
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
              </FadeIn>
            </motion.div>
          ))}
        </motion.div>

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
              Ready to Transform Your Practice?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of legal and healthcare practices already using AI to improve efficiency and client satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-block"
              >
                View Solutions
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-block"
              >
                Schedule a Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}