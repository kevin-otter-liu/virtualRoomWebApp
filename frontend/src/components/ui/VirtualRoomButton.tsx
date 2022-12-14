import React from 'react';
import ButtonPropI from '../../types/ui/ButtonPropI';

import './VirtualRoomButton.css'
const VirtualRoomButton:React.FC<ButtonPropI> = (props) =>{
    return(
        <button className='virtual-button' type='button' onClick={props.onClick}>{props.children}</button>
    )
}

export default VirtualRoomButton;