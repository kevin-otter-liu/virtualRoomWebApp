import './Root.css';
import { ErrorContext } from '../context/error-context';
import { Fragment, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import LoginControl from '../components/login/LoginControl';
import OptionsPage from './OptionsPage';
import ErrorModalOverlay from '../components/overlays/ErrorModalOverlay';
import NavigationBar from '../components/displays/NavigationBar';

function Root() {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);

  useEffect(() => {
    const checkAuthRefresh = async () => {
      // console.log('checking authorization');
      await authCtx.checkAuth();
    };
    checkAuthRefresh();
  });

  return (
    <Fragment>
      {/* for displaying error modals */}
      <ErrorModalOverlay
        title={errCtx.errorTitle}
        message={errCtx.errorMessage}
      />
      {authCtx.isLoggedIn && <NavigationBar />}
      {!authCtx.isLoggedIn ? <LoginControl /> : <OptionsPage />}
    </Fragment>
  );
}

export default Root;
