import {
    FaSun as SunIcon,
    FaMoon as MoonIcon,
    FaLink as Logo
} from 'react-icons/fa';
import ThemeChangerButton from './ThemeChangerButton';

const NavigationBar = () => {
    return (
        <header className="px-2 py-2 font-semibold tracking-wide border-b md:py-4 md:px-4 bg-light-primary dark:bg-dark-primary text-zinc-50 border-zinc-50 dark:border-light-primary">
            <nav className="container flex justify-between mx-auto md:justify-around">
                <div>
                    <Logo
                        style={{ display: 'inline-block' }}
                        className="mr-2"
                    />
                    URLs Box
                    <span className="hidden ml-2 md:inline-block">
                        | Created By{' '}
                        <a href="https://github.com/DerDjamel">DerDjamel</a>
                    </span>
                </div>
                <div>
                    <ThemeChangerButton></ThemeChangerButton>
                </div>
            </nav>
        </header>
    );
};

export default NavigationBar;
