// frontend/src/App.tsx

import React, { useState } from 'react';
import TransitionInputComponent from './components/TransitionInput';
import InputStringComponent from './components/InputString';
import ControlsComponent from './components/Controls';
import TapeDisplay from './components/TapeDisplay';
import StatusDisplay from './components/StatusDisplay';
import api from './api';
import { TransitionInput, StepOutput } from './types';

function App() {
    const [transitions, setTransitions] = useState<TransitionInput[]>([]);
    const [inputString, setInputString] = useState<string>('');
    const [tape, setTape] = useState<string>('');
    const [head, setHead] = useState<number>(0);
    const [currentState, setCurrentState] = useState<string>('-');
    const [steps, setSteps] = useState<number>(0);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isHalted, setIsHalted] = useState<boolean>(false);

    const handleStart = async () => {
        if (transitions.length === 0) {
            alert('Please add at least one transition before starting the simulation.');
            return;
        }

        try {
            await api.post('/initialize', {
                transitions: transitions.map(t => ({
                    current_state: t.current_state,
                    read_symbol: t.read_symbol,
                    write_symbol: t.write_symbol,
                    direction: t.direction,
                    new_state: t.new_state,
                })),
                input_string: inputString || '_',
            });
            // Fetch initial state by performing a step
            const response = await api.post('/step');
            const data: StepOutput = response.data;
            setTape(data.tape);
            setHead(data.head);
            setCurrentState(data.current_state);
            setSteps(data.steps);
            setIsStarted(true);
            setIsHalted(data.halted);
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Error initializing Turing Machine.');
            console.error(error);
        }
    };

    const handleStep = async () => {
        try {
            const response = await api.post('/step');
            const data: StepOutput = response.data;
            setTape(data.tape);
            setHead(data.head);
            setCurrentState(data.current_state);
            setSteps(data.steps);
            setIsHalted(data.halted);
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Error executing step.');
            console.error(error);
        }
    };

    const handleRun = async () => {
        try {
            const response = await api.post('/run');
            const data: StepOutput = response.data;
            setTape(data.tape);
            setHead(data.head);
            setCurrentState(data.current_state);
            setSteps(data.steps);
            setIsHalted(data.halted);
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Error running simulation.');
            console.error(error);
        }
    };

    const handleReset = async () => {
        try {
            await api.post('/reset', { input_string: inputString || '_' });
            setTape(inputString || '_');
            setHead(0);
            setCurrentState('-');
            setSteps(0);
            setIsStarted(false);
            setIsHalted(false);
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Error resetting Turing Machine.');
            console.error(error);
        }
    };

    return (
        <div className="App font-sans bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <h1 className="text-3xl font-bold text-center">Turing Machine Simulator</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Tape and Status */}
                <div className="space-y-6">
                    <TapeDisplay tape={tape} head={head} />
                    <StatusDisplay currentState={currentState} steps={steps} />
                </div>

                {/* Right Column: Transition Input, Input String, Controls */}
                <div className="space-y-6">
                    <TransitionInputComponent transitions={transitions} setTransitions={setTransitions} />
                    <InputStringComponent inputString={inputString} setInputString={setInputString} />
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
                <p>&copy; {new Date().getFullYear()} Turing Machine Simulator. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
