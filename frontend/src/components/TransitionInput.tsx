import React, { useState } from 'react';
import { TransitionInput } from '../types';

interface Props {
    transitions: TransitionInput[];
    setTransitions: React.Dispatch<React.SetStateAction<TransitionInput[]>>;
}

const TransitionInputComponent: React.FC<Props> = ({ transitions, setTransitions }) => {
    const [transition, setTransition] = useState<TransitionInput>({
        current_state: '',
        read_symbol: '',
        write_symbol: '',
        direction: 'r',
        new_state: '',
        breakpoint: false,
    });

    const [bulkInput, setBulkInput] = useState<string>('');
    const [bulkErrors, setBulkErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let newValue: string | boolean;
        if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        } else {
            newValue = value;
        }

        setTransition(prev => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const addTransition = () => {
        // Validation based on the specified syntax rules (Morphett)
        const { current_state, read_symbol, write_symbol, direction, new_state } = transition;

        if (
            !current_state ||
            !read_symbol ||
            !write_symbol ||
            !direction ||
            !new_state
        ) {
            alert('Please fill in all fields for the transition.');
            return;
        }

        // Symbols cannot contain ';' or whitespace
        const invalidSymbols = /[; ]/;
        if (read_symbol !== '*' && invalidSymbols.test(read_symbol)) {
            alert("Read Symbol cannot contain ';' or whitespace.");
            return;
        }
        if (write_symbol !== '*' && invalidSymbols.test(write_symbol)) {
            alert("Write Symbol cannot contain ';' or whitespace.");
            return;
        }

        // State names cannot contain ';' or whitespace
        const invalidStates = /[; ]/;
        if (invalidStates.test(current_state)) {
            alert("Current State cannot contain ';' or whitespace.");
            return;
        }
        if (invalidStates.test(new_state)) {
            alert("New State cannot contain ';' or whitespace.");
            return;
        }

        // Direction validation is already handled by the select input
        if (
            transitions.some(
                t =>
                    (t.current_state === current_state || t.current_state === '*') &&
                    (t.read_symbol === read_symbol || t.read_symbol === '*')
            )
        ) {
            alert(`Duplicate transition for state-symbol pair: (${current_state}, ${read_symbol})`);
            return;
        }

        setTransitions([...transitions, { ...transition }]);

        // Reset the input fields
        setTransition({
            current_state: '',
            read_symbol: '',
            write_symbol: '',
            direction: 'r',
            new_state: '',
            breakpoint: false,
        });
    };

    const removeTransition = (index: number) => {
        const newTransitions = [...transitions];
        newTransitions.splice(index, 1);
        setTransitions(newTransitions);
    };

    const parseBulkTransitions = () => {
        const lines = bulkInput.split('\n');
        const newTransitions: TransitionInput[] = [];
        const errors: string[] = [];
        const existingKeys = transitions.map(t => `${t.current_state},${t.read_symbol}`);

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine.startsWith(';')) {
                // Ignore empty lines and comments
                return;
            }

            const parts = trimmedLine.split(/\s+/);
            if (parts.length !== 5) {
                errors.push(`Line ${index + 1}: Incorrect number of fields.`);
                return;
            }

            const [current_state, read_symbol, write_symbol, direction, new_state] = parts;

            // Validate direction
            if (!['l', 'r', '*'].includes(direction)) {
                errors.push(`Line ${index + 1}: Invalid direction '${direction}'. Use 'l', 'r', or '*'.`);
                return;
            }

            // Symbols cannot contain ';' or whitespace
            const invalidSymbols = /[; ]/;
            if (read_symbol !== '*' && invalidSymbols.test(read_symbol)) {
                errors.push(`Line ${index + 1}: Read Symbol cannot contain ';' or whitespace.`);
                return;
            }
            if (write_symbol !== '*' && invalidSymbols.test(write_symbol)) {
                errors.push(`Line ${index + 1}: Write Symbol cannot contain ';' or whitespace.`);
                return;
            }

            // State names cannot contain ';' or whitespace
            const invalidStates = /[; ]/;
            if (invalidStates.test(current_state)) {
                errors.push(`Line ${index + 1}: Current State cannot contain ';' or whitespace.`);
                return;
            }
            if (invalidStates.test(new_state)) {
                errors.push(`Line ${index + 1}: New State cannot contain ';' or whitespace.`);
                return;
            }

            // Enforce determinism
            const key = `${current_state},${read_symbol}`;
            if (existingKeys.includes(key) || newTransitions.some(t => `${t.current_state},${t.read_symbol}` === key)) {
                errors.push(`Line ${index + 1}: Duplicate transition for state-symbol pair '${key}'.`);
                return;
            }

            newTransitions.push({
                current_state,
                read_symbol,
                write_symbol,
                direction: direction as 'l' | 'r' | '*',
                new_state,
                breakpoint: false, // Bulk transitions do not include breakpoints
            });
        });

        if (errors.length > 0) {
            setBulkErrors(errors);
            return;
        }

        setTransitions([...transitions, ...newTransitions]);
        setBulkInput('');
        setBulkErrors([]);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Transitions</h3>
            {/* Individual Transition Inputs in One Line */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
                <div className="flex flex-col">
                    <label htmlFor="current_state" className="mb-1 font-medium">Current State</label>
                    <input
                        type="text"
                        id="current_state"
                        name="current_state"
                        placeholder="State"
                        value={transition.current_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="read_symbol" className="mb-1 font-medium">Read Symbol</label>
                    <input
                        type="text"
                        id="read_symbol"
                        name="read_symbol"
                        placeholder="Read"
                        value={transition.read_symbol}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="write_symbol" className="mb-1 font-medium">Write Symbol</label>
                    <input
                        type="text"
                        id="write_symbol"
                        name="write_symbol"
                        placeholder="Write"
                        value={transition.write_symbol}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="direction" className="mb-1 font-medium">Direction</label>
                    <select
                        id="direction"
                        name="direction"
                        value={transition.direction}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="l">Left (l)</option>
                        <option value="r">Right (r)</option>
                        <option value="*">Stay (*)</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="new_state" className="mb-1 font-medium">New State</label>
                    <input
                        type="text"
                        id="new_state"
                        name="new_state"
                        placeholder="New State"
                        value={transition.new_state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col items-center mt-5">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="breakpoint"
                            checked={transition.breakpoint}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Breakpoint
                    </label>
                </div>
                <div className="flex flex-col mt-5">
                    <button
                        onClick={addTransition}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Transition
                    </button>
                </div>
            </div>

            {/* Bulk Transition Input */}
            <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Bulk Add Transitions</h4>
                <textarea
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder={`Enter transitions here, one per line.\nFormat: <current_state> <read_symbol> <write_symbol> <direction> <new_state>\nExample:\nstart 1 0 r carry`}
                    className="w-full h-32 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <button
                    onClick={parseBulkTransitions}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Add Bulk Transitions
                </button>
                {bulkErrors.length > 0 && (
                    <div className="mt-2 text-red-500">
                        <ul className="list-disc list-inside">
                            {bulkErrors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* List of Transitions */}
            <div>
                <h4 className="text-lg font-semibold mb-2">Transition List</h4>
                {transitions.length === 0 ? (
                    <p className="text-gray-500">No transitions added yet.</p>
                ) : (
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {transitions.map((t, index) => (
                            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                <span className="font-medium">
                                    {`${t.current_state} ${t.read_symbol} ${t.write_symbol} ${t.direction} ${t.new_state}`}
                                    {t.breakpoint && <span className="text-red-500 font-bold"> !</span>}
                                </span>
                                <button
                                    onClick={() => removeTransition(index)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

};

export default TransitionInputComponent;
