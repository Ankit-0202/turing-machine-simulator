// frontend/src/components/TransitionHistory/TransitionHistory.component.tsx

import React from 'react'
import { TransitionHistoryProps } from './TransitionHistory.model'
import { TransitionTaken } from '../../types'

const TransitionHistory: React.FC<TransitionHistoryProps> = ({
  transitions
}) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow overflow-y-auto max-h-64">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        Transition History
      </h3>
      {transitions.length === 0 ? (
        <p className="text-primary">No transitions executed yet.</p>
      ) : (
        <ul className="space-y-2">
          {transitions.map((transition: TransitionTaken, index: number) => (
            <li key={index} className="border-b pb-2">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium text-primary">
                    Step {transition.step}:
                  </span>{' '}
                  ({transition.current_state}, {transition.read_symbol}) → (
                  {transition.write_symbol}, {transition.direction},{' '}
                  {transition.new_state})
                </div>
                {transition.breakpoint && (
                  <span className="text-red-500 font-semibold">Breakpoint</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TransitionHistory
