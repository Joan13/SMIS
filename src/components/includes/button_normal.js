import React from 'react';

const ButtonNormal=(props)=>{
    return(
        <button 
        onClick={props.onPress} 
        style={props.style}
        className="button-primary">{props.text}</button> 
    )
}

export default ButtonNormal;
