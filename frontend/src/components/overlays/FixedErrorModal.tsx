import React, { Fragment, useState } from 'react';
import './FixedModal.css';
import FixedModalPropI from '../../types/ui/FixedModalPropI';
import Button from '../ui/Button';

const FixedModal: React.FC<FixedModalPropI> = (props) => {
  return (
    <Fragment>
      <div className='modal'>
        <header className='header'>
          <h2 className='header h2'>{props.title}</h2>
        </header>
        <div className='content'>
          <p>{props.message}</p>
          <div className='content loading'></div>
        </div>
        <Button type='button' onClick={props.onClick}>
          Exit
        </Button>
      </div>
    </Fragment>
  );
};

export default FixedModal;
