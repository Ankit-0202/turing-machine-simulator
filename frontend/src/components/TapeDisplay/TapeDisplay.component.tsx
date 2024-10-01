// frontend/src/components/TapeDisplay/TapeDisplay.component.tsx

import React from 'react'
import { TapeDisplayProps } from './TapeDisplay.model'
import { MachineType } from '../../types'
import './TapeDisplay.styles.css'

const TapeDisplay: React.FC<TapeDisplayProps> = ({
  tape,
  head,
  machineType
}) => {
  const tapeArray = tape.split('')

  return (
    <div className="tape-display bg-white dark:bg-gray-700 p-6 rounded-lg shadow w-full max-w-4xl">
      <h3 className="text-2xl font-semibold mb-4 text-center">Tape</h3>
      <div className="flex items-center justify-center space-x-2 overflow-x-auto">
        {machineType === MachineType.LEFT_BOUNDED && (
          <div
            className="left-boundary w-12 h-12 flex items-center justify-center border border-red-500 bg-red-100 dark:bg-red-600 rounded-full"
            aria-label="Left Boundary"
            title="Left Boundary"
          >
            <span className="text-lg font-bold">L</span>
          </div>
        )}
        {tapeArray.map((symbol: string, index: number) => (
          <div
            key={index}
            className={`tape-symbol relative w-12 h-12 flex items-center justify-center border ${
              index === head
                ? 'bg-yellow-300 border-yellow-500 dark:bg-yellow-600'
                : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
            } rounded-full transition-colors duration-300`}
          >
            {symbol}
            {index === head && (
              <div className="absolute -top-3 -right-3 w-3 h-3 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      {/* Optional: Display message if head is at left boundary */}
      {machineType === MachineType.LEFT_BOUNDED && head === 0 && (
        <p className="mt-4 text-red-500 dark:text-red-300 text-center">
          Head is at the left boundary and cannot move left.
        </p>
      )}
    </div>
  )
}

export default TapeDisplay
