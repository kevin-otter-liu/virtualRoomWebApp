import './Root.css';
import LoadingModalOverlay from '../components/overlays/LoadingModalOverlay';
import { loadingContext } from '../context/loading-context';
import { ErrorContext } from '../context/error-context';
import { Fragment, useContext } from 'react';
import FixedErrorModal from '../components/overlays/FixedErrorModal';
import { AuthContext } from '../context/auth-context';
import LoginControl from '../components/login/LoginControl';
function Root() {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);

  return (
    <Fragment>
      {errCtx.isError && <FixedErrorModal title={errCtx.errorTitle} message={errCtx.errorMessage} onClick={errCtx.onCloseErrorMessage}/>}
      {!authCtx.isLoggedIn && <LoginControl nextPageUrl='/options'/>}
    </Fragment>
  );
}

export default Root;
