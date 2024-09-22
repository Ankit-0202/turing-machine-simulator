// frontend/src/components/Controls.tsx

import React from 'react';

interface Props {
    onStart: () => void;
    onStep: () => void;
    onRun: () => void;
    onReset: () => void;
    isStarted: boolean;
    isHalted: boolean;
}

const ControlsComponent: React.FC<Props> = ({ onStart, onStep, onRun, onReset, isStarted, isHalted }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Controls</h3>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={onStart}
                    disabled={isStarted}
                    className={`flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isStarted ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    Start Simulation
                </button>
                <button
                    onClick={onStep}
                    disabled={!isStarted || isHalted}
                    className={`flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        !isStarted || isHalted ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    Step
                </button>
                <button
                    onClick={onRun}
                    disabled={!isStarted || isHalted}
                    className={`flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        !isStarted || isHalted ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    Run
                </button>
                <button
                    onClick={onReset}
                    disabled={!isStarted}
                    className={`flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !isStarted ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ControlsComponent;
