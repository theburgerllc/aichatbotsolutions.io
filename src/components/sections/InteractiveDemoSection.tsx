'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import DemoEmbed from '@/components/DemoEmbed'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Users, Clock, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const demoFeatures = [
  {
    icon: Play,
    title: "Interactive Experience",
    description: "Click through a real chatbot demo - no sign-up required"
  },
  {
    icon: Users,
    title: "Industry-Specific",
    description: "See legal and healthcare workflows in action"
  },
  {
    icon: Clock,
    title: "5-Minute Demo",
    description: "Quick walkthrough of key automation features"
  },
  {
    icon: Shield,
    title: "Live Environment",
    description: "Experience the actual chatbot interface and capabilities"
  }
]

export default function InteractiveDemoSection() {
  
  const handleContactAfterDemo = () => {
    // Track conversion intent after demo
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'contact_after_demo', {
        event_category: 'conversion',
        event_label: 'demo_to_contact',
        value: 5
      })
    }
  }

  return (
    <section id="interactive-demo" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-brand-green/20 rounded-full border border-brand-green/30 mb-6">
            <Play className="h-4 w-4 text-brand-green mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Interactive Product Demo
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Experience Our AI Chatbots
            <span className="text-brand-blue"> In Action</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a guided tour through our AI chatbot platform. See exactly how it automates client intake, 
            schedules appointments, and handles industry-specific workflows - no signup required.
          </p>
        </motion.div>

        {/* Demo Features Grid */}
        <FadeIn delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Main Demo Embed */}
        <FadeIn delay={400}>
          <div id="demo-embed" className="mb-12" data-demo-id="chatbot-demo">
            <DemoEmbed 
              demoId="ai-chatbot-legal-healthcare" 
              className="max-w-5xl mx-auto"
            />
          </div>
        </FadeIn>

        {/* Call to Action After Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-green rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Ready to Automate Your Practice?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              See how our AI chatbots can reduce no-shows by 40%, automate client intake, 
              and provide 24/7 support for your legal or healthcare practice.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold px-8 py-4 text-lg shadow-lg hover:scale-105 transition-all duration-200"
                onClick={handleContactAfterDemo}
              >
                <Link href="/contact">
                  Schedule Your Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg transition-all duration-200"
              >
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-brand-green" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-brand-green" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-brand-green" />
                  <span>500+ Practices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-brand-green" />
                  <span>Setup in 2 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}