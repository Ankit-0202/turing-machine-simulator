import React from 'react'

interface Props {
  onStart: () => void
  onStep: () => void
  onRun: () => void
  onReset: () => void
  isStarted: boolean
  isHalted: boolean
}

const ControlsComponent: React.FC<Props> = ({
  onStart,
  onStep,
  onRun,
  onReset,
  isStarted,
  isHalted
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow flex flex-col space-y-4">
      <h3 className="text-xl font-semibold mb-2 border-b pb-2">Controls</h3>
      <div className="flex flex-wrap gap-4">
        {!isStarted && (
          <button
            onClick={onStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Start Simulation
          </button>
        )}
        {isStarted && !isHalted && (
          <>
            <button
              onClick={onStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Step
            </button>
            <button
              onClick={onRun}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Run
            </button>
          </>
        )}
        <button
          onClick={onReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default ControlsComponent
