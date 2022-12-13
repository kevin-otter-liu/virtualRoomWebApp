import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import ModalOverlayPropI from '../../types/ui/ClickableModalOverlayPropI';
import Backdrop from './ClickableBackdrop';
import Modal from './ClickableModal';

const ModalOverlay: React.FC<ModalOverlayPropI> = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClick={props.onConfirm}></Backdrop>,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDom.createPortal(
        <Modal
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}></Modal>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default ModalOverlay;
