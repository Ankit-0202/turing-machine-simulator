// frontend/src/components/StatusDisplay.tsx

import React from 'react';

interface Props {
    currentState: string;
    steps: number;
}

const StatusDisplay: React.FC<Props> = ({ currentState, steps }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Status</h3>
            <div className="space-y-2">
                <p className="text-lg">
                    <span className="font-medium">Current State:</span> <span className="font-bold">{currentState}</span>
                </p>
                <p className="text-lg">
                    <span className="font-medium">Steps Executed:</span> <span className="font-bold">{steps}</span>
                </p>
            </div>
        </div>
    );
};

export default StatusDisplay;
