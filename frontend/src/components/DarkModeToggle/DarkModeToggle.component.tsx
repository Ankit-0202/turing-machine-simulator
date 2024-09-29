// frontend/src/components/DarkModeToggle/DarkModeToggle.component.tsx

import React, { useEffect, useState } from 'react'
import { DarkModeToggleProps } from './DarkModeToggle.model'
import './DarkModeToggle.styles.css'

const DarkModeToggle: React.FC<DarkModeToggleProps> = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedMode)
    if (savedMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 p-2 rounded"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default DarkModeToggle
