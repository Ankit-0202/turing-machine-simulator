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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Step
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Current State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Read Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Write Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Direction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                New State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Breakpoint
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {transitions.map((t, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.step}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.current_state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.read_symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.write_symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.direction.toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.new_state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {t.breakpoint ? (
                    <span className="text-red-500 font-semibold">Yes</span>
                  ) : (
                    'No'
                  )}
                </td>
              </tr>
            ))}
            {transitions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center"
                >
                  No transitions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransitionHistory
