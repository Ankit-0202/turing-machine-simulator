// frontend/src/App.tsx

import React, { useState, useEffect } from 'react'
import TransitionInput from './components/TransitionInput/TransitionInput.component'
import InputString from './components/InputString/InputString.component'
import TapeDisplay from './components/TapeDisplay/TapeDisplay.component'
import StatusDisplay from './components/StatusDisplay/StatusDisplay.component'
import TransitionHistory from './components/TransitionHistory/TransitionHistory.component'
import MachineTypeSelector from './components/MachineTypeSelector/MachineTypeSelector.component'
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle.component'
import Settings from './components/Settings/Settings.component' // Updated Import
import './styles/globals.css'
import {
  TransitionInput as TransitionInputType,
  TransitionTaken,
  MachineType
} from './types'
import {
  TuringMachine,
  MachineType as TMType,
  Direction
} from './utils/turingMachine'

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
  const [turingMachine, setTuringMachine] = useState<TuringMachine | null>(null)

  const mapDirection = (direction: 'l' | 'r' | '*'): Direction => {
    switch (direction) {
      case 'l':
        return Direction.LEFT
      case 'r':
        return Direction.RIGHT
      case '*':
        return Direction.STAY
      default:
        throw new Error(`Invalid direction: ${direction}`)
    }
  }

  // Initialize Turing Machine when starting
  const handleStart = () => {
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

    // Create a new Turing Machine instance
    const tm = new TuringMachine({
      transitions: transitions.map((t) => ({
        current_state: t.current_state,
        read_symbol: t.read_symbol,
        write_symbol: t.write_symbol,
        direction: mapDirection(t.direction), // Use mapping function
        new_state: t.new_state,
        breakpoint: t.breakpoint || false
      })),
      input_string: inputString || '_',
      start_state: effectiveStartState,
      machine_type:
        machineType === MachineType.STANDARD
          ? TMType.STANDARD
          : TMType.LEFT_BOUNDED
    })

    setTuringMachine(tm)

    // Initialize UI without performing the first step
    setTape(tm.getTape())
    setHead(tm.getHead())
    setCurrentState(tm.getCurrentState())
    setSteps(tm.getSteps())
    setIsStarted(true)
    setIsHalted(false)
    setTransitionHistory([])
  }

  const handleReset = () => {
    if (!turingMachine) {
      return
    }

    turingMachine.reset({
      transitions: transitions.map((t) => ({
        current_state: t.current_state,
        read_symbol: t.read_symbol,
        write_symbol: t.write_symbol,
        direction: mapDirection(t.direction), // Use mapping function
        new_state: t.new_state,
        breakpoint: t.breakpoint || false
      })),
      input_string: inputString || '_',
      start_state: startState,
      machine_type:
        machineType === MachineType.STANDARD
          ? TMType.STANDARD
          : TMType.LEFT_BOUNDED
    })

    setTape(turingMachine.getTape())
    setHead(turingMachine.getHead())
    setCurrentState(turingMachine.getCurrentState())
    setSteps(turingMachine.getSteps())
    setIsStarted(false)
    setIsHalted(false)
    setTransitionHistory([])
  }

  const handleStep = () => {
    if (!isStarted || !turingMachine) {
      alert('Simulation is not started.')
      return
    }

    if (isHalted) {
      alert('Turing Machine has already halted.')
      return
    }

    const output = turingMachine.step()

    setTape(output.tape)
    setHead(output.head)
    setCurrentState(output.current_state)
    setSteps(output.steps)
    setIsHalted(output.halted)

    if (output.transition_taken) {
      setTransitionHistory([...transitionHistory, output.transition_taken])
      if (output.halted) {
        alert('Turing Machine has halted.')
      }
    }
  }

  const handleRun = () => {
    if (!isStarted || !turingMachine) {
      alert('Simulation is not started.')
      return
    }

    if (isHalted) {
      alert('Turing Machine has already halted.')
      return
    }

    const outputs = turingMachine.run()

    if (outputs.length > 0) {
      const lastOutput = outputs[outputs.length - 1]
      setTape(lastOutput.tape)
      setHead(lastOutput.head)
      setCurrentState(lastOutput.current_state)
      setSteps(lastOutput.steps)
      setIsHalted(lastOutput.halted)
      setTransitionHistory([
        ...transitionHistory,
        ...outputs.map((o) => o.transition_taken!).filter(Boolean)
      ])
      if (lastOutput.halted) {
        alert('Turing Machine has halted.')
      }
    }
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  // Effect to update tape display when Turing Machine updates
  useEffect(() => {
    if (turingMachine) {
      setTape(turingMachine.getTape())
      setHead(turingMachine.getHead())
      setCurrentState(turingMachine.getCurrentState())
      setSteps(turingMachine.getSteps())
      setIsHalted(turingMachine.isHalted())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turingMachine])

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

        {/* Conditional Transition History and Input String/TransitionInput */}
        <div className="w-full max-w-6xl mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transition History */}
          {transitionHistory.length > 0 && (
            <div className="order-2 lg:order-1">
              <TransitionHistory transitions={transitionHistory} />
            </div>
          )}

          {/* Input String and Transition Inputs */}
          <div
            className={`order-1 lg:order-2 ${
              transitionHistory.length > 0 ? '' : 'col-span-2'
            }`}
          >
            <InputString
              inputString={inputString}
              setInputString={setInputString}
            />
            <TransitionInput
              transitions={transitions}
              setTransitions={setTransitions}
            />
          </div>
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
