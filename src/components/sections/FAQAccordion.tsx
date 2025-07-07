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
    question: 'What is the BotPenguin King Plan?',
    answer: 'The King Plan is BotPenguin\'s most comprehensive AI chatbot solution, offering unlimited conversations, advanced AI capabilities, multi-platform deployment, and priority support. It includes everything you need to automate customer service and boost sales.'
  },
  {
    question: 'How does the 14-day free trial work?',
    answer: 'You can try the King Plan completely free for 14 days with full access to all features. No credit card required for the trial. If you choose to continue after the trial, you\'ll be billed the monthly subscription fee.'
  },
  {
    question: 'What platforms can I deploy my chatbot on?',
    answer: 'The King Plan supports deployment across multiple channels including your website, WhatsApp Business, Facebook Messenger, Telegram, Instagram, and more. You can manage all conversations from a single dashboard.'
  },
  {
    question: 'Is there a setup fee or hidden costs?',
    answer: 'No, there are no setup fees or hidden costs. The King Plan pricing is transparent at $199/month with a 50% discount from the regular $399 price. You only pay the monthly subscription fee.'
  },
  {
    question: 'What kind of support do I get?',
    answer: 'King Plan subscribers receive priority 24/7 support via chat, email, and phone. You also get access to comprehensive documentation, video tutorials, and a dedicated customer success manager for enterprise accounts.'
  },
  {
    question: 'Can I integrate the chatbot with my existing systems?',
    answer: 'Yes! The King Plan includes API access and supports integrations with popular CRM systems, e-commerce platforms, helpdesk software, and more. Our team can help you set up custom integrations.'
  },
  {
    question: 'How does the AI understand and respond to customers?',
    answer: 'Our chatbots use advanced natural language processing (NLP) and are powered by GPT-4. They can understand context, handle complex queries, and provide personalized responses. You can train the bot with your specific business knowledge.'
  },
  {
    question: 'What happens to my data and conversations?',
    answer: 'Your data is completely secure and encrypted. We comply with GDPR, SOC 2, and other security standards. You own all your data and conversation history, and can export it at any time. We never share your data with third parties.'
  },
  {
    question: 'Can I customize the chatbot\'s appearance and responses?',
    answer: 'Absolutely! The King Plan includes full white-label customization. You can customize the chatbot\'s appearance, personality, responses, and even remove BotPenguin branding to match your brand identity.'
  },
  {
    question: 'What if I need to cancel my subscription?',
    answer: 'You can cancel your subscription at any time with no cancellation fees. Your chatbot will remain active until the end of your current billing period. We also offer a 30-day money-back guarantee if you\'re not satisfied.'
  },
  {
    question: 'How quickly can I get my chatbot up and running?',
    answer: 'Most customers have their chatbot live within 24-48 hours. We provide templates, guided setup, and our support team can help you get started quickly. Complex custom integrations may take a few days.'
  },
  {
    question: 'Do you offer training and onboarding?',
    answer: 'Yes! All King Plan subscribers get comprehensive onboarding including setup assistance, training sessions, and best practices guidance. We ensure you get maximum value from your AI chatbot investment.'
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
            Everything you need to know about our AI chatbot solutions and the King Plan
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
              Our support team is here to help you understand how AI chatbots can transform your business. 
              Get personalized answers to your specific questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-brand-blue font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-brand-blue transition-colors"
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