'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { motion } from 'framer-motion'
import { Play, Loader } from 'lucide-react'

interface DemoEmbedProps {
  demoId?: string
  className?: string
}

export default function DemoEmbed({ 
  demoId = "YOUR_NAVATTIC_DEMO_ID", 
  className = "" 
}: DemoEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Track demo events to Google Analytics
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for Navattic demo events
      if (event.data?.navatticEvent || event.data?.type === 'demo_interaction') {
        const eventType = event.data.navatticEvent?.type || event.data.type
        
        // Track to Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', eventType, {
            demo_id: demoId,
            demo_platform: 'navattic',
            event_category: 'interactive_demo',
            custom_parameter: event.data?.custom || 'demo_interaction'
          })
        }

        // Track specific demo milestones
        if (eventType === 'demo_started') {
          (window as any).gtag?.('event', 'demo_started', {
            demo_id: demoId,
            value: 1
          })
        }
        
        if (eventType === 'demo_completed') {
          (window as any).gtag?.('event', 'demo_completed', {
            demo_id: demoId,
            value: 10
          })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [demoId])

  const handleIframeLoad = () => {
    setIsLoading(false)
    
    // Track demo load success
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'demo_loaded', {
        demo_id: demoId,
        event_category: 'interactive_demo'
      })
    }
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
    
    // Track demo load error
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'demo_load_error', {
        demo_id: demoId,
        event_category: 'interactive_demo'
      })
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Demo Container */}
      <motion.div 
        className="relative aspect-[16/9] rounded-xl shadow-2xl overflow-hidden bg-white border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
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

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center space-y-4 p-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Play className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Temporarily Unavailable</h3>
                <p className="text-gray-600 mb-4">Please try refreshing the page or contact us to schedule a live demo.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-brand-blue/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo Iframe */}
        <iframe
          src={`https://demo.navattic.com/embed/${demoId}`}
          width="100%"
          height="100%"
          title="Interactive AI Chatbot Demo"
          frameBorder="0"
          allow="autoplay; fullscreen; microphone; camera"
          allowFullScreen
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className="w-full h-full"
        />

        {/* Demo Overlay Badge */}
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

      {/* Analytics Script for Enhanced Tracking */}
      <Script id="demo-analytics" strategy="afterInteractive">
        {`
          // Enhanced demo tracking
          window.addEventListener('message', function(event) {
            if (event.data && typeof event.data === 'object') {
              // Track various demo interactions
              const eventData = event.data;
              
              // Navattic events
              if (eventData.navatticEvent) {
                console.log('Demo Event:', eventData.navatticEvent.type);
                
                // Track to dataLayer for GTM if available
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'demo_interaction',
                    demo_event_type: eventData.navatticEvent.type,
                    demo_id: '${demoId}',
                    timestamp: new Date().toISOString()
                  });
                }
              }
              
              // Generic demo events
              if (eventData.type && eventData.type.includes('demo')) {
                if (window.gtag) {
                  window.gtag('event', eventData.type, {
                    event_category: 'interactive_demo',
                    demo_id: '${demoId}'
                  });
                }
              }
            }
          });
          
          // Track demo viewport visibility
          const demoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && window.gtag) {
                window.gtag('event', 'demo_in_view', {
                  event_category: 'interactive_demo',
                  demo_id: '${demoId}'
                });
              }
            });
          }, { threshold: 0.5 });
          
          // Observe the demo container when it's available
          setTimeout(() => {
            const demoElement = document.querySelector('[data-demo-id="${demoId}"]');
            if (demoElement) {
              demoObserver.observe(demoElement);
            }
          }, 1000);
        `}
      </Script>
    </div>
  )
}