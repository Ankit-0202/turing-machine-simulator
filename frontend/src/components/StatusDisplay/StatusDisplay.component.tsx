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
    <div className="status-display bg-white dark:bg-gray-700 p-6 rounded-lg shadow w-full max-w-4xl">
      <h3 className="text-2xl font-semibold mb-4 text-center">Status</h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-6">
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
        <div className="flex space-x-4">
          <button
            onClick={onStart}
            disabled={isStarted}
            className={`px-4 py-2 rounded ${
              isStarted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-white font-bold focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors`}
          >
            Start
          </button>
          <button
            onClick={onStep}
            disabled={!isStarted || isHalted}
            className={`px-4 py-2 rounded ${
              !isStarted || isHalted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
          >
            Step
          </button>
          <button
            onClick={onRun}
            disabled={!isStarted || isHalted}
            className={`px-4 py-2 rounded ${
              !isStarted || isHalted
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600'
            } text-white font-bold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors`}
          >
            Run
          </button>
          <button
            onClick={onReset}
            disabled={!isStarted && steps === 0}
            className={`px-4 py-2 rounded ${
              !isStarted && steps === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            } text-white font-bold focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusDisplay
