'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Play, Loader, MessageCircle, Users, Building, Stethoscope } from 'lucide-react'

// Dynamic import to prevent SSR issues
const ChatBot = lazy(() => import('react-chatbotify'))

interface DemoEmbedProps {
  demoId?: string
  className?: string
}

export default function DemoEmbed({ 
  demoId = "interactive-demo", 
  className = "" 
}: DemoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [demoType, setDemoType] = useState<'legal' | 'healthcare' | null>(null)
  const [showChat, setShowChat] = useState(false)

  // Track demo events to Google Analytics
  useEffect(() => {
    // Set loading to false after component mounts
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const trackDemoEvent = (eventType: string, additionalData?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventType, {
        demo_id: demoId,
        demo_platform: 'react_chatbotify',
        event_category: 'interactive_demo',
        demo_type: demoType,
        ...additionalData
      })
    }
  }

  const handleDemoStart = (type: 'legal' | 'healthcare') => {
    setDemoType(type)
    setShowChat(true)
    trackDemoEvent('demo_started', { demo_type: type, value: 1 })
  }

  // Legal Demo Flow
  const legalFlow = {
    start: {
      message: "Welcome to our Legal AI Assistant Demo! I'm here to help potential clients with initial consultation and case intake. How can I assist you today?",
      options: ["Personal Injury Case", "Family Law Matter", "Business Legal Issue", "Estate Planning", "Learn About Our Services"]
    },
    "Personal Injury Case": {
      message: "I can help you with your personal injury case. Let me gather some initial information. What type of injury occurred?",
      options: ["Car Accident", "Slip & Fall", "Medical Malpractice", "Workplace Injury", "Other"]
    },
    "Car Accident": {
      message: "I understand you were in a car accident. Here's what I can help you with:\n\n✓ Document your case details\n✓ Schedule consultation with our attorneys\n✓ Connect you with medical professionals\n✓ Guide you through the claims process\n\nWould you like to schedule a free consultation?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"]
    },
    "Family Law Matter": {
      message: "Our family law team handles various matters. What type of family law issue do you need help with?",
      options: ["Divorce", "Child Custody", "Adoption", "Domestic Violence", "Prenuptial Agreement"]
    },
    "Business Legal Issue": {
      message: "We provide comprehensive business legal services. What type of business matter brings you here today?",
      options: ["Contract Review", "Business Formation", "Employment Law", "Intellectual Property", "Litigation"]
    },
    "Schedule Consultation": {
      message: "Excellent! I'll connect you with our scheduling system. A consultation typically takes 30-45 minutes and is completely free. Our attorney will review your case and provide initial guidance.",
      function: () => {
        trackDemoEvent('demo_consultation_scheduled', { demo_type: 'legal', value: 5 })
        return "This would normally redirect to our scheduling system. Demo completed! 🎉"
      }
    }
  }

  // Healthcare Demo Flow
  const healthcareFlow = {
    start: {
      message: "Hello! I'm your virtual healthcare assistant. I can help with appointment scheduling, basic health questions, and connecting you with the right care. How can I help you today?",
      options: ["Schedule Appointment", "Ask Health Question", "Prescription Refill", "Insurance Question", "Emergency Info"]
    },
    "Schedule Appointment": {
      message: "I'd be happy to help you schedule an appointment. What type of visit do you need?",
      options: ["General Check-up", "Specialist Visit", "Follow-up", "Urgent Care", "Telehealth"]
    },
    "General Check-up": {
      message: "Perfect! I can help you schedule a general check-up. Here's what I need:\n\n✓ Preferred date and time\n✓ Reason for visit\n✓ Insurance information\n✓ Any specific concerns\n\nShall I check availability for this week?",
      options: ["Check This Week", "Next Week", "Specific Date", "Call Me Instead"]
    },
    "Ask Health Question": {
      message: "I can provide general health information and guidance. Please note: This is not a substitute for professional medical advice. What would you like to know about?",
      options: ["Symptoms", "Medication", "Preventive Care", "Nutrition", "Exercise"]
    },
    "Prescription Refill": {
      message: "I can help you request prescription refills. I'll need to verify your information and check with your doctor. Which medication needs to be refilled?",
      options: ["Maintenance Medication", "Pain Medication", "Allergy Medication", "Other", "Multiple Prescriptions"]
    },
    "Check This Week": {
      message: "Great! I found several available slots this week. Our system would normally show you real-time availability and let you book directly. Would you like me to reserve a slot?",
      function: () => {
        trackDemoEvent('demo_appointment_scheduled', { demo_type: 'healthcare', value: 5 })
        return "This would normally connect to our scheduling system. Demo completed! 🎉"
      }
    }
  }

  const getChatFlow = () => {
    return demoType === 'legal' ? legalFlow : healthcareFlow
  }

  const getChatSettings = () => {
    const baseSettings = {
      general: {
        primaryColor: demoType === 'legal' ? "#1E40AF" : "#059669",
        secondaryColor: demoType === 'legal' ? "#3B82F6" : "#10B981",
        embedded: true,
        showHeader: true,
        showFooter: true
      },
      header: {
        title: demoType === 'legal' ? "Legal AI Assistant" : "Healthcare AI Assistant",
        showAvatar: true,
        buttons: []
      },
      footer: {
        text: `${demoType === 'legal' ? 'Legal' : 'Healthcare'} AI Demo - Not for actual legal/medical advice`
      },
      chatHistory: {
        storageKey: `demo_${demoType}_chat`,
        maxEntries: 30
      },
      botBubble: {
        simStream: true,
        streamSpeed: 40
      }
    }
    return baseSettings
  }

  const getChatStyles = () => {
    return {
      chatContainerStyle: {
        width: "100%",
        height: "500px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
      },
      headerStyle: {
        background: demoType === 'legal' 
          ? "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)"
          : "linear-gradient(135deg, #059669 0%, #10B981 100%)",
        color: "white",
        borderRadius: "12px 12px 0 0"
      },
      chatWindowStyle: {
        backgroundColor: "#f9fafb"
      },
      botBubbleStyle: {
        backgroundColor: "#ffffff",
        color: "#1f2937",
        border: "1px solid #e5e7eb"
      },
      userBubbleStyle: {
        backgroundColor: demoType === 'legal' ? "#3B82F6" : "#10B981",
        color: "white"
      }
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Demo Container */}
      <motion.div 
        className="relative rounded-xl shadow-2xl overflow-hidden bg-white border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        data-demo-id={demoId}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue/5 to-brand-green/5 z-10">
            <div className="text-center space-y-4">
              <Loader className="h-8 w-8 animate-spin text-brand-blue mx-auto" />
              <p className="text-gray-600 font-medium">Loading Interactive Demo...</p>
            </div>
          </div>
        )}

        {/* Demo Selection */}
        {!isLoading && !showChat && (
          <div className="min-h-[500px] p-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MessageCircle className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Try Our AI Assistant</h3>
                <p className="text-gray-600 max-w-md mx-auto">Experience how our AI chatbots work in real-world scenarios. Choose your industry to see a customized demo.</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Legal Demo */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleDemoStart('legal')}
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-brand-blue bg-white hover:bg-brand-blue/5 transition-all duration-200 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                    <Building className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Legal Practice Demo</h4>
                    <p className="text-sm text-gray-600 mb-3">See how our AI handles client intake, case management, and consultation scheduling for law firms.</p>
                    <div className="flex items-center text-brand-blue font-medium">
                      <Play className="h-4 w-4 mr-2" />
                      Try Legal Demo
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Healthcare Demo */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => handleDemoStart('healthcare')}
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-brand-green bg-white hover:bg-brand-green/5 transition-all duration-200 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                    <Stethoscope className="h-6 w-6 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Demo</h4>
                    <p className="text-sm text-gray-600 mb-3">Experience HIPAA-compliant patient interactions, appointment scheduling, and health information management.</p>
                    <div className="flex items-center text-brand-green font-medium">
                      <Play className="h-4 w-4 mr-2" />
                      Try Healthcare Demo
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-md mx-auto"
            >
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800 font-medium mb-1">Fully Interactive Demo</p>
              <p className="text-xs text-blue-600">This is a working chatbot. Try different conversation paths and see how our AI responds!</p>
            </motion.div>
          </div>
        )}

        {/* ChatBot Demo */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Suspense fallback={
              <div className="h-[500px] flex items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-brand-blue" />
              </div>
            }>
              <ChatBot
                flow={getChatFlow()}
                settings={getChatSettings()}
                styles={getChatStyles()}
              />
            </Suspense>
            
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setShowChat(false)
                setDemoType(null)
                trackDemoEvent('demo_reset')
              }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 px-3 py-1 rounded-full border border-gray-200 text-sm font-medium transition-all duration-200 hover:shadow-md"
            >
              ← Back to Demo Selection
            </motion.button>
          </motion.div>
        )}

        {/* Live Demo Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-800">Live Demo</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}