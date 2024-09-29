// frontend/src/components/TransitionHistory/TransitionHistory.component.tsx

import React from 'react'
import { TransitionHistoryProps } from './TransitionHistory.model'
import './TransitionHistory.styles.css'

const TransitionHistory: React.FC<TransitionHistoryProps> = ({
  transitions
}) => {
  return (
    <div className="transition-history bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Transition History
      </h3>
      <ul className="list-disc pl-5">
        {transitions.map((t, index) => (
          <li key={index}>
            Step {t.step}: {t.current_state} --{t.read_symbol}→ {t.write_symbol}{' '}
            / {t.direction} → {t.new_state}
            {t.breakpoint && (
              <span className="text-red-500"> [Breakpoint]</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransitionHistory
