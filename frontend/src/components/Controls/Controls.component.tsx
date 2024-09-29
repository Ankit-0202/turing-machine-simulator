// frontend/src/components/Controls/Controls.component.tsx

import React from 'react'
import { ControlsProps } from './Controls.model'
import './Controls.styles.css'

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onStep,
  onRun,
  onReset,
  isStarted,
  isHalted
}) => {
  return (
    <div className="controls bg-white dark:bg-gray-700 p-4 rounded-lg shadow flex space-x-2">
      <button
        onClick={onStart}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        disabled={isStarted}
      >
        Start
      </button>
      <button
        onClick={onStep}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!isStarted || isHalted}
      >
        Step
      </button>
      <button
        onClick={onRun}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        disabled={!isStarted || isHalted}
      >
        Run
      </button>
      <button
        onClick={onReset}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset
      </button>
    </div>
  )
}

export default Controls
