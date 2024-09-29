// frontend/src/components/TransitionInput/TransitionInput.component.tsx

import React, { useState } from 'react'
import { TransitionInputComponentProps } from './TransitionInput.model'
import { TransitionInput } from '../../types'

const TransitionInputComponent: React.FC<TransitionInputComponentProps> = ({
  transitions,
  setTransitions
}) => {
  const [newTransition, setNewTransition] = useState<TransitionInput>({
    current_state: '',
    read_symbol: '',
    write_symbol: '',
    direction: 'r',
    new_state: '',
    breakpoint: false
  })

  const [bulkInput, setBulkInput] = useState<string>('')

  // Corrected handleChange function with type guard
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    let newValue: string | boolean = value

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked
    }

    setNewTransition((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  const addTransition = () => {
    // Basic validation
    const { current_state, read_symbol, write_symbol, direction, new_state } =
      newTransition
    if (
      !current_state ||
      !read_symbol ||
      !write_symbol ||
      !direction ||
      !new_state
    ) {
      alert('Please fill in all required fields for the transition.')
      return
    }

    setTransitions([...transitions, newTransition])
    setNewTransition({
      current_state: '',
      read_symbol: '',
      write_symbol: '',
      direction: 'r',
      new_state: '',
      breakpoint: false
    })
  }

  const removeTransition = (index: number) => {
    const updated = transitions.filter((_, i) => i !== index)
    setTransitions(updated)
  }

  const handleBulkAdd = () => {
    /**
     * Define the expected format:
     * Each line should contain one tuple of the form:
     * '<current state> <current symbol> <new symbol> <direction> <new state> [!]'
     *
     * Example:
     * start 1 1 l start
     * start _ _ * halt-accept !
     *
     * Notes:
     * - '*' can be used as a wildcard in <current state> or <current symbol>
     * - '*' in <new symbol> or <new state> means 'no change'
     * - '!' at the end sets a breakpoint
     * - Anything after ';' is a comment and is ignored
     */

    const lines = bulkInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    const parsedTransitions: TransitionInput[] = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      // Remove comments
      const commentIndex = line.indexOf(';')
      if (commentIndex !== -1) {
        line = line.substring(0, commentIndex).trim()
      }

      if (line.length === 0) {
        continue // Entire line was a comment
      }

      const parts = line.split(/\s+/) // Split by whitespace
      if (parts.length < 5) {
        alert(`Invalid format in line ${i + 1}: "${lines[i]}"`)
        return
      }

      const [
        current_state,
        read_symbol,
        write_symbol,
        direction,
        new_state,
        ...rest
      ] = parts

      // Validate direction
      if (!['l', 'r', '*'].includes(direction)) {
        alert(`Invalid direction "${direction}" in line ${i + 1}`)
        return
      }

      // Handle breakpoint
      let breakpoint = false
      if (rest.includes('!')) {
        breakpoint = true
      }

      // Validate symbols (cannot use ';', '*' except in specific contexts, '_' as blank)
      const invalidSymbols = new Set([';', ' ', '\t'])
      if (read_symbol !== '*' && invalidSymbols.has(read_symbol)) {
        alert(`Invalid read_symbol "${read_symbol}" in line ${i + 1}`)
        return
      }

      if (write_symbol !== '*' && invalidSymbols.has(write_symbol)) {
        alert(`Invalid write_symbol "${write_symbol}" in line ${i + 1}`)
        return
      }

      // Validate state names (cannot contain ';' or whitespace)
      const invalidStateChars = new Set([';', ' ', '\t'])
      for (const char of current_state) {
        if (invalidStateChars.has(char)) {
          alert(
            `Invalid character "${char}" in current_state "${current_state}" in line ${
              i + 1
            }`
          )
          return
        }
      }

      for (const char of new_state) {
        if (invalidStateChars.has(char)) {
          alert(
            `Invalid character "${char}" in new_state "${new_state}" in line ${
              i + 1
            }`
          )
          return
        }
      }

      parsedTransitions.push({
        current_state,
        read_symbol,
        write_symbol,
        direction: direction as 'l' | 'r' | '*',
        new_state,
        breakpoint
      })
    }

    setTransitions([...transitions, ...parsedTransitions])
    setBulkInput('')
  }

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        Transitions
      </h3>
      {/* Existing Transition List */}
      <div className="space-y-4 mb-6 max-h-40 overflow-y-auto">
        {transitions.map((transition, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-primary">
              ({transition.current_state}, {transition.read_symbol}) → (
              {transition.write_symbol !== '*'
                ? transition.write_symbol
                : transition.read_symbol}
              , {transition.direction},{' '}
              {transition.new_state !== '*'
                ? transition.new_state
                : transition.current_state}
              ){transition.breakpoint && ' [Breakpoint]'}
            </span>
            <button
              onClick={() => removeTransition(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Individual Transition Input */}
      <div className="space-y-2 mb-6">
        <h4 className="text-lg font-semibold text-primary">
          Add Single Transition
        </h4>
        <input
          type="text"
          name="current_state"
          value={newTransition.current_state}
          onChange={handleChange}
          placeholder="Current State"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
        <input
          type="text"
          name="read_symbol"
          value={newTransition.read_symbol}
          onChange={handleChange}
          placeholder="Read Symbol"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
        <input
          type="text"
          name="write_symbol"
          value={newTransition.write_symbol}
          onChange={handleChange}
          placeholder="Write Symbol"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
        <select
          name="direction"
          value={newTransition.direction}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          <option value="l">Left (L)</option>
          <option value="r">Right (R)</option>
          <option value="*">Stay (*)</option>
        </select>
        <input
          type="text"
          name="new_state"
          value={newTransition.new_state}
          onChange={handleChange}
          placeholder="New State"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="breakpoint"
            checked={newTransition.breakpoint}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-primary">Breakpoint</label>
        </div>
        <button
          onClick={addTransition}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Transition
        </button>
      </div>

      {/* Bulk Transition Input */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-primary">
          Add Bulk Transitions
        </h4>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={`Enter transitions in the following format:\n<current state> <current symbol> <new symbol> <direction> <new state> [!]\nExample:\nstart 1 1 l start\nstart _ _ * halt-accept !`}
          className="w-full h-24 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
        <button
          onClick={handleBulkAdd}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Bulk Transitions
        </button>
      </div>
    </div>
  )
}

export default TransitionInputComponent
