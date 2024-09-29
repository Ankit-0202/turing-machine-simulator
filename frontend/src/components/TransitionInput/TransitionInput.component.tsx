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
    // Define the expected format:
    // Each transition on a new line, fields separated by commas
    // Example:
    // start,1,1,l,start
    // start,_,_,*,halt-accept

    const lines = bulkInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    const parsedTransitions: TransitionInput[] = []

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(',').map((part) => part.trim())
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
        breakpointStr
      ] = parts

      if (!['l', 'r', '*'].includes(direction)) {
        alert(`Invalid direction "${direction}" in line ${i + 1}`)
        return
      }

      const breakpoint =
        (breakpointStr && breakpointStr.toLowerCase() === 'breakpoint') ||
        undefined

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
              {transition.write_symbol}, {transition.direction},{' '}
              {transition.new_state}){transition.breakpoint && ' [Breakpoint]'}
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
          placeholder={`Enter transitions in the following format:\ncurrent_state,read_symbol,write_symbol,direction,new_state,[breakpoint]\nExample:\nstart,1,1,l,start\nstart,_,_,*,halt-accept`}
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
