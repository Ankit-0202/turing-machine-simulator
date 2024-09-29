// frontend/src/components/StatusDisplay/StatusDisplay.component.tsx

import React from 'react'
import { StatusDisplayProps } from './StatusDisplay.model'

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  currentState,
  steps
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        Status
      </h3>
      <div className="flex justify-between">
        <div>
          <span className="font-medium text-primary">Current State:</span>{' '}
          {currentState}
        </div>
        <div>
          <span className="font-medium text-primary">Steps:</span> {steps}
        </div>
      </div>
    </div>
  )
}

export default StatusDisplay
