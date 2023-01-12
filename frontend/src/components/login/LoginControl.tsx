import { Fragment, useState } from 'react';
import { LoginControlPropI } from '../../types/login/LoginControlPropI';
import { Login } from './Login';
import SignUp from './SignUp';

const LoginControl: React.FC<LoginControlPropI> = (props) => {
  const [focusOnLoginPage, setFocusOnLoginPage] = useState<boolean>(false);
  
  return (
    <Fragment>
      {focusOnLoginPage ? (
        <Login setFocusOnLoginPage={setFocusOnLoginPage}/>
      ) : (
        <SignUp setFocusOnLoginPage={setFocusOnLoginPage} />
      )}
    </Fragment>
  );
};

export default LoginControl;
