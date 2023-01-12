import React, { Fragment, useState } from 'react';
import ReactDom from 'react-dom';
import FixedModalPropI from '../../types/ui/FixedModalPropI';
import FixedBackdrop from './FixedBackdrop';
import FixedModal from './FixedModal';

const LoadingModalOverlay: React.FC<FixedModalPropI> = (props) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const onClick = () => {
    setShowLoading(false);
  };
  return (
    <Fragment>
      {showLoading && (
        <Fragment>
          {ReactDom.createPortal(
            <FixedBackdrop onClick={onClick} />,
            document.getElementById('backdrop-root') as HTMLElement
          )}
          {ReactDom.createPortal(
            <FixedModal
              onClick={onClick}
              title={props.title}
              message={props.message}></FixedModal>,
            document.getElementById('modal-root') as HTMLElement
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoadingModalOverlay;
