import React from 'react';
import ButtonPropI from '../../types/ui/ButtonPropI';

import './Button.css'
const Button:React.FC<ButtonPropI> = (props) =>{
    return(
        <button className='button' type='button' onClick={props.onClickHandler}>{props.children}</button>
    )
}

export default Button;