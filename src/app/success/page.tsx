'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(10)
  const error = searchParams.get('error')

  const botpenguinUrl = process.env.NEXT_PUBLIC_BOTPENGUIN_PARTNER_REDIRECT_URL || 'https://app.botpenguin.com'

  useEffect(() => {
    if (!error && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!error && countdown === 0) {
      // Redirect to BotPenguin after countdown
      window.location.href = botpenguinUrl
    }
  }, [countdown, error, botpenguinUrl])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            {error ? (
              <>
                {/* Error State */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
                </motion.div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Payment Successful!
                </h1>
                
                <p className="text-gray-600 mb-6">
                  Your payment was processed successfully, but there was an issue with the automatic redirect. 
                  Please click the button below to access your BotPenguin account.
                </p>
                
                <Button
                  asChild
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-black font-semibold py-3"
                >
                  <a href={botpenguinUrl} target="_blank" rel="noopener noreferrer">
                    Access Your Account
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </>
            ) : (
              <>
                {/* Success State */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </motion.div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Welcome to the King Plan!
                </h1>
                
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase! You're about to be redirected to BotPenguin 
                  to set up your AI chatbot account.
                </p>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">
                    Redirecting in {countdown} seconds...
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-brand-green h-2 rounded-full"
                      initial={{ width: '100%' }}
                      animate={{ width: `${(countdown / 10) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <Button
                  asChild
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-black font-semibold py-3 mb-4"
                >
                  <a href={botpenguinUrl} target="_blank" rel="noopener noreferrer">
                    Continue to BotPenguin
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link href="/">
                    Return to Homepage
                  </Link>
                </Button>
              </>
            )}
            
            {/* Support Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@aichatbotsolutions.io" className="text-brand-blue hover:underline">
                  support@aichatbotsolutions.io
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}