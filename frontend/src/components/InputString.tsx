// frontend/src/components/InputString.tsx

import React from 'react';

interface Props {
    inputString: string;
    setInputString: React.Dispatch<React.SetStateAction<string>>;
}

const InputStringComponent: React.FC<Props> = ({ inputString, setInputString }) => {
    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Input String</h3>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Enter input string (use '*' to set head position)"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Use '*' to indicate the starting head position. Example: '111*'
            </p>
        </div>
    );
};

export default InputStringComponent;
