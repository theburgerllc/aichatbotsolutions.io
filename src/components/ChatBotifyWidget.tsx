'use client'

import ChatBot from 'react-chatbotify'

const ChatBotifyWidget = () => {

  // Simple flow for legal and healthcare inquiries
  const flow = {
    start: {
      message: "Hi! I'm here to help you learn about our AI chatbot solutions for legal and healthcare practices. What can I help you with today?",
      options: ["Legal Solutions", "Healthcare Solutions", "Pricing Info", "Schedule Demo"]
    },
    legal_solutions: {
      message: "Our Legal Chatbot Suite helps law firms automate client intake, appointment scheduling, and case management. Setup: $1,500 + $200/month. Would you like to learn more?",
      options: ["Schedule Demo", "See Features", "Pricing Page", "Back to Start"]
    },
    healthcare_solutions: {
      message: "Our Healthcare Chatbot Suite provides HIPAA-compliant patient communication, appointment reminders, and symptom triage. Setup: $1,800 + $250/month. Interested?",
      options: ["Schedule Demo", "See Features", "Pricing Page", "Back to Start"] 
    },
    pricing_info: {
      message: "Here's our pricing:\n\n• Legal Suite: $1,500 setup + $200/month\n• Healthcare Suite: $1,800 setup + $250/month\n\nBoth include full setup, training, and support.",
      options: ["Schedule Demo", "Legal Features", "Healthcare Features", "Back to Start"]
    },
    schedule_demo: {
      message: "Excellent! I'll take you to our contact form to schedule a free consultation. Our team will customize a demo for your specific needs.",
      function: () => {
        window.open('/contact', '_blank')
        return "Contact form opened! Feel free to ask any other questions here."
      }
    },
    see_features: {
      message: "Our solutions include:\n\n✓ Custom industry workflows\n✓ Multi-platform deployment\n✓ Practice management integrations\n✓ Analytics & reporting\n✓ 24/7 support\n✓ HIPAA compliance (Healthcare)\n\nReady to see it in action?",
      options: ["Schedule Demo", "Pricing Info", "Visit Website", "Back to Start"]
    },
    pricing_page: {
      message: "I'll take you to our detailed pricing page where you can see all features and schedule a demo.",
      function: () => {
        window.location.href = '/pricing'
        return "Redirecting to pricing page..."
      }
    }
  }

  const settings = {
    general: {
      primaryColor: "#1E64E0",
      secondaryColor: "#6FF35F", 
      fontFamily: "Inter, sans-serif",
      showHeader: true,
      showFooter: true,
      showInputRow: true
    },
    chatHistory: {
      storageKey: "ai_chatbot_solutions_chat"
    },
    botBubble: {
      simStream: true,
      streamSpeed: 30
    },
    header: {
      title: "AI Chatbot Solutions",
      showAvatar: true,
      avatar: "/images/nav_bar_logo.png"
    },
    footer: {
      text: "Powered by AI Chatbot Solutions"
    }
  }

  const styles = {
    chatContainerStyle: {
      width: "350px",
      height: "500px"
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
    }
  }

  return (
    <ChatBot
      flow={flow}
      settings={settings}
      styles={styles}
    />
  )
}

export default ChatBotifyWidget