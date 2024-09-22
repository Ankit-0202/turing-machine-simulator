// frontend/src/components/TapeDisplay.tsx

import React from 'react';

interface Props {
    tape: string;
    head: number;
}

const TapeDisplay: React.FC<Props> = ({ tape, head }) => {
    const tapeArray = tape.split('');

    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Tape</h3>
            <div className="flex items-center justify-start space-x-2 overflow-x-auto">
                {tapeArray.map((symbol, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center border ${
                            index === head ? 'bg-yellow-200 border-yellow-500 dark:bg-yellow-600' : 'bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                        } rounded`}
                    >
                        {symbol}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TapeDisplay;
