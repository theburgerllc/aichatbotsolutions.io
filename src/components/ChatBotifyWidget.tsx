'use client'

import { lazy, Suspense } from 'react'

// Dynamic import to prevent SSR issues with ChatBot
const ChatBot = lazy(() => import('react-chatbotify'))

const ChatBotifyWidget = () => {

  // V2 Flow Configuration - handling conversation flow with user input
  const flow = {
    start: {
      message: "Hi! I'm here to help you learn about our AI chatbot solutions for legal and healthcare practices. Did you get a chance to try our interactive demo?",
      options: ["Yes, I tried the demo", "No, show me the demo", "Legal Solutions", "Healthcare Solutions", "Pricing Info", "Schedule Demo"],
      path: (params: any) => {
        // Handle user text input
        const userInput = params.userInput?.toLowerCase() || '';
        
        // Keyword detection for common queries
        if (userInput.includes('demo') || userInput.includes('try')) {
          return "No, show me the demo";
        }
        if (userInput.includes('legal') || userInput.includes('law') || userInput.includes('attorney')) {
          return "Legal Solutions";
        }
        if (userInput.includes('healthcare') || userInput.includes('medical') || userInput.includes('patient')) {
          return "Healthcare Solutions";
        }
        if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('pricing')) {
          return "Pricing Info";
        }
        if (userInput.includes('schedule') || userInput.includes('demo') || userInput.includes('meeting')) {
          return "Schedule Demo";
        }
        if (userInput.includes('help') || userInput.includes('support') || userInput.includes('assist')) {
          return "general_help";
        }
        if (userInput.includes('feature') || userInput.includes('capability') || userInput.includes('function')) {
          return "See Features";
        }
        
        // If no keywords match, provide general help
        return "general_help";
      }
    },
    
    general_help: {
      message: "I understand you're looking for information! I can help you with:\n\n✓ Interactive demo walkthrough\n✓ Legal chatbot solutions\n✓ Healthcare chatbot solutions\n✓ Pricing information\n✓ Scheduling consultations\n\nWhat interests you most?",
      options: ["Show me the demo", "Legal Solutions", "Healthcare Solutions", "Pricing Info", "Schedule Demo"],
      path: (params: any) => {
        const userInput = params.userInput?.toLowerCase() || '';
        
        if (userInput.includes('demo')) return "No, show me the demo";
        if (userInput.includes('legal') || userInput.includes('law')) return "Legal Solutions";
        if (userInput.includes('healthcare') || userInput.includes('medical')) return "Healthcare Solutions";
        if (userInput.includes('price') || userInput.includes('cost')) return "Pricing Info";
        if (userInput.includes('schedule') || userInput.includes('meeting')) return "Schedule Demo";
        
        return "start"; // Return to start for any other input
      }
    },
    "Yes, I tried the demo": {
      message: "Excellent! What did you think of the demo? I'd love to help you understand how we can customize this for your specific practice.",
      options: ["I want to learn more", "Schedule a consultation", "Pricing Info", "See Features", "Different Industry"],
      path: (params: any) => {
        const userInput = params.userInput?.toLowerCase() || '';
        
        if (userInput.includes('learn') || userInput.includes('more') || userInput.includes('tell')) {
          return "I want to learn more";
        }
        if (userInput.includes('schedule') || userInput.includes('consultation') || userInput.includes('meeting')) {
          return "Schedule Demo";
        }
        if (userInput.includes('price') || userInput.includes('cost')) {
          return "Pricing Info";
        }
        if (userInput.includes('feature') || userInput.includes('capability')) {
          return "See Features";
        }
        if (userInput.includes('different') || userInput.includes('other') || userInput.includes('industry')) {
          return "general_help";
        }
        
        return "I want to learn more"; // Default response
      }
    },
    "No, show me the demo": {
      message: "Perfect! Let me direct you to our interactive demo where you can see exactly how our AI chatbots work. It's a quick 5-minute walkthrough.",
      function: () => {
        // Track demo referral from chatbot
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'demo_referral_from_chatbot', {
            event_category: 'interactive_demo',
            event_label: 'chatbot_referral',
            value: 1
          });
        }
        
        // Scroll to demo section
        const demoElement = document.getElementById('interactive-demo');
        if (demoElement) {
          demoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        return "I've scrolled you to our interactive demo above! Try it out and then come back here with any questions."
      },
      options: ["Back to Start", "Schedule Demo", "Pricing Info"]
    },
    "I want to learn more": {
      message: "Great! Since you've seen the demo, you know how powerful our platform is. Which aspect interests you most - the automation capabilities, the industry-specific features, or the implementation process?",
      options: ["Automation Features", "Industry Customization", "Implementation", "ROI & Benefits", "Schedule Demo"],
      path: (params: any) => {
        const userInput = params.userInput?.toLowerCase() || '';
        
        if (userInput.includes('automation') || userInput.includes('automatic') || userInput.includes('ai')) {
          return "Automation Features";
        }
        if (userInput.includes('industry') || userInput.includes('custom') || userInput.includes('specific')) {
          return "Industry Customization";
        }
        if (userInput.includes('implement') || userInput.includes('setup') || userInput.includes('install')) {
          return "Implementation";
        }
        if (userInput.includes('roi') || userInput.includes('benefit') || userInput.includes('return') || userInput.includes('save')) {
          return "ROI & Benefits";
        }
        if (userInput.includes('schedule') || userInput.includes('demo') || userInput.includes('meeting')) {
          return "Schedule Demo";
        }
        
        return "Automation Features"; // Default to most popular topic
      }
    },
    "Automation Features": {
      message: "Our AI handles everything automatically:\n\n✓ Client intake & qualification\n✓ Appointment scheduling & reminders\n✓ Document collection\n✓ Follow-up sequences\n✓ Billing integration\n\nTypically reduces administrative work by 60-80%. Want to see how this applies to your practice?",
      options: ["Schedule Demo", "ROI Calculator", "Pricing Info", "Industry Customization"]
    },
    "Industry Customization": {
      message: "We've built specialized workflows for different practices:\n\n🏛️ Legal: Case intake, consultation scheduling, client communication\n🏥 Healthcare: Patient intake, appointment reminders, HIPAA-compliant messaging\n\nEach comes with industry-specific templates and compliance features. Which is your focus?",
      options: ["Legal Practice", "Healthcare Practice", "Other Industry", "Schedule Demo"]
    },
    "Legal Practice": {
      message: "Perfect! Our legal chatbot handles:\n\n✓ Initial client screening\n✓ Case type identification  \n✓ Consultation scheduling\n✓ Document requests\n✓ Retainer collection\n✓ Client portal access\n\nMost firms see 40% fewer no-shows and 3x faster intake. Ready to discuss implementation?",
      options: ["Schedule Demo", "Pricing Info", "Case Studies", "Implementation Timeline"]
    },
    "Healthcare Practice": {
      message: "Excellent! Our healthcare solution provides:\n\n✓ HIPAA-compliant patient communication\n✓ Appointment scheduling & reminders\n✓ Insurance verification\n✓ Symptom pre-screening\n✓ Prescription reminders\n✓ EMR integration\n\nTypically reduces no-shows by 40% and admin time by 60%. Shall we explore your specific needs?",
      options: ["Schedule Demo", "HIPAA Compliance", "EMR Integration", "Pricing Info"]
    },
    "Legal Solutions": {
      message: "Our Legal Chatbot Suite helps law firms automate client intake, appointment scheduling, and case management. Setup: $1,500 + $200/month. Would you like to learn more?",
      options: ["Schedule Demo", "See Features", "Pricing Page", "Back to Start"]
    },
    "Healthcare Solutions": {
      message: "Our Healthcare Chatbot Suite provides HIPAA-compliant patient communication, appointment reminders, and symptom triage. Setup: $1,800 + $250/month. Interested?",
      options: ["Schedule Demo", "See Features", "Pricing Page", "Back to Start"] 
    },
    "Pricing Info": {
      message: "Here's our pricing:\n\n• Legal Suite: $1,500 setup + $200/month\n• Healthcare Suite: $1,800 setup + $250/month\n\nBoth include full setup, training, and support.",
      options: ["Schedule Demo", "Legal Features", "Healthcare Features", "Back to Start"]
    },
    "Schedule Demo": {
      message: "Excellent! I'll take you to our contact form to schedule a free consultation. Our team will customize a demo for your specific needs.",
      function: () => {
        window.open('/contact', '_blank')
        return "Contact form opened! Feel free to ask any other questions here."
      }
    },
    "See Features": {
      message: "Our solutions include:\n\n✓ Custom industry workflows\n✓ Multi-platform deployment\n✓ Practice management integrations\n✓ Analytics & reporting\n✓ 24/7 support\n✓ HIPAA compliance (Healthcare)\n\nReady to see it in action?",
      options: ["Schedule Demo", "Pricing Info", "Visit Website", "Back to Start"]
    },
    "Legal Features": {
      message: "Legal Suite Features:\n\n✓ Client intake automation\n✓ Appointment scheduling\n✓ Case management workflows\n✓ Document collection\n✓ Billing integration\n✓ Client portal access\n\nWould you like to see a demo?",
      options: ["Schedule Demo", "Pricing Info", "Healthcare Features", "Back to Start"]
    },
    "Healthcare Features": {
      message: "Healthcare Suite Features:\n\n✓ HIPAA-compliant messaging\n✓ Patient intake forms\n✓ Appointment reminders\n✓ Symptom triage\n✓ Insurance verification\n✓ EMR integration\n\nReady to transform your practice?",
      options: ["Schedule Demo", "Pricing Info", "Legal Features", "Back to Start"]
    },
    "Pricing Page": {
      message: "I'll take you to our detailed pricing page where you can see all features and schedule a demo.",
      function: () => {
        window.location.href = '/pricing'
        return "Redirecting to pricing page..."
      }
    },
    "Visit Website": {
      message: "I'll open our main website where you can explore all our solutions in detail.",
      function: () => {
        window.location.href = '/'
        return "Redirecting to homepage..."
      }
    },
    "Back to Start": {
      message: "What else can I help you with today?",
      options: ["Legal Solutions", "Healthcare Solutions", "Pricing Info", "Schedule Demo"],
      path: (params: any) => {
        const userInput = params.userInput?.toLowerCase() || '';
        
        if (userInput.includes('legal') || userInput.includes('law') || userInput.includes('attorney')) {
          return "Legal Solutions";
        }
        if (userInput.includes('healthcare') || userInput.includes('medical') || userInput.includes('patient')) {
          return "Healthcare Solutions";
        }
        if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('pricing')) {
          return "Pricing Info";
        }
        if (userInput.includes('schedule') || userInput.includes('demo') || userInput.includes('meeting')) {
          return "Schedule Demo";
        }
        if (userInput.includes('bye') || userInput.includes('goodbye') || userInput.includes('thanks') || userInput.includes('thank you')) {
          return "goodbye";
        }
        
        return "general_help"; // Route to general help for any other input
      }
    },
    
    goodbye: {
      message: "Thank you for your interest in our AI chatbot solutions! Feel free to return anytime with questions. Have a great day! 👋",
      options: ["Start Over", "Schedule Demo", "Visit Website"],
      path: (params: any) => {
        const userInput = params.userInput?.toLowerCase() || '';
        
        if (userInput.includes('start') || userInput.includes('begin') || userInput.includes('again')) {
          return "start";
        }
        if (userInput.includes('schedule') || userInput.includes('demo')) {
          return "Schedule Demo";
        }
        if (userInput.includes('website') || userInput.includes('site')) {
          return "Visit Website";
        }
        
        return "start"; // Default back to start
      }
    }
  }

  // V2 Settings Configuration
  const settings = {
    general: {
      primaryColor: "#1E64E0",
      secondaryColor: "#6FF35F", 
      fontFamily: "Inter, sans-serif",
      showHeader: true,
      showFooter: true,
      showInputRow: true
    },
    chatInput: {
      disabled: false,
      placeholder: "Type your message here...",
      showCharacterCount: false,
      characterLimit: 500,
      allowNewline: false,
      autoFocus: false
    },
    chatHistory: {
      storageKey: "ai_chatbot_solutions_chat",
      maxEntries: 50,
      disabled: false
    },
    botBubble: {
      simStream: true,
      streamSpeed: 30,
      showAvatar: true
    },
    userBubble: {
      showAvatar: false,
      animate: true,
      showTimestamp: false
    },
    header: {
      title: "AI Chatbot Solutions",
      showAvatar: true,
      avatar: "/images/nav_bar_logo.png"
    },
    footer: {
      text: "Powered by AI Chatbot Solutions"
    },
    tooltip: {
      mode: "CLOSE",
      text: "Chat with our AI assistant! 💬"
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
      rcbToggleChatWindow: true
    }
  }

  // V2 Styles Configuration
  const styles = {
    chatContainerStyle: {
      width: "350px",
      height: "500px",
      fontSize: "14px"
    },
    headerStyle: {
      background: "linear-gradient(135deg, #1E64E0 0%, #6FF35F 100%)",
      color: "#FFFFFF"
    },
    chatWindowStyle: {
      backgroundColor: "#FFFFFF"
    },
    userBubbleStyle: {
      backgroundColor: "#1E64E0",
      color: "#FFFFFF"
    },
    botBubbleStyle: {
      backgroundColor: "#F3F4F6",
      color: "#1F2937"
    },
    footerStyle: {
      background: "#F9FAFB",
      borderTop: "1px solid #E5E7EB"
    }
  }

  return (
    <Suspense fallback={
      <div className="fixed bottom-6 right-6 w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center shadow-lg">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ChatBot
        flow={flow}
        settings={settings}
        styles={styles}
      />
    </Suspense>
  )
}

export default ChatBotifyWidget