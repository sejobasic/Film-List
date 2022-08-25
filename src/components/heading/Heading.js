import React from 'react'

// Styling
import './Heading.css'

function Heading() {
  
  return (
    <div className='logo-container'>
      <h2>filmlist.</h2>
      <div className='line'></div>
      <p>
        All of your <span className='important'>favorite films</span> in one place.
      </p>
    </div>
  )
}

export default Heading