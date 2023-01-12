import React from 'react';
import ButtonPropI from '../../types/ui/ButtonPropI';

import './Button.css';
const Button: React.FC<ButtonPropI> = (props) => {
  return (
    <button
      className='button'
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
