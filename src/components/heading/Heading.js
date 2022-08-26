import React from 'react'
import { motion } from 'framer-motion/dist/framer-motion'

// Styling
import './Heading.css'

function Heading() {

  const headingVariant = {
    hidden: {
      x: 1000
    },
    visible: {
      x: 0,
    },
  }

  const logoVariant = {
    hidden: {
      x: -1000
    },
    visible: {
      x: 0,
    },
  }

  const lineVariant = {
    hidden: {
      y: -1000
    },
    visible: {
      y: 0,
    },
  }
  
  return (
    <div className='logo-container'>
      <motion.h2
        variants={logoVariant}
        initial='hidden'
        animate='visible'
      >filmlist.</motion.h2>
      <motion.div 
      className='line'
      variants={lineVariant}
      initial='hidden'
      animate='visible'
      ></motion.div>
      <motion.p
        variants={headingVariant}
        initial='hidden'
        animate='visible'
      >
        All of your <span className='important'>favorite films</span> in one place.
      </motion.p>
    </div>
  )
}

export default Heading