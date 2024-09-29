// frontend/src/App.tsx

import React, { useState, useEffect } from 'react'
import MachineTypeSelector from './components/MachineTypeSelector/MachineTypeSelector.component'
import TapeDisplay from './components/TapeDisplay/TapeDisplay.component'
import TransitionInputComponent from './components/TransitionInput/TransitionInput.component'
import InputStringComponent from './components/InputString/InputString.component'
import ControlsComponent from './components/Controls/Controls.component'
import StatusDisplay from './components/StatusDisplay/StatusDisplay.component'
import TransitionHistory from './components/TransitionHistory/TransitionHistory.component'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle.component'
import StartStateSelector from './components/StartStateSelector/StartStateSelector.component' // Import StartStateSelector
import api from './api'
import {
  TransitionInput,
  StepOutput,
  TransitionTaken,
  MachineType
} from './types'

function App() {
  const [transitions, setTransitions] = useState<TransitionInput[]>([])
  const [inputString, setInputString] = useState<string>('')
  const [tape, setTape] = useState<string>('')
  const [head, setHead] = useState<number>(0)
  const [currentState, setCurrentState] = useState<string>('-')
  const [steps, setSteps] = useState<number>(0)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isHalted, setIsHalted] = useState<boolean>(false)
  const [startState, setStartState] = useState<string>('')
  const [transitionHistory, setTransitionHistory] = useState<TransitionTaken[]>(
    []
  )
  const [machineType, setMachineType] = useState<MachineType>(
    MachineType.STANDARD
  ) // Add machine type state

  // Derive valid states from transitions
  const validStates = Array.from(
    new Set(transitions.flatMap((t) => [t.current_state, t.new_state]))
  )

  const handleStart = async () => {
    if (transitions.length === 0) {
      alert(
        'Please add at least one transition before starting the simulation.'
      )
      return
    }

    if (startState === '') {
      alert('Please select a start state before starting the simulation.')
      return
    }

    try {
      const response = await api.post('/initialise', {
        // Corrected endpoint to '/initialise'
        transitions: transitions.map((t) => ({
          current_state: t.current_state,
          read_symbol: t.read_symbol,
          write_symbol: t.write_symbol,
          direction: t.direction,
          new_state: t.new_state,
          breakpoint: t.breakpoint || false
        })),
        input_string: inputString || '_',
        start_state: startState,
        machine_type: machineType // Send machine type to backend
      })

      // Initialize UI without performing the first step
      setTape(
        inputString.includes('*')
          ? inputString.replace('*', '_')
          : inputString || '_'
      )
      setHead(inputString.includes('*') ? inputString.indexOf('*') : 0)
      setCurrentState(startState)
      setSteps(0)
      setIsStarted(true)
      setIsHalted(false)
      setTransitionHistory([])
    } catch (error: any) {
      alert(
        error.response?.data?.detail || 'Error initializing Turing Machine.'
      )
      console.error(error)
    }
  }

  const handleStep = async () => {
    if (!isStarted) {
      alert('Simulation is not started.')
      return
    }

    if (isHalted) {
      alert('Turing Machine has already halted.')
      return
    }

    try {
      const response = await api.post('/step')
      const data: StepOutput = response.data
      setTape(data.tape)
      setHead(data.head)
      setCurrentState(data.current_state)
      setSteps(data.steps)
      setIsHalted(data.halted)
      if (data.transition_taken) {
        setTransitionHistory([...transitionHistory, data.transition_taken])
      }
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Error executing step.')
      console.error(error)
    }
  }

  const handleRun = async () => {
    if (!isStarted) {
      alert('Simulation is not started.')
      return
    }

    if (isHalted) {
      alert('Turing Machine has already halted.')
      return
    }

    try {
      const response = await api.post('/run')
      const data: StepOutput = response.data
      setTape(data.tape)
      setHead(data.head)
      setCurrentState(data.current_state)
      setSteps(data.steps)
      setIsHalted(data.halted)
      if (data.transitions_traversed) {
        setTransitionHistory([
          ...transitionHistory,
          ...data.transitions_traversed
        ])
      }
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Error running simulation.')
      console.error(error)
    }
  }

  const handleReset = async () => {
    try {
      await api.post('/reset', {
        input_string: inputString || '_',
        start_state: startState,
        machine_type: machineType
      })
      setTape(
        inputString.includes('*')
          ? inputString.replace('*', '_')
          : inputString || '_'
      )
      setHead(inputString.includes('*') ? inputString.indexOf('*') : 0)
      setCurrentState('-')
      setSteps(0)
      setIsStarted(false)
      setIsHalted(false)
      setTransitionHistory([])
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Error resetting Turing Machine.')
      console.error(error)
    }
  }

  return (
    <div className="App font-sans bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">
          Turing Machine Simulator
        </h1>
        <div className="flex items-center space-x-4">
          <MachineTypeSelector
            selectedType={machineType}
            setSelectedType={setMachineType}
          />{' '}
          {/* Add MachineTypeSelector */}
          <DarkModeToggle /> {/* Include the DarkModeToggle component */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Tape and Status */}
        <div className="space-y-6">
          <TapeDisplay tape={tape} head={head} machineType={machineType} />{' '}
          {/* Pass machineType */}
          <StatusDisplay currentState={currentState} steps={steps} />
          <TransitionHistory transitions={transitionHistory} />
        </div>

        {/* Right Column: Transition Input, Start State Selector, Input String, Controls */}
        <div className="space-y-6">
          <TransitionInputComponent
            transitions={transitions}
            setTransitions={setTransitions}
          />
          <StartStateSelector
            validStates={validStates}
            selectedStartState={startState}
            setSelectedStartState={setStartState}
          />
          <InputStringComponent
            inputString={inputString}
            setInputString={setInputString}
          />
          <ControlsComponent
            onStart={handleStart}
            onStep={handleStep}
            onRun={handleRun}
            onReset={handleReset}
            isStarted={isStarted}
            isHalted={isHalted}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Turing Machine Simulator. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
