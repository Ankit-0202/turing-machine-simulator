// frontend/src/components/TapeDisplay.tsx

import React from 'react';

interface Props {
    tape: string;
    head: number;
}

const TapeDisplay: React.FC<Props> = ({ tape, head }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Tape</h3>
            <div className="flex overflow-x-auto p-4 bg-gray-50 border border-gray-300 rounded">
                {tape.split('').map((symbol, index) => (
                    <div
                        key={index}
                        className={`relative flex items-center justify-center w-12 h-12 border-r border-gray-300 ${
                            index === head ? 'bg-yellow-100' : 'bg-transparent'
                        }`}
                    >
                        <span className="text-lg font-medium">{symbol === '_' ? '□' : symbol}</span>
                        {index === head && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-yellow-500"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TapeDisplay;
