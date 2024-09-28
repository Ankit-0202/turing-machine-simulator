import React from 'react';

interface Props {
    currentState: string;
    steps: number;
}

const StatusDisplay: React.FC<Props> = ({ currentState, steps }) => {
    return (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Status</h3>
            <div className="flex flex-col space-y-2">
                <div>
                    <span className="font-medium">Current State:</span> {currentState}
                </div>
                <div>
                    <span className="font-medium">Steps Executed:</span> {steps}
                </div>
            </div>
        </div>
    );
};

export default StatusDisplay;
