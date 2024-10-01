// frontend/src/components/InputSection/InputSection.tsx

import React, { useState } from 'react'
import { InputSectionProps } from './InputSection.model'

const InputSection: React.FC<InputSectionProps> = ({
  inputString,
  setInputString,
  bulkInput,
  setBulkInput,
  handleBulkInput
}) => {
  const [isBulk, setIsBulk] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-2xl font-semibold mb-4">Input</h2>
      {!isBulk ? (
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="Enter input string (use '*' for head position)"
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      ) : (
        <>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="Enter multiple input strings, one per line (use '*' for head position)"
            className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none h-32"
          />
          <button
            onClick={handleBulkInput}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Submit Bulk Inputs
          </button>
        </>
      )}
      <button
        onClick={() => setIsBulk(!isBulk)}
        className="mt-4 text-blue-500 hover:underline focus:outline-none"
      >
        {isBulk ? 'Single Input' : 'Bulk Input'}
      </button>
    </div>
  )
}

export default InputSection
