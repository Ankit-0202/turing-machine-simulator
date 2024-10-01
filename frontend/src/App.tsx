// frontend/src/App.tsx

import React, { useState } from 'react'
import TransitionInput from './components/TransitionInput/TransitionInput.component'
import InputString from './components/InputString/InputString.component'
import Controls from './components/Controls/Controls.component'
import TapeDisplay from './components/TapeDisplay/TapeDisplay.component'
import StatusDisplay from './components/StatusDisplay/StatusDisplay.component'
import TransitionHistory from './components/TransitionHistory/TransitionHistory.component'
import MachineTypeSelector from './components/MachineTypeSelector/MachineTypeSelector.component'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle.component'
import Settings from './components/Settings/Settings.component' // Updated Import
import './styles/globals.css'
import api from './api'
import {
  TransitionInput as TransitionInputType,
  StepOutput,
  TransitionTaken,
  MachineType
} from './types'

function App() {
  const [transitions, setTransitions] = useState<TransitionInputType[]>([])
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
  )
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false) // State for Settings Sidebar

  const handleStart = async () => {
    if (transitions.length === 0) {
      alert(
        'Please add at least one transition before starting the simulation.'
      )
      return
    }

    // Set default start state if not set
    let effectiveStartState = startState
    if (startState === '') {
      effectiveStartState = transitions[0].current_state
      setStartState(effectiveStartState)
    }

    try {
      await api.post('/initialise', {
        transitions: transitions.map((t) => ({
          current_state: t.current_state,
          read_symbol: t.read_symbol,
          write_symbol: t.write_symbol,
          direction: t.direction,
          new_state: t.new_state,
          breakpoint: t.breakpoint || false
        })),
        input_string: inputString || '_',
        start_state: effectiveStartState,
        machine_type: machineType
      })
      // Initialise UI without performing the first step
      setTape(
        inputString.includes('*')
          ? inputString.replace('*', '_')
          : inputString || '_'
      )
      setHead(inputString.includes('*') ? inputString.indexOf('*') : 0)
      setCurrentState(effectiveStartState)
      setSteps(0)
      setIsStarted(true)
      setIsHalted(false)
      setTransitionHistory([])
    } catch (error: any) {
      alert(
        error.response?.data?.detail || 'Error initialising Turing Machine.'
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

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <div className="App font-sans bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-md flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold">Turing Machine Simulator</h1>
        <div className="flex items-center space-x-4">
          <MachineTypeSelector
            selectedType={machineType}
            setSelectedType={setMachineType}
          />
          <DarkModeToggle />
          <button
            onClick={toggleSettings}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
            aria-label="Open Settings"
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Settings Sidebar */}
      <Settings
        isOpen={isSettingsOpen}
        toggleSettings={toggleSettings}
        startState={startState}
        setStartState={setStartState}
        transitions={transitions}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center">
        {/* Tape Display */}
        <TapeDisplay tape={tape} head={head} machineType={machineType} />

        {/* Status Display with Controls */}
        <StatusDisplay
          currentState={currentState}
          steps={steps}
          isStarted={isStarted}
          isHalted={isHalted}
          onStart={handleStart}
          onStep={handleStep}
          onRun={handleRun}
          onReset={handleReset}
        />

        {/* Conditional Transition History */}
        {transitionHistory.length > 0 && (
          <TransitionHistory transitions={transitionHistory} />
        )}

        {/* Input String and Transition Inputs */}
        <div className="w-full max-w-4xl mt-6">
          <InputString
            inputString={inputString}
            setInputString={setInputString}
          />
          <TransitionInput
            transitions={transitions}
            setTransitions={setTransitions}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Turing Machine Simulator. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}

export default App
