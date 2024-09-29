// frontend/src/components/InputString/InputString.component.tsx

import React from 'react'
import { InputStringProps } from './InputString.model'

const InputStringComponent: React.FC<InputStringProps> = ({
  inputString,
  setInputString
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputString(value)
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        Input String
      </h3>
      <input
        type="text"
        value={inputString}
        onChange={handleChange}
        placeholder="Enter input string (use '*' to indicate head position)"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
      />
    </div>
  )
}

export default InputStringComponent
