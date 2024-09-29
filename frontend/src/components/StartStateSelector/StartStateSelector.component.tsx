// frontend/src/components/StartStateSelector/StartStateSelector.component.tsx

import React from 'react'
import { StartStateSelectorProps } from './StartStateSelector.model'

const StartStateSelector: React.FC<StartStateSelectorProps> = ({
  validStates,
  selectedStartState,
  setSelectedStartState
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow ml-4 mt-4">
      <h3 className="text-xl font-semibold mb-4 pb-2 text-primary">
        Start State
      </h3>
      <select
        value={selectedStartState}
        onChange={(e) => setSelectedStartState(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
      >
        <option value="" disabled>
          Select Start State
        </option>
        {validStates.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StartStateSelector
