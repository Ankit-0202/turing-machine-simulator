// frontend/src/components/Controls/Controls.component.tsx

import React from 'react'
import { ControlsProps } from './Controls.model'

const ControlsComponent: React.FC<ControlsProps> = ({
  onStart,
  onStep,
  onRun,
  onReset,
  isStarted,
  isHalted
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Controls</h3>
      <div className="space-y-2">
        <button
          onClick={onStart}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
          disabled={isStarted}
        >
          Start Simulation
        </button>
        <button
          onClick={onStep}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!isStarted || isHalted}
        >
          Step
        </button>
        <button
          onClick={onRun}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300"
          disabled={!isStarted || isHalted}
        >
          Run
        </button>
        <button
          onClick={onReset}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default ControlsComponent
