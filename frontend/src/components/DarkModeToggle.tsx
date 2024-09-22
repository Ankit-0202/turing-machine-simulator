// frontend/src/components/DarkModeToggle.tsx

import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
