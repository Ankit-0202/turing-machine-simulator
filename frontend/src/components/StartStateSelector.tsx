// frontend/src/components/StartStateSelector.tsx

import React, { useEffect, useState } from 'react';
import { TransitionInput } from '../types';

interface Props {
    transitions: TransitionInput[];
    startState: string;
    setStartState: React.Dispatch<React.SetStateAction<string>>;
}

const StartStateSelector: React.FC<Props> = ({ transitions, startState, setStartState }) => {
    const [states, setStates] = useState<string[]>([]);

    useEffect(() => {
        const uniqueStates = Array.from(new Set(transitions.map(t => t.current_state)));
        setStates(uniqueStates);
        // If startState is not in the updated list, reset it
        if (!uniqueStates.includes(startState)) {
            setStartState('');
        }
    }, [transitions, startState, setStartState]);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Start State</h3>
            <select
                value={startState}
                onChange={(e) => setStartState(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="" disabled>
                    Select Start State
                </option>
                {states.map((state, index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StartStateSelector;
