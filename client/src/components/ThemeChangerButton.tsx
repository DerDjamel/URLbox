import { FC, useEffect, useMemo, useState } from 'react';
import { FaMoon as MoonIcon, FaSun as SunIcon } from 'react-icons/fa';
const ThemeChangerButton: FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(getTheme);
    function getColorScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    function getTheme() {
        // check localstorage if there is a value for the theme key
        if (localStorage.getItem('theme')) {
            // set the theme value to the value of the theme key in the localstorage
            // if the value of theme is null by any chance then assing the theme to what the color scheme of the user is
            const localTheme =
                localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
            return localTheme;
        }
        return getColorScheme();
    }

    function onClickHandler() {
        const htmlElement = window.document.documentElement;
        if (theme === 'dark') {
            setTheme('light');
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', 'light');
        } else {
            setTheme('dark');
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    useEffect(() => {
        const htmlElement = window.document.documentElement;
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        }
    }, []);

    return (
        <button onClick={onClickHandler}>
            {theme === 'light' ? (
                <MoonIcon size={'1.2rem'}></MoonIcon>
            ) : (
                <SunIcon size={'1.2rem'}></SunIcon>
            )}
        </button>
    );
};

export default ThemeChangerButton;
