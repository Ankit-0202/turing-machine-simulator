// frontend/src/components/Settings/Settings.component.tsx

import React from 'react'
import { SettingsProps } from './Settings.model'
import StartStateSelector from '../StartStateSelector/StartStateSelector.component'
import './Settings.styles.css'

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  toggleSettings,
  startState,
  setStartState,
  transitions
}) => {
  return (
    <div
      className={`settings-sidebar fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Settings
        </h2>
        <button
          onClick={toggleSettings}
          className="text-gray-800 dark:text-gray-200 focus:outline-none"
          aria-label="Close Settings"
        >
          ✖️
        </button>
      </div>
      <div className="p-4">
        <StartStateSelector
          transitions={transitions}
          startState={startState}
          setStartState={setStartState}
        />
        {/* Additional settings can be added here */}
      </div>
    </div>
  )
}

export default Settings
