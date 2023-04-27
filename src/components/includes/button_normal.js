import React from 'react';

const ButtonNormal = (props) => {
    return (
        <button
            onClick={props.onPress}
            className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6'>
            {props.text}
        </button>
    )
}

export default ButtonNormal;
