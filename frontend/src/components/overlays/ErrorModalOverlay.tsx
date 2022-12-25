import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import FixedModalPropI from '../../types/ui/FixedModalPropI';
import FixedBackdrop from './FixedBackdrop';
import FixedErrorModal from './FixedErrorModal';

const ErrorModalOverlay: React.FC<FixedModalPropI> = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <FixedBackdrop />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDom.createPortal(
        <FixedErrorModal
          title={props.title}
          message={props.message}></FixedErrorModal>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </Fragment>
  );
};

export default ErrorModalOverlay;
