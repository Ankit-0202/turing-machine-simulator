// frontend/src/components/StatusDisplay/StatusDisplay.component.tsx

import React from 'react'
import { StatusDisplayProps } from './StatusDisplay.model'
import './StatusDisplay.styles.css'

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  currentState,
  steps,
  isStarted,
  isHalted,
  onStart,
  onStep,
  onRun,
  onReset
}) => {
  return (
    <div className="status-display bg-white dark:bg-gray-700 p-6 rounded-lg shadow w-full max-w-6xl mt-4">
      <h3 className="text-2xl font-semibold mb-4 text-center">Status</h3>
      <div className="flex justify-around items-center">
        <div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Current State:
          </p>
          <p className="text-xl text-gray-900 dark:text-gray-100">
            {currentState}
          </p>
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Steps Executed:
          </p>
          <p className="text-xl text-gray-900 dark:text-gray-100">{steps}</p>
        </div>
      </div>
      {/* Control Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        {!isStarted && (
          <button
            onClick={onStart}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          >
            Start
          </button>
        )}
        {isStarted && !isHalted && (
          <>
            <button
              onClick={onStep}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              Step
            </button>
            <button
              onClick={onRun}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
            >
              Run
            </button>
            <button
              onClick={onReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            >
              Reset
            </button>
          </>
        )}
        {isHalted && (
          <button
            onClick={onReset}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default StatusDisplay
