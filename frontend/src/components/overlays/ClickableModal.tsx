import React from 'react';
import Button from '../ui/Button';
import './ClickableModal.css';
import ModalPropI from '../../types/ui/ClickableModalPropI';


const Modal: React.FC<ModalPropI> = (props) => {
  return (
      <div className='modal'>
        <header className='header'>
          <h2 className='header h2'>{props.title}</h2>
        </header>
        <div className='content'>
          <p>{props.message}</p>
        </div>
        <footer className='actions'>
          <Button type='button' onClick={props.onConfirm}>Okay</Button>
        </footer>
      </div>
  );
};

export default Modal;
