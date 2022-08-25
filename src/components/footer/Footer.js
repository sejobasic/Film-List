import React from 'react'

// Assets
import gitIcon from '../../assets/git.png'
import linkedinIcon from '../../assets/linkedin.png'

// Styling
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
      <p>APPLICATION CREATED BY SEJO BASIC</p>
      <div className='footer-line'></div>
      <div className='link-container'>
        <a href='https://github.com/sejobasic' target='_blank' rel='noreferrer'>
          <img src={gitIcon} alt='social media links' />
        </a>
        <a
          href='https://www.linkedin.com/in/sejo-basic-17a477229/'
          target='_blank'
          rel='noreferrer'
        >
          <img src={linkedinIcon} alt='social media links' />
        </a>
      </div>
    </div>
  )
}

export default Footer
