import React from 'react';

const ButtonNormal = (props) => {

    const { nobg } = props;

    return (
        <button
            onClick={props.onPress}
            className={`nodrag ${nobg ? "bg-background-100" : "bg-primary-100"} rounded-xl ${nobg ? "text-text-50" : "text-text-20"} py-3 hover:scale-105 active:scale-100 duration-300 ${nobg ? "hover:bg-background-100" : "hover:bg-primary-50"} shadow-md pl-6 pr-6`}>
            {props.text}
        </button>
    )
}

export default ButtonNormal;
