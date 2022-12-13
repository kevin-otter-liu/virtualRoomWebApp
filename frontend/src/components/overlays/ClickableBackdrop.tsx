import React from 'react';
import BackdropPropI from '../../types/ui/ClickableBackdropPropI'
import './ClickableBackdrop.css'

const Backdrop:React.FC<BackdropPropI> = (props) =>{
    return(<div className='backdrop' onClick={props.onClick}></div>)
}

export default Backdrop;