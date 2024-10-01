// frontend/src/components/StartStateSelector/StartStateSelector.component.tsx

import React from 'react'
import { StartStateSelectorProps } from './StartStateSelector.model'
import './StartStateSelector.styles.css'

const StartStateSelector: React.FC<StartStateSelectorProps> = ({
  transitions,
  startState,
  setStartState
}) => {
  const states = [...new Set(transitions.map((t) => t.current_state))]

  return (
    <div className="start-state-selector bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Start State</h3>
      <select
        value={startState}
        onChange={(e) => setStartState(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
      >
        <option value="" disabled>
          Select start state
        </option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StartStateSelector
