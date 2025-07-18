'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Play, Loader, MessageCircle, Users, Building, Stethoscope, ShoppingCart } from 'lucide-react'

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
  const [demoType, setDemoType] = useState<'legal' | 'healthcare' | 'ecommerce' | null>(null)
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

  const handleDemoStart = (type: 'legal' | 'healthcare' | 'ecommerce') => {
    setDemoType(type)
    setShowChat(true)
    trackDemoEvent('demo_started', { demo_type: type, value: 1 })
  }

  // Legal Demo Flow
  const legalFlow = {
    start: {
      message: "Welcome to our Legal AI Assistant Demo! I'm here to help potential clients with initial consultation and case intake. How can I assist you today?",
      options: ["Personal Injury Case", "Family Law Matter", "Business Legal Issue", "Estate Planning", "Learn About Our Services"],
      path: "Personal Injury Case"
    },
    "Personal Injury Case": {
      message: "I can help you with your personal injury case. Let me gather some initial information. What type of injury occurred?",
      options: ["Car Accident", "Slip & Fall", "Medical Malpractice", "Workplace Injury", "Other"],
      path: "Car Accident"
    },
    "Car Accident": {
      message: "I understand you were in a car accident. Here's what I can help you with:\n\n✓ Document your case details\n✓ Schedule consultation with our attorneys\n✓ Connect you with medical professionals\n✓ Guide you through the claims process\n\nWould you like to schedule a free consultation?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Slip & Fall": {
      message: "Slip and fall cases can be complex. Here's how we can help:\n\n✓ Investigate the incident\n✓ Gather evidence and witness statements\n✓ Determine liability\n✓ Calculate damages\n\nWould you like to schedule a consultation?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Medical Malpractice": {
      message: "Medical malpractice cases require specialized expertise. Our team can help with:\n\n✓ Medical record review\n✓ Expert witness consultation\n✓ Case evaluation\n✓ Litigation support\n\nShall we schedule a consultation?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Workplace Injury": {
      message: "Workplace injuries may involve workers' compensation and personal injury claims. We can help:\n\n✓ File workers' comp claims\n✓ Pursue third-party liability\n✓ Maximize compensation\n✓ Handle appeals\n\nWould you like to discuss your case?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Other": {
      message: "We handle various types of personal injury cases. Each situation is unique, and we'll evaluate your specific circumstances:\n\n✓ Case assessment\n✓ Legal strategy development\n✓ Settlement negotiations\n✓ Trial representation\n\nLet's discuss your case in detail.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Family Law Matter": {
      message: "Our family law team handles various matters. What type of family law issue do you need help with?",
      options: ["Divorce", "Child Custody", "Adoption", "Domestic Violence", "Prenuptial Agreement"],
      path: "Divorce"
    },
    "Divorce": {
      message: "Divorce proceedings can be emotionally and legally complex. We provide comprehensive support:\n\n✓ Uncontested and contested divorces\n✓ Asset division\n✓ Spousal support\n✓ Child custody arrangements\n\nWould you like to schedule a confidential consultation?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Child Custody": {
      message: "Child custody matters require careful attention to your children's best interests. We can help with:\n\n✓ Custody agreements\n✓ Visitation schedules\n✓ Modifications\n✓ Enforcement\n\nLet's discuss your situation.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Adoption": {
      message: "Adoption is a joyful but legally complex process. We guide families through:\n\n✓ Private adoptions\n✓ Agency adoptions\n✓ Stepparent adoptions\n✓ International adoptions\n\nWould you like to learn about the process?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Domestic Violence": {
      message: "We understand the sensitivity of domestic violence cases and provide compassionate legal support:\n\n✓ Protective orders\n✓ Safety planning\n✓ Legal representation\n✓ Confidential consultations\n\nYour safety is our priority.",
      options: ["Schedule Consultation", "Emergency Help", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Prenuptial Agreement": {
      message: "Prenuptial agreements protect both parties' interests. We can help draft agreements covering:\n\n✓ Asset protection\n✓ Debt allocation\n✓ Spousal support\n✓ Business interests\n\nWould you like to discuss your needs?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Business Legal Issue": {
      message: "We provide comprehensive business legal services. What type of business matter brings you here today?",
      options: ["Contract Review", "Business Formation", "Employment Law", "Intellectual Property", "Litigation"],
      path: "Contract Review"
    },
    "Contract Review": {
      message: "Contract review is crucial for protecting your business interests. We can help with:\n\n✓ Contract drafting\n✓ Terms negotiation\n✓ Risk assessment\n✓ Dispute resolution\n\nLet's review your contracts.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Business Formation": {
      message: "Choosing the right business structure is important for your success. We assist with:\n\n✓ LLC formation\n✓ Corporation setup\n✓ Partnership agreements\n✓ Compliance requirements\n\nLet's discuss your business goals.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Employment Law": {
      message: "Employment law issues can affect your entire business. We help with:\n\n✓ Employee handbooks\n✓ Discrimination claims\n✓ Wage and hour compliance\n✓ Workplace policies\n\nWould you like legal guidance?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Intellectual Property": {
      message: "Protecting your intellectual property is essential for business success. We assist with:\n\n✓ Trademark registration\n✓ Copyright protection\n✓ Trade secrets\n✓ IP licensing\n\nLet's protect your innovations.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Litigation": {
      message: "Business litigation requires experienced representation. We handle:\n\n✓ Commercial disputes\n✓ Contract breaches\n✓ Partnership disputes\n✓ Employment litigation\n\nWould you like to discuss your case?",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Estate Planning": {
      message: "Estate planning ensures your legacy is protected. We provide comprehensive services:\n\n✓ Will preparation\n✓ Trust creation\n✓ Power of attorney\n✓ Probate assistance\n\nLet's secure your family's future.",
      options: ["Schedule Consultation", "Learn About Process", "Ask Another Question"],
      path: "Schedule Consultation"
    },
    "Learn About Our Services": {
      message: "We're a full-service law firm specializing in personal injury, family law, business law, and estate planning. Our experienced attorneys provide personalized legal solutions.\n\nWhat specific area interests you most?",
      options: ["Personal Injury Case", "Family Law Matter", "Business Legal Issue", "Estate Planning", "Schedule Consultation"],
      path: "Personal Injury Case"
    },
    "Learn About Process": {
      message: "Our legal process is designed to be transparent and client-focused:\n\n✓ Free initial consultation\n✓ Case evaluation and strategy\n✓ Regular communication\n✓ Aggressive representation\n\nReady to get started?",
      options: ["Schedule Consultation", "Ask Another Question", "Start Over"],
      path: "Schedule Consultation"
    },
    "Ask Another Question": {
      message: "I'm here to help with any legal questions you may have. What else would you like to know?",
      options: ["Personal Injury Case", "Family Law Matter", "Business Legal Issue", "Estate Planning", "Schedule Consultation"],
      path: "Personal Injury Case"
    },
    "Emergency Help": {
      message: "If you're in immediate danger, please call 911. For legal assistance with domestic violence matters, we provide confidential consultations and can help you obtain protective orders.\n\nWould you like to schedule a confidential consultation?",
      options: ["Schedule Consultation", "Ask Another Question", "Start Over"],
      path: "Schedule Consultation"
    },
    "Start Over": {
      message: "Of course! Let's start fresh. What legal matter can I help you with today?",
      options: ["Personal Injury Case", "Family Law Matter", "Business Legal Issue", "Estate Planning", "Learn About Our Services"],
      path: "Personal Injury Case"
    },
    "Schedule Consultation": {
      message: "Excellent! I'll connect you with our scheduling system. A consultation typically takes 30-45 minutes and is completely free. Our attorney will review your case and provide initial guidance.",
      function: () => {
        trackDemoEvent('demo_consultation_scheduled', { demo_type: 'legal', value: 5 })
        return "This would normally redirect to our scheduling system. Demo completed! 🎉"
      },
      path: "demo_complete"
    },
    "demo_complete": {
      message: "Thank you for trying our Legal AI Assistant demo! In a real implementation, you would now be connected to our scheduling system.\n\nWould you like to try another scenario?",
      options: ["Start Over", "Try Healthcare Demo", "Contact Us"],
      path: "Start Over"
    }
  }

  // Healthcare Demo Flow
  const healthcareFlow = {
    start: {
      message: "Hello! I'm your virtual healthcare assistant. I can help with appointment scheduling, basic health questions, and connecting you with the right care. How can I help you today?",
      options: ["Schedule Appointment", "Ask Health Question", "Prescription Refill", "Insurance Question", "Emergency Info"],
      path: "Schedule Appointment"
    },
    "Schedule Appointment": {
      message: "I'd be happy to help you schedule an appointment. What type of visit do you need?",
      options: ["General Check-up", "Specialist Visit", "Follow-up", "Urgent Care", "Telehealth"],
      path: "General Check-up"
    },
    "General Check-up": {
      message: "Perfect! I can help you schedule a general check-up. Here's what I need:\n\n✓ Preferred date and time\n✓ Reason for visit\n✓ Insurance information\n✓ Any specific concerns\n\nShall I check availability for this week?",
      options: ["Check This Week", "Next Week", "Specific Date", "Call Me Instead"],
      path: "Check This Week"
    },
    "Specialist Visit": {
      message: "I can help you schedule a specialist appointment. What type of specialist do you need to see?",
      options: ["Cardiologist", "Dermatologist", "Orthopedist", "Neurologist", "Other Specialist"],
      path: "Cardiologist"
    },
    "Cardiologist": {
      message: "I'll help you schedule with our cardiology department. Do you have a referral from your primary care physician?",
      options: ["Yes, I have a referral", "No, I need a referral", "I'm not sure"],
      path: "Yes, I have a referral"
    },
    "Yes, I have a referral": {
      message: "Great! With your referral, I can schedule you directly. What's your preferred timeframe?",
      options: ["This Week", "Next Week", "Within 2 Weeks", "I'm Flexible"],
      path: "This Week"
    },
    "No, I need a referral": {
      message: "No problem! I can help you schedule with your primary care physician first to get a referral, then schedule your specialist appointment.",
      options: ["Schedule Primary Care", "Call Me Instead", "Ask Another Question"],
      path: "Schedule Primary Care"
    },
    "I'm not sure": {
      message: "Let me check your insurance requirements. I'll verify if you need a referral for cardiology and help you with the next steps.",
      options: ["Check Insurance", "Schedule Primary Care", "Ask Another Question"],
      path: "Check Insurance"
    },
    "Dermatologist": {
      message: "I can help schedule your dermatology appointment. What's the reason for your visit?",
      options: ["Skin Concern", "Routine Check", "Follow-up", "Cosmetic Consultation"],
      path: "Skin Concern"
    },
    "Skin Concern": {
      message: "I understand you have a skin concern. For urgent skin issues, we can often accommodate same-day appointments. What's your preference?",
      options: ["Same Day", "This Week", "Next Week", "I'm Flexible"],
      path: "Same Day"
    },
    "Follow-up": {
      message: "I'll schedule your follow-up appointment. What's your preferred timeframe?",
      options: ["This Week", "Next Week", "Within 2 Weeks", "Call Me Instead"],
      path: "This Week"
    },
    "Urgent Care": {
      message: "Our urgent care is available for non-emergency medical needs. What type of issue do you need to address?",
      options: ["Minor Injury", "Illness Symptoms", "Routine Care", "I'm Not Sure"],
      path: "Minor Injury"
    },
    "Minor Injury": {
      message: "I can help you get care for your minor injury. Urgent care is typically faster than the ER for non-life-threatening issues.",
      options: ["Book Urgent Care", "Speak to Nurse", "Ask Another Question"],
      path: "Book Urgent Care"
    },
    "Illness Symptoms": {
      message: "I can help you determine the right level of care for your symptoms. Would you like to speak with a nurse first?",
      options: ["Speak to Nurse", "Book Urgent Care", "Ask Another Question"],
      path: "Speak to Nurse"
    },
    "Telehealth": {
      message: "Telehealth appointments are convenient for many healthcare needs. What type of telehealth visit do you need?",
      options: ["Follow-up Visit", "New Consultation", "Prescription Review", "Mental Health"],
      path: "Follow-up Visit"
    },
    "Follow-up Visit": {
      message: "I can schedule your telehealth follow-up visit. These appointments are typically 15-30 minutes.",
      options: ["Schedule Today", "Schedule This Week", "Call Me Instead"],
      path: "Schedule Today"
    },
    "Ask Health Question": {
      message: "I can provide general health information and guidance. Please note: This is not a substitute for professional medical advice. What would you like to know about?",
      options: ["Symptoms", "Medication", "Preventive Care", "Nutrition", "Exercise"],
      path: "Symptoms"
    },
    "Symptoms": {
      message: "I can help you understand common symptoms, but for specific medical concerns, please consult with a healthcare provider. What type of symptoms are you experiencing?",
      options: ["Cold/Flu", "Digestive Issues", "Pain/Discomfort", "Skin Issues", "Speak to Nurse"],
      path: "Cold/Flu"
    },
    "Cold/Flu": {
      message: "Cold and flu symptoms can be similar. Common signs include fever, cough, congestion, and body aches. If symptoms worsen or persist, please seek medical care.",
      options: ["Schedule Appointment", "Speak to Nurse", "Ask Another Question"],
      path: "Schedule Appointment"
    },
    "Medication": {
      message: "I can provide general information about medications, but please consult your pharmacist or doctor for specific advice. What do you need help with?",
      options: ["Prescription Refill", "Side Effects", "Drug Interactions", "Dosage Questions"],
      path: "Prescription Refill"
    },
    "Preventive Care": {
      message: "Preventive care is important for maintaining good health. What type of preventive care are you interested in?",
      options: ["Annual Physical", "Screenings", "Vaccinations", "Health Assessments"],
      path: "Annual Physical"
    },
    "Annual Physical": {
      message: "Annual physical exams are important for maintaining your health. I can help you schedule your yearly check-up.",
      options: ["Schedule Physical", "What's Included", "Ask Another Question"],
      path: "Schedule Physical"
    },
    "Prescription Refill": {
      message: "I can help you request prescription refills. I'll need to verify your information and check with your doctor. Which medication needs to be refilled?",
      options: ["Maintenance Medication", "Pain Medication", "Allergy Medication", "Other", "Multiple Prescriptions"],
      path: "Maintenance Medication"
    },
    "Maintenance Medication": {
      message: "I can help you refill your maintenance medications. Please provide your prescription information, and I'll check with your doctor's office.",
      options: ["Submit Refill Request", "Check Refill Status", "Ask Another Question"],
      path: "Submit Refill Request"
    },
    "Insurance Question": {
      message: "I can help you understand your insurance coverage and benefits. What do you need help with?",
      options: ["Coverage Details", "Copay Information", "Find Providers", "Claims Questions"],
      path: "Coverage Details"
    },
    "Coverage Details": {
      message: "I can help you understand what services are covered under your plan. Would you like me to look up your specific benefits?",
      options: ["Check My Benefits", "General Information", "Ask Another Question"],
      path: "Check My Benefits"
    },
    "Emergency Info": {
      message: "For life-threatening emergencies, please call 911 immediately. For urgent medical needs, we offer urgent care services. What type of information do you need?",
      options: ["Emergency Services", "Urgent Care", "After Hours Care", "Contact Information"],
      path: "Emergency Services"
    },
    "Emergency Services": {
      message: "Our emergency department is available 24/7 for serious medical emergencies. For non-life-threatening issues, urgent care may be more appropriate.",
      options: ["Find Emergency Room", "Urgent Care Options", "Ask Another Question"],
      path: "Find Emergency Room"
    },
    "Check This Week": {
      message: "Great! I found several available slots this week. Our system would normally show you real-time availability and let you book directly. Would you like me to reserve a slot?",
      options: ["Yes, Book Appointment", "See More Options", "Call Me Instead"],
      path: "Yes, Book Appointment"
    },
    "Next Week": {
      message: "I have good availability next week. Let me show you some options that work with your schedule.",
      options: ["Monday Morning", "Wednesday Afternoon", "Friday Morning", "See All Options"],
      path: "Monday Morning"
    },
    "Monday Morning": {
      message: "Perfect! I can book you for Monday morning. This appointment includes a comprehensive health assessment.",
      options: ["Confirm Appointment", "Different Time", "Ask Another Question"],
      path: "Confirm Appointment"
    },
    "Confirm Appointment": {
      message: "Excellent! Your appointment is confirmed. You'll receive a confirmation email with all the details.",
      function: () => {
        trackDemoEvent('demo_appointment_scheduled', { demo_type: 'healthcare', value: 5 })
        return "This would normally connect to our scheduling system. Demo completed! 🎉"
      },
      path: "demo_complete"
    },
    "Yes, Book Appointment": {
      message: "Wonderful! I'll book your appointment for this week. You'll receive confirmation details shortly.",
      function: () => {
        trackDemoEvent('demo_appointment_scheduled', { demo_type: 'healthcare', value: 5 })
        return "This would normally connect to our scheduling system. Demo completed! 🎉"
      },
      path: "demo_complete"
    },
    "Call Me Instead": {
      message: "Of course! I understand you'd prefer to speak with someone directly. I'll have our scheduling team call you within the next hour.",
      options: ["Confirm Callback", "Different Time", "Ask Another Question"],
      path: "Confirm Callback"
    },
    "Confirm Callback": {
      message: "Your callback is scheduled. Our team will contact you soon to complete your appointment scheduling.",
      function: () => {
        trackDemoEvent('demo_callback_scheduled', { demo_type: 'healthcare', value: 3 })
        return "This would normally schedule a callback. Demo completed! 🎉"
      },
      path: "demo_complete"
    },
    "Ask Another Question": {
      message: "I'm here to help with any healthcare questions you may have. What else would you like to know?",
      options: ["Schedule Appointment", "Ask Health Question", "Prescription Refill", "Insurance Question", "Emergency Info"],
      path: "Schedule Appointment"
    },
    "Start Over": {
      message: "Of course! Let's start fresh. How can I help you with your healthcare needs today?",
      options: ["Schedule Appointment", "Ask Health Question", "Prescription Refill", "Insurance Question", "Emergency Info"],
      path: "Schedule Appointment"
    },
    "demo_complete": {
      message: "Thank you for trying our Healthcare AI Assistant demo! In a real implementation, you would now be connected to our scheduling system or healthcare team.\n\nWould you like to try another scenario?",
      options: ["Start Over", "Try Legal Demo", "Contact Us"],
      path: "Start Over"
    }
  }

  // E-Commerce Demo Flow
  const ecommerceFlow = {
    start: {
      message: "Hi! I'm your e\u2011commerce assistant. I can help with orders, product questions, returns, and customer support. How can I assist you today?",
      options: ["Track My Order", "Product Questions", "Returns & Refunds", "Technical Support", "Account Help"],
      path: "Track My Order"
    },
    "Track My Order": {
      message: "I'll help you track your order. Please provide your order number or email address used for the purchase.",
      options: ["Enter Order Number", "Use Email Address", "I Don't Have Order Info", "Recent Orders"],
      path: "Enter Order Number"
    },
    "Enter Order Number": {
      message: "Perfect! I found your order #12345. Here are the details:\\n\\n\u2713 Status: Shipped\\n\u2713 Tracking: UPS123456789\\n\u2713 Expected delivery: Tomorrow by 6 PM\\n\u2713 Items: 2x Blue T-Shirts (Size M)\\n\\nWould you like me to send tracking updates to your phone?",
      options: ["Yes, Send Updates", "Track Package", "Contact Carrier", "Ask Another Question"],
      path: "Yes, Send Updates"
    },
    "Use Email Address": {
      message: "I'll look up orders associated with your email. I found 3 recent orders. Which one are you looking for?",
      options: ["Order #12345 (Yesterday)", "Order #12344 (Last Week)", "Order #12343 (2 Weeks Ago)", "Different Order"],
      path: "Order #12345 (Yesterday)"
    },
    "Order #12345 (Yesterday)": {
      message: "Here's your order from yesterday:\\n\\n\u2713 Status: Processing\\n\u2713 Items: Wireless Headphones\\n\u2713 Expected ship date: Today\\n\u2713 Estimated delivery: 2-3 business days\\n\\nWould you like to upgrade to express shipping?",
      options: ["Upgrade Shipping", "Keep Standard", "Cancel Order", "Ask Another Question"],
      path: "Upgrade Shipping"
    },
    "Product Questions": {
      message: "I can help you with product information, availability, and recommendations. What would you like to know?",
      options: ["Product Availability", "Size Guide", "Product Recommendations", "Technical Specs", "Customer Reviews"],
      path: "Product Availability"
    },
    "Product Availability": {
      message: "Which product are you interested in? I can check stock levels and notify you when items are back in stock.",
      options: ["iPhone Cases", "Wireless Chargers", "Bluetooth Speakers", "Smart Watches", "Other Product"],
      path: "iPhone Cases"
    },
    "iPhone Cases": {
      message: "We have great iPhone cases in stock! Here's what's available:\\n\\n\u2713 Clear Case - $29.99 (15 in stock)\\n\u2713 Leather Case - $59.99 (8 in stock)\\n\u2713 MagSafe Case - $49.99 (22 in stock)\\n\u2713 Rugged Case - $39.99 (5 in stock)\\n\\nWhich iPhone model do you have?",
      options: ["iPhone 15", "iPhone 14", "iPhone 13", "Other Model", "Add to Cart"],
      path: "iPhone 15"
    },
    "iPhone 15": {
      message: "Perfect! All our cases are compatible with iPhone 15. The MagSafe case is our most popular choice - it supports wireless charging and has 4.8/5 stars.\\n\\nWould you like to see more details or add one to your cart?",
      options: ["Add MagSafe Case", "See All Options", "Read Reviews", "Compare Cases"],
      path: "Add MagSafe Case"
    },
    "Add MagSafe Case": {
      message: "Great choice! I've added the iPhone 15 MagSafe Case ($49.99) to your cart. Would you like to continue shopping or proceed to checkout?",
      options: ["Proceed to Checkout", "Continue Shopping", "Apply Discount Code", "Ask Another Question"],
      path: "Proceed to Checkout"
    },
    "Returns & Refunds": {
      message: "I can help you with returns and refunds. We offer 30-day returns on most items. What would you like to do?",
      options: ["Start a Return", "Check Return Status", "Refund Policy", "Exchange Item", "Return Shipping"],
      path: "Start a Return"
    },
    "Start a Return": {
      message: "I'll help you start a return. Please provide your order number or email address so I can look up your purchase.",
      options: ["Provide Order Number", "Use Email Lookup", "Item Not as Described", "Wrong Size/Color"],
      path: "Provide Order Number"
    },
    "Provide Order Number": {
      message: "I found your order! Which item would you like to return?\\n\\n1. Blue T-Shirt (Size M) - $24.99\\n2. Wireless Mouse - $39.99\\n3. Phone Stand - $19.99\\n\\nWhat's the reason for the return?",
      options: ["Wrong Size", "Not as Described", "Defective Item", "Changed Mind", "Duplicate Order"],
      path: "Wrong Size"
    },
    "Wrong Size": {
      message: "No problem! I'll generate a prepaid return label for you. You can print it at home or drop it off at any UPS location. Would you like to exchange for a different size or get a refund?",
      options: ["Exchange for Different Size", "Get Full Refund", "Store Credit", "Ask Another Question"],
      path: "Exchange for Different Size"
    },
    "Technical Support": {
      message: "I can help you with technical issues, setup guides, and troubleshooting. What type of support do you need?",
      options: ["Product Setup", "Troubleshooting", "Warranty Claims", "Software Updates", "Compatibility"],
      path: "Product Setup"
    },
    "Product Setup": {
      message: "Which product do you need help setting up? I have step-by-step guides for all our devices.",
      options: ["Wireless Headphones", "Smart Watch", "Bluetooth Speaker", "Phone Accessories", "Other Device"],
      path: "Wireless Headphones"
    },
    "Wireless Headphones": {
      message: "I'll guide you through pairing your wireless headphones:\\n\\n1. Turn on your headphones (hold power for 3 seconds)\\n2. Enable Bluetooth on your device\\n3. Select 'AudioMax Pro' from available devices\\n4. You'll hear 'Connected' when successful\\n\\nAre your headphones showing up in your Bluetooth settings?",
      options: ["Yes, Connected!", "Not Showing Up", "Connection Fails", "Need Different Device"],
      path: "Yes, Connected!"
    },
    "Yes, Connected!": {
      message: "Excellent! Your headphones are now connected. Here are some tips:\\n\\n\u2713 Double-tap right ear for play/pause\\n\u2713 Hold left ear for voice assistant\\n\u2713 Battery lasts up to 8 hours\\n\u2713 Use the app for custom EQ settings\\n\\nEnjoy your music!",
      function: () => {
        trackDemoEvent('demo_setup_completed', { demo_type: 'ecommerce', value: 3 })
        return "This would normally provide additional setup resources. Demo completed! \ud83c\udf89"
      },
      path: "demo_complete"
    },
    "Account Help": {
      message: "I can help you with account-related questions, password resets, and profile updates. What do you need assistance with?",
      options: ["Reset Password", "Update Profile", "Payment Methods", "Order History", "Account Settings"],
      path: "Reset Password"
    },
    "Reset Password": {
      message: "I'll help you reset your password. For security, I'll send a reset link to your registered email address. Please check your email and follow the instructions.",
      options: ["Email Sent", "Different Email", "Not Receiving Email", "Ask Another Question"],
      path: "Email Sent"
    },
    "Email Sent": {
      message: "Perfect! I've sent a password reset link to your email. It should arrive within a few minutes. The link will be valid for 24 hours. After resetting, you'll be able to log in with your new password.",
      function: () => {
        trackDemoEvent('demo_password_reset', { demo_type: 'ecommerce', value: 2 })
        return "This would normally handle the actual password reset process. Demo completed! \ud83c\udf89"
      },
      path: "demo_complete"
    },
    "Proceed to Checkout": {
      message: "Great! I'll take you to checkout. Your cart contains:\\n\\n\u2022 iPhone 15 MagSafe Case - $49.99\\n\u2022 Subtotal: $49.99\\n\u2022 Shipping: FREE (orders over $25)\\n\u2022 Total: $49.99\\n\\nReady to complete your purchase?",
      function: () => {
        trackDemoEvent('demo_checkout_initiated', { demo_type: 'ecommerce', value: 5 })
        return "This would normally redirect to the secure checkout page. Demo completed! \ud83c\udf89"
      },
      path: "demo_complete"
    },
    "Exchange for Different Size": {
      message: "Perfect! What size would you like instead? I'll process the exchange and you'll receive the new item when we get your return.",
      options: ["Size Small", "Size Large", "Size XL", "See Size Chart"],
      path: "Size Large"
    },
    "Size Large": {
      message: "Excellent! I've processed your exchange for Size Large. Here's what happens next:\\n\\n1. Print your return label\\n2. Send back the Size M item\\n3. We'll ship Size L when we receive your return\\n4. No additional charges\\n\\nYou'll get tracking for both shipments!",
      function: () => {
        trackDemoEvent('demo_exchange_processed', { demo_type: 'ecommerce', value: 4 })
        return "This would normally generate return labels and process the exchange. Demo completed! \ud83c\udf89"
      },
      path: "demo_complete"
    },
    "Ask Another Question": {
      message: "I'm here to help! What else can I assist you with today?",
      options: ["Track My Order", "Product Questions", "Returns & Refunds", "Technical Support", "Account Help"],
      path: "Track My Order"
    },
    "Start Over": {
      message: "Of course! Let's start fresh. How can I help you with your shopping experience today?",
      options: ["Track My Order", "Product Questions", "Returns & Refunds", "Technical Support", "Account Help"],
      path: "Track My Order"
    },
    "demo_complete": {
      message: "Thank you for trying our E\u2011Commerce AI Assistant demo! In a real implementation, you would now be connected to our order management system or customer service team.\\n\\nWould you like to try another scenario?",
      options: ["Start Over", "Try Legal Demo", "Try Healthcare Demo"],
      path: "Start Over"
    }
  }

  const getChatFlow = () => {
    return demoType === 'legal' ? legalFlow : demoType === 'ecommerce' ? ecommerceFlow : healthcareFlow
  }

  const getChatSettings = () => {
    const baseSettings = {
      general: {
        primaryColor: demoType === 'legal' ? "#1E40AF" : demoType === 'ecommerce' ? "#EA580C" : "#059669",
        secondaryColor: demoType === 'legal' ? "#3B82F6" : demoType === 'ecommerce' ? "#FB923C" : "#10B981",
        embedded: true,
        showHeader: true,
        showFooter: true,
        showInputRow: true
      },
      header: {
        title: demoType === 'legal' ? "Legal AI Assistant" : demoType === 'ecommerce' ? "E‑Commerce AI Assistant" : "Healthcare AI Assistant",
        showAvatar: true,
        buttons: []
      },
      footer: {
        text: `${demoType === 'legal' ? 'Legal' : demoType === 'ecommerce' ? 'E‑Commerce' : 'Healthcare'} AI Demo - ${demoType === 'ecommerce' ? 'For demonstration purposes only' : 'Not for actual legal/medical advice'}`
      },
      chatHistory: {
        storageKey: `demo_${demoType}_chat`,
        maxEntries: 30,
        disabled: false
      },
      botBubble: {
        simStream: true,
        streamSpeed: 40,
        showAvatar: true
      },
      userBubble: {
        showAvatar: false,
        animate: true,
        showTimestamp: false
      },
      chatInput: {
        disabled: false,
        placeholder: "Type your message or click an option above...",
        showCharacterCount: false,
        characterLimit: 500,
        allowNewline: false,
        autoFocus: false
      },
      tooltip: {
        mode: "CLOSE",
        text: "AI Assistant Demo - Try clicking the options!"
      },
      emoji: {
        disabled: false
      },
      voice: {
        disabled: true
      },
      event: {
        rcbUserSubmitText: true,
        rcbUserUploadFile: false,
        rcbToggleChatWindow: false,
        rcbTextAreaChangeValue: false
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
          : demoType === 'ecommerce'
          ? "linear-gradient(135deg, #EA580C 0%, #FB923C 100%)"
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
        backgroundColor: demoType === 'legal' ? "#3B82F6" : demoType === 'ecommerce' ? "#EA580C" : "#10B981",
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

              {/* E-Commerce Demo */}
              <motion.button
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleDemoStart('ecommerce')}
                className="group p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 bg-white hover:bg-orange-50 transition-all duration-200 text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">E‑Commerce Demo</h4>
                    <p className="text-sm text-gray-600 mb-3">Discover automated customer support, order tracking, and sales optimization for online stores.</p>
                    <div className="flex items-center text-orange-600 font-medium">
                      <Play className="h-4 w-4 mr-2" />
                      Try E‑Commerce Demo
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