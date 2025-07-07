'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Cookie } from 'lucide-react'

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    
    // Initialize Google Analytics if consent is given
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  const handleClose = () => {
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start space-x-4 pr-8">
                <Cookie className="h-6 w-6 text-brand-green mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">We use cookies to enhance your experience</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    We use cookies to analyze website traffic, improve your browsing experience, and provide 
                    personalized content. We also use cookies for our chatbot functionality and to track 
                    conversions from our marketing efforts. By accepting, you consent to our use of cookies.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleAccept}
                      className="bg-brand-green hover:bg-brand-green/90 text-black font-semibold"
                    >
                      Accept All Cookies
                    </Button>
                    <Button
                      onClick={handleDecline}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                      asChild
                    >
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                        Learn More
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Add global type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}