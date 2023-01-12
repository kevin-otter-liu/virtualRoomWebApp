import React, { Fragment, useContext, useState } from 'react';
import ReactDom from 'react-dom';
import { ErrorContext } from '../../context/error-context';
import ErrorModalOverlayPropI from '../../types/ui/ErrorModalOverlayPropI';
import FixedBackdrop from './FixedBackdrop';
import FixedErrorModal from './FixedErrorModal';

const ErrorModalOverlay: React.FC<ErrorModalOverlayPropI> = (props) => {
  const errCtx = useContext(ErrorContext);
  const onClick = () => {
    errCtx.onCloseErrorMessage()
  };
  return (
    <Fragment>
      {errCtx.isError && (
        <Fragment>
          {ReactDom.createPortal(
            <FixedBackdrop onClick={onClick}/>,
            document.getElementById('backdrop-root') as HTMLElement
          )}
          {ReactDom.createPortal(
            <FixedErrorModal
              title={props.title}
              message={props.message}
              onClick={onClick}></FixedErrorModal>,
            document.getElementById('modal-root') as HTMLElement
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ErrorModalOverlay;
