import React from 'react'
import { FaCircle } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const UserOpen = () => {

  const dispatch = useDispatch();
  const user_data = useSelector(state => state.user_data);
  const user_poste = useSelector(state => state.user_poste);

  const logout_session = () => {
    dispatch({ type: "SET_REDIRECTTOREFERRER", payload: false });
    dispatch({ type: "SET_USER_OPEN", payload: false });
    sessionStorage.removeItem("assemble_user_data");
    sessionStorage.setItem("classeYambiSMIS", []);
    sessionStorage.clear();
  }

  return (
    <div>
      <div onClick={() => { dispatch({ type: "SET_USER_OPEN", payload: false }); }} className="main-div-modal"></div>
      <div className='relative w-auto my-6 mx-auto max-w-md bg-background-50 p-2 dark:bg-background-20 rounded-xl items-center justify-center text-center'>
        <div className='bg-background-100 dark:bg-background-20 rounded-lg pt-8 pb-8'>
          <div className="text-center justify-center items-center">
            <div className='flex justify-center'>
              <div
                onClick={() => { }}
                className="border self-center border-gray-50 dark:border-gray-20 ml-4 rounded-full p-7 flex justify-center items-center">
                <FiUser className=" text-text-100 dark:text-background-100" size={80} />
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <strong>
              {user_poste.toUpperCase()}
            </strong>
            <br />
            <span className="text-gray-100">
              {user_data.user_name}
            </span>
          </div>



        </div><button onClick={logout_session} className='nodrag rounded-md w-full mt-2 pl-6 pr-6  duration-300 dark:text-text-20 hover:text-text-20 py-3 duration-300 hover:bg-error'>
          Quitter la session
        </button>
      </div>
    </div>
  )
}

export default UserOpen;

