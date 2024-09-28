import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        // Retrieve the user's theme preference from localStorage or default to system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Toggle Dark Mode"
        >
            {isDarkMode ? (
                // Sun Icon for Light Mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12.34h-1m15.36 4.95l-.707-.707M6.343 6.343l-.707-.707m12.02 12.02l-.707-.707M6.343 17.657l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                </svg>
            ) : (
                // Moon Icon for Dark Mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" >
                    <path d="M17.293 13.293a8 8 0 01-11.586-11.586 8.001 8.001 0 1011.586 11.586z" />
                </svg>
            )}
        </button>
    );
};

export default DarkModeToggle;
