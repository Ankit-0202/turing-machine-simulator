// frontend/src/components/InputString/InputString.component.tsx

import React from 'react'
import { InputStringProps } from './InputString.model'
import './InputString.styles.css'

const InputString: React.FC<InputStringProps> = ({
  inputString,
  setInputString
}) => {
  return (
    <div className="input-string bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Input String</h3>
      <input
        type="text"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
        placeholder="Enter input string"
      />
    </div>
  )
}

export default InputString
