// frontend/src/components/StatusDisplay/StatusDisplay.component.tsx

import React from 'react'
import { StatusDisplayProps } from './StatusDisplay.model'
import './StatusDisplay.styles.css'

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  currentState,
  steps
}) => {
  return (
    <div className="status-display bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Status</h3>
      <p>
        <strong>Current State:</strong> {currentState}
      </p>
      <p>
        <strong>Steps Executed:</strong> {steps}
      </p>
    </div>
  )
}

export default StatusDisplay
