'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-green-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-brand-green/20 rounded-full border border-brand-green/30"
            >
              <CheckCircle className="h-4 w-4 text-brand-green mr-2" />
              <span className="text-sm font-medium text-gray-800">
                Powered by Enterprise AI Technology
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-heading">
                Custom AI Chatbots for
                <span className="text-brand-blue"> Legal, E‑Commerce & Healthcare</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Automate customer support, client intake, and appointment scheduling 
                with industry-specific, HIPAA-compliant chatbot solutions.
              </p>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 text-sm"
            >
              {[
                'HIPAA Compliant',
                'Reduce No-Shows by 40%',
                'Cart Abandonment Recovery',
                'Automated Client Intake',
                'Multi-Platform Deployment'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-brand-green" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-200 shadow-lg"
                onClick={() => {
                  document.getElementById('interactive-demo')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                  // Track demo navigation
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'demo_launch_from_hero', {
                      event_category: 'interactive_demo',
                      event_label: 'hero_cta',
                      value: 1
                    });
                  }
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Launch Interactive Demo
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg transition-all duration-200"
              >
                <Link href="/pricing">
                  View Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8"
            >
              <p className="text-sm text-gray-500 mb-4">Trusted by law firms and healthcare practices nationwide</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-gray-400 font-semibold">Legal Solutions</div>
                <div className="text-gray-400 font-semibold">Healthcare AI</div>
                <div className="text-gray-400 font-semibold">HIPAA Compliant</div>
                <div className="text-gray-400 font-semibold">24/7 Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Chat Interface */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">AI</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Legal Assistant</h3>
                      <p className="text-sm text-green-500">● Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Bot Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-800">
                        Hi! I can help schedule consultations and collect client information. How can I assist you?
                      </p>
                    </div>
                  </div>
                  
                  {/* User Message */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-brand-blue rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-sm text-white">
                        I need to schedule a consultation for family law
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm">U</span>
                    </div>
                  </div>
                  
                  {/* Bot Response */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-800">
                        Perfect! I can schedule your family law consultation. What dates work best for you? I'll also collect some basic information to help prepare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-brand-green text-black px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
              >
                100% Automated
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-lg text-sm"
              >
                <span className="text-brand-blue font-semibold">24/7</span> Support
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}