// frontend/src/components/TapeDisplay/TapeDisplay.component.tsx

import React from 'react'
import { TapeDisplayProps } from './TapeDisplay.model'
import { MachineType } from '../../types'

const TapeDisplay: React.FC<TapeDisplayProps> = ({
  tape,
  head,
  machineType
}) => {
  const tapeArray = tape.split('')

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Tape</h3>
      <div className="flex items-center justify-start space-x-2 overflow-x-auto">
        {machineType === MachineType.LEFT_BOUNDED && (
          <div
            className="w-8 h-8 flex items-center justify-center border border-red-500 bg-red-100 dark:bg-red-600 rounded"
            aria-label="Left Boundary"
            title="Left Boundary"
          >
            {/* Left Boundary Indicator */}
            <span className="text-sm font-bold">L</span>
          </div>
        )}
        {tapeArray.map((symbol, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center border ${
              index === head
                ? 'bg-yellow-200 border-yellow-500 dark:bg-yellow-600'
                : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
            } rounded`}
          >
            {symbol}
          </div>
        ))}
      </div>
      {/* Optional: Display message if head is at left boundary */}
      {machineType === MachineType.LEFT_BOUNDED && head === 0 && (
        <p className="mt-2 text-red-500 dark:text-red-300 text-sm">
          Head is at the left boundary and cannot move left.
        </p>
      )}
    </div>
  )
}

export default TapeDisplay
