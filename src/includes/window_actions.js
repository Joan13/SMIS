import { FaMoon } from 'react-icons/fa';
import { FiSun, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {BsDiamond} from 'react-icons/bs';
import {AiOutlineLine} from 'react-icons/ai';

const WindowActions = () => {
    const theme = useSelector(state => state.theme);
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme : dark)");
    const dispatch = useDispatch();

    return (
       <div className='border-b border-gray-50 mb-8 pb-8'>
         <div
            title="Quitter Yambi Class SMIS"
            className="flex items-center justify-center cursor-pointer mb-3 mt-5">
                <button className='bg-error w-6 h-6 flex items-center justify-center rounded-2xl hover:scale-100 active:scale-100  border border-error duration-300 hover:bg-error'
                onClick={() => {  }}>
            <FiX size={10} className='text-text-20 ' />
            </button>
        </div>

        <div
            title="Ajuster la fenetre"
            className="flex items-center justify-center cursor-pointer mb-3">
                <button className='bg-gray-100 w-6 h-6 flex items-center justify-center rounded-2xl border border-gray-100 dark:border-gray-50 '
                onClick={() => {  }}>
            <BsDiamond size={10} className='text-text-20 ' />
            </button>
        </div>

        <div
            title="Reduire la fenetre"
            className="flex items-center justify-center cursor-pointer">
                <button className='bg-success w-6 h-6 flex items-center justify-center rounded-2xl  border border-success'
                onClick={() => {  }}>
            <AiOutlineLine size={10} className='text-text-20 ' />
            </button>
        </div>
       </div>
    )
}

export default WindowActions;