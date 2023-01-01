/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-primary': '#60a5fa',
                'dark-primary': '#27272a'
            }
        }
    },
    plugins: []
};
