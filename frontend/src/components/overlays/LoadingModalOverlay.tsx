import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import FixedModalPropI from '../../types/ui/FixedModalPropI';
import FixedBackdrop from './FixedBackdrop';
import FixedModal from './FixedModal';

const LoadingModalOverlay: React.FC<FixedModalPropI> = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <FixedBackdrop />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDom.createPortal(
        <FixedModal
          title={props.title}
          message={props.message}></FixedModal>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default LoadingModalOverlay;
