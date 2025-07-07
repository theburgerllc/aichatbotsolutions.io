'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up' 
}: FadeInProps) => {
  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 }
  }

  const offset = directionOffset[direction]

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: offset.y,
        x: offset.x
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0
      }}
      transition={{ 
        duration,
        delay: delay / 1000,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export const SlideIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up' 
}: FadeInProps) => {
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 }
  }

  const offset = directionOffset[direction]

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: offset.y,
        x: offset.x,
        scale: 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1
      }}
      transition={{ 
        duration,
        delay: delay / 1000,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}