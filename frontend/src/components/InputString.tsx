// frontend/src/components/InputString.tsx

import React from 'react';

interface Props {
    inputString: string;
    setInputString: React.Dispatch<React.SetStateAction<string>>;
}

const InputStringComponent: React.FC<Props> = ({ inputString, setInputString }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Input String</h3>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Enter input string (e.g., 0110)"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default InputStringComponent;
