'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What makes your chatbot solutions industry-specific?',
    answer: 'Our Legal and Healthcare Chatbot Suites are specifically designed for their respective industries. Legal chatbots handle client intake, case management, and appointment scheduling with legal-specific workflows. Healthcare chatbots are HIPAA-compliant and include patient triage, appointment reminders, and medical questionnaires.'
  },
  {
    question: 'How do the setup fees and monthly costs work?',
    answer: 'Our Legal Suite is $1,500 setup + $200/month, and Healthcare Suite is $1,800 setup + $250/month. The setup fee covers complete implementation, customization, training, and integration with your existing systems. Monthly fees cover hosting, support, and ongoing maintenance.'
  },
  {
    question: 'Is the healthcare solution truly HIPAA compliant?',
    answer: 'Yes, absolutely. Our healthcare chatbot solution meets all HIPAA requirements including data encryption, access controls, audit logging, and secure data transmission. We provide a Business Associate Agreement (BAA) and undergo regular compliance audits.'
  },
  {
    question: 'What systems can you integrate with?',
    answer: 'We integrate with popular practice management systems including Clio (legal), Epic, Cerner (healthcare), calendar systems like Calendly, CRM platforms, and communication tools. Custom integrations are included in your setup fee.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most implementations are completed within 2-3 weeks. This includes chatbot customization, system integrations, staff training, and testing. We work around your schedule to minimize disruption to your practice.'
  },
  {
    question: 'What kind of support do we receive?',
    answer: 'You receive dedicated support from our team of legal and healthcare technology specialists. This includes 24/7 technical support, regular check-ins, performance optimization, and assistance with updates or changes to your chatbot.'
  },
  {
    question: 'Can the chatbot handle complex legal or medical questions?',
    answer: 'Our chatbots are designed to handle routine inquiries and collect information, but they intelligently route complex cases to appropriate staff members. They can provide general information while ensuring sensitive matters are handled by qualified professionals.'
  },
  {
    question: 'How do you ensure patient/client data security?',
    answer: 'We use enterprise-grade security including end-to-end encryption, secure cloud hosting, regular security audits, and strict access controls. All data is stored in compliance with HIPAA and legal industry standards. We never share or sell your data.'
  },
  {
    question: 'Can we customize the chatbot for our specific practice?',
    answer: 'Absolutely! Each chatbot is fully customized for your practice including your branding, specific workflows, intake forms, appointment types, and communication style. We work with you to ensure it matches your practice\'s unique needs.'
  },
  {
    question: 'What happens if we want to cancel?',
    answer: 'You can cancel your monthly subscription at any time with 30 days notice. Your chatbot will remain active until the end of your billing period. The initial setup investment is non-refundable after implementation is complete.'
  },
  {
    question: 'Do you provide training for our staff?',
    answer: 'Yes! Comprehensive staff training is included in your setup fee. We provide hands-on training sessions, documentation, and ongoing support to ensure your team can effectively manage and optimize the chatbot.'
  },
  {
    question: 'Can the chatbot work with multiple communication channels?',
    answer: 'Yes, our chatbots deploy across your website, patient portals, WhatsApp, SMS, and other communication channels you use. This provides a consistent experience for clients/patients regardless of how they contact your practice.'
  }
]

export default function FAQAccordion() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our legal and healthcare chatbot solutions
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-brand-blue hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-brand-blue to-brand-green rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-heading">
              Still have questions?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our team specializes in legal and healthcare AI solutions. 
              Get personalized answers about how chatbots can transform your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-brand-blue font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-block"
              >
                Contact Support
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-brand-blue transition-colors inline-block"
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