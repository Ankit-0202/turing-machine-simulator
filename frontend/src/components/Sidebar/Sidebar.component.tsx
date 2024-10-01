// frontend/src/components/Sidebar/Sidebar.component.tsx

import React, { useState } from 'react'
import { TransitionInputProps } from '../TransitionInput/TransitionInput.model'
import StartStateSelector from '../StartStateSelector/StartStateSelector.component'
import './Sidebar.styles.css'

interface SidebarProps {
  startState: string
  setStartState: React.Dispatch<React.SetStateAction<string>>
}

const Sidebar: React.FC<SidebarProps> = ({ startState, setStartState }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
        aria-label="Toggle Start State Sidebar"
      >
        {isOpen ? 'Close' : 'Start State'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-700 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            Start State
          </h2>
          <StartStateSelector
            transitions={[]}
            startState={startState}
            setStartState={setStartState}
          />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
          aria-hidden="true"
        ></div>
      )}
    </>
  )
}

export default Sidebar
