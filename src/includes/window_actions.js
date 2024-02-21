import { FaMoon } from 'react-icons/fa';
import { FiSun, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { BsDiamond } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
// import JSONPackageFile from './../../../package.json';

const WindowActions = () => {
    const theme = useSelector(state => state.theme);
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme : dark)");
    const dispatch = useDispatch();

    return (
        <div className='border-b border-gray-100 pb-8 mb-3'>
            <div
                title="Quitter Yambi Class SMIS"
                className="flex items-center justify-center cursor-pointer mb-3 mt-5">
                <button className='bg-errror w-7 h-7 flex items-center justify-center rounded-full active:scale-97 border border-errror duration-300 hover:bg-errror'
                    onClick={() => {
                        const { ipcRenderer } = window.require("electron");
                        const ipc = ipcRenderer;
                        ipc.send('closeApp');
                    }}>
                    <FiX size={15} className='text-text-20 ' />
                </button>
            </div>

            <div
                title="Ajuster la fenetre"
                className="flex items-center justify-center cursor-pointer mb-3">
                <button className='bg-gray-100 w-7 h-7 flex items-center justify-center rounded-full active:scale-97 border border-gray-100 dark:border-gray-50 '
                    onClick={() => {
                        const { ipcRenderer } = window.require("electron");
                        const ipc = ipcRenderer;
                        ipc.send('maximizeApp');
                    }}>
                    <BsDiamond size={13} className='text-text-20 ' />
                </button>
            </div>

            <div
                title="Reduire la fenetre"
                className="flex items-center justify-center cursor-pointer">
                <button className='bg-success w-7 h-7 flex items-center justify-center rounded-full active:scale-97  border border-success'
                    onClick={() => {
                        const { ipcRenderer } = window.require("electron");
                        const ipc = ipcRenderer;
                        ipc.send('minimizeApp');
                    }}>
                    <AiOutlineLine size={15} className='text-text-20 ' />
                </button>
            </div>
        </div>
    )
}

export default WindowActions;
