import React from 'react'

// Custom Hooks
import { useTheme } from '../../hooks/useTheme'

// Assets
import modeIcon from '../../assets/mode-icon.svg'
import modeIconFill from '../../assets/mode-icon-fill.svg'

// Styling
import './ThemeSelector.css'

// Array of theme colors that we will map through and output a btn to change color
const themeColors = ['#3d405b', '#81b29a', '#e07a5f']

function ThemeSelector() {
  // Call change color function and pass color as arg to update it
  const { changeColor, changeMode, mode } = useTheme()

  const renderColors = themeColors.map((color) => {
    return (
      <div
        key={color}
        onClick={() => changeColor(color)}
        style={{ background: color }}
      />
    )
  })

  // If mode is currently dark then change to light
  const handleToggle = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          onClick={handleToggle}
          src={mode === 'light' ? modeIcon : modeIconFill}
          alt='dark/light mode icon'
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(30%)' }}
        />
      </div>

      <div className='theme-buttons'>{renderColors}</div>
    </div>
  )
}

export default ThemeSelector
