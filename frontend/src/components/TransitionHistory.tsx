import React from 'react';
import { TransitionTaken } from '../types';

interface Props {
    transitions: TransitionTaken[];
}

const TransitionHistory: React.FC<Props> = ({ transitions }) => {
    if (transitions.length === 0) {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">Transition History</h3>
                <p className="text-gray-500">No transitions traversed yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Transition History</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current State</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Read Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Write Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direction</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New State</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakpoint</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transitions.map((t, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.step}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.current_state}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.read_symbol}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.write_symbol}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.direction.toUpperCase()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.new_state}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {t.breakpoint ? <span className="text-red-500 font-bold">Yes</span> : 'No'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default TransitionHistory;
