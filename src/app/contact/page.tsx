'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Pre-fill form from URL parameters (for Enterprise inquiries)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const subject = urlParams.get('subject')
    if (subject) {
      setFormData(prev => ({ ...prev, subject: decodeURIComponent(subject) }))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage(data.message)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Ready to transform your business with AI chatbots? Let's talk!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 font-heading">
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-green-800 font-medium">{statusMessage}</span>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <span className="text-red-800">{statusMessage}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <Input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full"
                        placeholder="Tell us about your business needs and how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-green hover:bg-brand-green/90 text-black font-semibold py-3"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">
                  Let's Start a Conversation
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're ready to get started or just want to learn more about how AI chatbots 
                  can transform your business, we're here to help.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-brand-blue mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                        <p className="text-gray-600">hello@aichatbotsolutions.io</p>
                        <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-brand-blue mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-brand-blue mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                        <p className="text-gray-600">San Francisco, CA</p>
                        <p className="text-sm text-gray-500 mt-1">Available for in-person meetings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-brand-blue mt-1 mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                        <p className="text-gray-600">Within 24 hours</p>
                        <p className="text-sm text-gray-500 mt-1">Urgent requests: Use the phone number above</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 font-heading">Ready to Get Started?</h3>
                <p className="mb-6 text-blue-100">
                  Skip the wait and start your free trial today. No credit card required, 
                  and you can be up and running in minutes.
                </p>
                <Button className="bg-white text-brand-blue hover:bg-gray-100 font-semibold">
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}