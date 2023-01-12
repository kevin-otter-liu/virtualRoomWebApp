import React from 'react';
import FixedBackDropPropI from '../../types/ui/FixedBackDropPropI';
import './FixedBackdrop.css'

const FixedBackdrop:React.FC<FixedBackDropPropI> = (props) =>{
    return(<div onClick={props.onClick} className='backdrop'></div>)
}

export default FixedBackdrop;