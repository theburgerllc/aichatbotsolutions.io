'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Users, Award, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'


export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              About AI Chatbot Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Your trusted partner in AI-powered business automation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe every business deserves access to powerful AI technology that can transform 
                customer experiences and drive growth. That's why we've partnered with BotPenguin to 
                bring you the most advanced chatbot solutions at affordable prices.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our goal is to democratize AI chatbot technology, making it accessible to businesses 
                of all sizes - from startups to enterprises. We focus on delivering real results: 
                reduced costs, increased sales, and happier customers.
              </p>
              <div className="space-y-4">
                {[
                  'Simplify AI chatbot implementation',
                  'Provide exceptional customer support',
                  'Deliver measurable business results',
                  'Make advanced AI accessible to all'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-brand-green mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 font-heading">Why Partner with Us?</h3>
                <ul className="space-y-3">
                  <li>✓ Certified BotPenguin experts</li>
                  <li>✓ 50% savings on King Plan</li>
                  <li>✓ Dedicated implementation support</li>
                  <li>✓ Ongoing optimization guidance</li>
                  <li>✓ 24/7 priority customer service</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Our partnership with BotPenguin has helped thousands of businesses transform their customer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">10,000+</div>
              <div className="text-gray-600">Businesses Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">5M+</div>
              <div className="text-gray-600">Conversations Handled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">40%</div>
              <div className="text-gray-600">Average Sales Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Customer Success</h3>
              <p className="text-gray-600">
                Your success is our success. We're committed to helping you achieve measurable results 
                with our AI chatbot solutions.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from product quality to customer service 
                and ongoing support.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Target className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Innovation</h3>
              <p className="text-gray-600">
                We stay at the forefront of AI technology, continuously improving our solutions to 
                meet evolving business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BotPenguin Partnership */}
      <section className="py-20 bg-gradient-to-r from-brand-blue to-brand-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 font-heading">
            Powered by BotPenguin
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            We're proud to be an official partner of BotPenguin, one of the world's leading 
            AI chatbot platforms trusted by over 100,000 businesses globally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">Why BotPenguin?</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Advanced GPT-4 powered AI</li>
                <li>• Multi-platform deployment</li>
                <li>• Enterprise-grade security</li>
                <li>• Comprehensive analytics</li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">Our Partnership Benefits</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Exclusive 50% discount on King Plan</li>
                <li>• Priority technical support</li>
                <li>• Custom implementation assistance</li>
                <li>• Ongoing optimization guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using our AI chatbot solutions to automate 
            customer support and boost sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold px-8 py-3 hover:scale-105 transition-all duration-200"
            >
              <Link href="/pricing">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold px-8 py-3 transition-all duration-200"
            >
              <Link href="/contact">
                Schedule a Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}