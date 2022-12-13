import React from 'react';
import './FixedModal.css';
import FixedModalPropI from '../../types/ui/FixedModalPropI';
import LoadingAnimation from '../ui/LoadingAnimation'


const FixedModal: React.FC<FixedModalPropI> = (props) => {
  return (
      <div className='modal'>
        <header className='header'>
          <h2 className='header h2'>{props.title}</h2>
        </header>
        <div className='content'>
          <p>{props.message}</p>
          <LoadingAnimation/>
          <div className='content loading'></div>
        </div>
      </div>
  );
};

export default FixedModal;
