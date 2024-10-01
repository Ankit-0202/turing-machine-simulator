// frontend/src/components/TransitionInput/TransitionInput.component.tsx

import React, { useState } from 'react'
import { TransitionInputProps } from './TransitionInput.model'
import { TransitionInput } from '../../types'

const TransitionInputComponent: React.FC<TransitionInputProps> = ({
  transitions,
  setTransitions
}) => {
  const [transition, setTransition] = useState<TransitionInput>({
    current_state: '',
    read_symbol: '',
    write_symbol: '',
    direction: 'r',
    new_state: '',
    breakpoint: false
  })

  const [bulkInput, setBulkInput] = useState<string>('')
  const [bulkErrors, setBulkErrors] = useState<string[]>([])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement & {
      name: string
      value: string
      type: string
      checked?: boolean
    }

    let newValue: string | boolean

    if (type === 'checkbox') {
      newValue = checked ?? false
    } else {
      newValue = value
    }

    setTransition((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  const addTransition = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation based on the specified syntax rules (Morphett)
    const { current_state, read_symbol, write_symbol, direction, new_state } =
      transition

    if (
      !current_state ||
      !read_symbol ||
      !write_symbol ||
      !direction ||
      !new_state
    ) {
      alert('Please fill in all fields for the transition.')
      return
    }

    // Symbols cannot contain ';' or whitespace
    const invalidSymbols = /[; ]/
    if (read_symbol !== '*' && invalidSymbols.test(read_symbol)) {
      alert("Read symbol cannot contain ';' or whitespace.")
      return
    }
    if (write_symbol !== '*' && invalidSymbols.test(write_symbol)) {
      alert("Write symbol cannot contain ';' or whitespace.")
      return
    }

    // State names cannot contain ';' or whitespace
    const invalidStates = /[; ]/
    if (invalidStates.test(current_state)) {
      alert("Current state cannot contain ';' or whitespace.")
      return
    }
    if (invalidStates.test(new_state)) {
      alert("New state cannot contain ';' or whitespace.")
      return
    }

    // Direction validation is already handled by the select input
    if (
      transitions.some(
        (t) =>
          (t.current_state === current_state || t.current_state === '*') &&
          (t.read_symbol === read_symbol || t.read_symbol === '*')
      )
    ) {
      alert(
        `Duplicate transition for state-symbol pair: (${current_state}, ${read_symbol})`
      )
      return
    }

    setTransitions([...transitions, { ...transition }])

    // Reset the input fields
    setTransition({
      current_state: '',
      read_symbol: '',
      write_symbol: '',
      direction: 'r',
      new_state: '',
      breakpoint: false
    })
  }

  const removeTransition = (index: number) => {
    const newTransitions = [...transitions]
    newTransitions.splice(index, 1)
    setTransitions(newTransitions)
  }

  const parseBulkTransitions = () => {
    const lines = bulkInput.split('\n')
    const newTransitions: TransitionInput[] = []
    const errors: string[] = []
    const existingKeys = transitions.map(
      (t) => `${t.current_state},${t.read_symbol}`
    )

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      if (trimmedLine === '' || trimmedLine.startsWith(';')) {
        // Ignore empty lines and comments
        return
      }

      const parts = trimmedLine.split(/\s+/)
      if (parts.length !== 5) {
        errors.push(`Line ${index + 1}: Incorrect number of fields.`)
        return
      }

      const [current_state, read_symbol, write_symbol, direction, new_state] =
        parts

      // Validate direction
      if (!['l', 'r', '*'].includes(direction)) {
        errors.push(
          `Line ${
            index + 1
          }: Invalid direction '${direction}'. Use 'l', 'r', or '*'.`
        )
        return
      }

      // Symbols cannot contain ';' or whitespace
      const invalidSymbols = /[; ]/
      if (read_symbol !== '*' && invalidSymbols.test(read_symbol)) {
        errors.push(
          `Line ${index + 1}: Read symbol cannot contain ';' or whitespace.`
        )
        return
      }
      if (write_symbol !== '*' && invalidSymbols.test(write_symbol)) {
        errors.push(
          `Line ${index + 1}: Write symbol cannot contain ';' or whitespace.`
        )
        return
      }

      // State names cannot contain ';' or whitespace
      const invalidStates = /[; ]/
      if (invalidStates.test(current_state)) {
        errors.push(
          `Line ${index + 1}: Current state cannot contain ';' or whitespace.`
        )
        return
      }
      if (invalidStates.test(new_state)) {
        errors.push(
          `Line ${index + 1}: New state cannot contain ';' or whitespace.`
        )
        return
      }

      // Enforce determinism
      const key = `${current_state},${read_symbol}`
      if (
        existingKeys.includes(key) ||
        newTransitions.some(
          (t) => `${t.current_state},${t.read_symbol}` === key
        )
      ) {
        errors.push(
          `Line ${
            index + 1
          }: Duplicate transition for state-symbol pair '${key}'.`
        )
        return
      }

      newTransitions.push({
        current_state,
        read_symbol,
        write_symbol,
        direction: direction as 'l' | 'r' | '*',
        new_state,
        breakpoint: false // Bulk transitions do not include breakpoints
      })
    })

    if (errors.length > 0) {
      setBulkErrors(errors)
      return
    }

    setTransitions([...transitions, ...newTransitions])
    setBulkInput('')
    setBulkErrors([])
  }

  return (
    <div className="transition-input bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Add Transitions
      </h3>

      {/* Individual Transition Inputs */}
      <form onSubmit={addTransition} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Current State */}
          <div className="flex flex-col">
            <label
              htmlFor="current_state"
              className="mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Current State
            </label>
            <input
              type="text"
              id="current_state"
              name="current_state"
              placeholder="e.g., start"
              value={transition.current_state}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Read Symbol */}
          <div className="flex flex-col">
            <label
              htmlFor="read_symbol"
              className="mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Read Symbol
            </label>
            <input
              type="text"
              id="read_symbol"
              name="read_symbol"
              placeholder="e.g., 1"
              value={transition.read_symbol}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Write Symbol */}
          <div className="flex flex-col">
            <label
              htmlFor="write_symbol"
              className="mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Write Symbol
            </label>
            <input
              type="text"
              id="write_symbol"
              name="write_symbol"
              placeholder="e.g., 0"
              value={transition.write_symbol}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Direction */}
          <div className="flex flex-col">
            <label
              htmlFor="direction"
              className="mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Direction
            </label>
            <select
              id="direction"
              name="direction"
              value={transition.direction}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            >
              <option value="l">Left (l)</option>
              <option value="r">Right (r)</option>
              <option value="*">Stay (*)</option>
            </select>
          </div>

          {/* New State */}
          <div className="flex flex-col">
            <label
              htmlFor="new_state"
              className="mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              New State
            </label>
            <input
              type="text"
              id="new_state"
              name="new_state"
              placeholder="e.g., carry"
              value={transition.new_state}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Breakpoint Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="breakpoint"
            name="breakpoint"
            checked={transition.breakpoint}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            htmlFor="breakpoint"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Breakpoint
          </label>
        </div>

        {/* Add Transition Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Add Transition
          </button>
        </div>
      </form>

      {/* Bulk Transition Input */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4 text-center">
          Bulk Add Transitions
        </h4>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={`Enter transitions here, one per line.\nFormat: <current_state> <read_symbol> <write_symbol> <direction> <new_state>\nExample:\nstart 1 0 r carry`}
          className="w-full h-40 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-600 dark:text-white"
        ></textarea>
        <div className="flex justify-center mt-4">
          <button
            onClick={parseBulkTransitions}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Add Bulk Transitions
          </button>
        </div>
        {bulkErrors.length > 0 && (
          <div className="mt-4 text-red-500">
            <ul className="list-disc list-inside">
              {bulkErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* List of Transitions */}
      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4 text-center">
          Transition List
        </h4>
        {transitions.length === 0 ? (
          <p className="text-gray-500 text-center">No transitions added yet.</p>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-y-auto">
            {transitions.map((t, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-4 rounded-lg shadow"
              >
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {`${t.current_state} ${t.read_symbol} ${t.write_symbol} ${t.direction} ${t.new_state}`}
                  {t.breakpoint && (
                    <span className="ml-2 text-red-500 font-bold">!</span>
                  )}
                </span>
                <button
                  onClick={() => removeTransition(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TransitionInputComponent
