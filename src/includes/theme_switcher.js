import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const ThemeSwitcher = () => {
    const theme = useSelector(state => state.theme);
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme : dark)");
    const dispatch = useDispatch();

    const setTheme = () => {
        if (theme === 'light') {
            element.classList.add('dark');
            dispatch({ type: 'SET_THEME', payload: 'dark' });
        } else {
            element.classList.remove('dark');
            dispatch({ type: 'SET_THEME', payload: 'light' });
        }
    }

    function onWindowMatch() {
        if (theme === 'dark' || !darkQuery.matches) {
            element.classList.add("dark");
        } else {
            element.classList.remove('dark');
        }
    }

    onWindowMatch();

    return (
        <div
            title="Revenir au menu principal"
            className="flex items-center justify-center bg-primary-50 pt-2 pb-2 cursor-pointer"
            onClick={() => { setTheme() }}>
            {theme === 'dark' ? <FiSun size={20} /> : <FaMoon size={20} />}
        </div>
    )
}

export default ThemeSwitcher;
