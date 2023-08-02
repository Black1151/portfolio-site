'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, FC } from 'react'

interface FadeInLettersProps {
  children: string
  direction: 'up' | 'down'
  className?: string
}

// Create an array of random delays
const createRandomDelays = (length: number): number[] => {
  const delays = Array.from({ length }, (_, i) => i * 0.1)
  return delays.sort(() => Math.random() - 0.5)
}

const FadeInLetters: FC<FadeInLettersProps> = ({
  children,
  direction,
  className,
}) => {
  const letters = [...children]

  const initialY = direction === 'up' ? 150 : -150
  const randomDelays = createRandomDelays(children.length)

  return (
    <div className="flex flex-row">
      {letters.map((letter, index) => (
        <motion.div
          key={index}
          className={`${className}`}
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: randomDelays[index],
            type: 'tween',
            duration: 0.2,
          }}
        >
          {letter}
        </motion.div>
      ))}
    </div>
  )
}

export default FadeInLetters
