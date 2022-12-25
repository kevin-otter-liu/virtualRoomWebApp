import './Root.css';
import LoadingModalOverlay from '../components/overlays/LoadingModalOverlay';

import { loadingContext } from '../context/loading-context';
import { ErrorContext } from '../context/error-context';
import VirtualRoomDescriptionBox from '../components/virtual-room/VirtualRoomDescriptionBox';
import { Fragment, useContext } from 'react';
import FixedErrorModal from '../components/overlays/FixedErrorModal';
import Button from '../components/ui/Button';
import { Login } from '../components/login/Login';
import { AuthContext } from '../context/auth-context';
import LoginControl from '../components/login/LoginControl';
function Root() {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);

  const onLogout = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      {errCtx.isError && <FixedErrorModal title={errCtx.errorTitle} message={errCtx.errorMessage} onClick={errCtx.onCloseErrorMessage}/>}
      {!authCtx.isLoggedIn && <LoginControl/>}
      {authCtx.isLoggedIn && (
        <Button type='button' onClick={onLogout}>
          logout
        </Button>
      )}
      {authCtx.isLoggedIn && (
        <VirtualRoomDescriptionBox
          imageSrc='./assets/img/4.jpg'
          description='Virtual Room'
        />
      )}
    </Fragment>
  );
}

export default Root;
