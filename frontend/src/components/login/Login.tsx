import axios from 'axios';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/auth-context';
import { ErrorContext } from '../../context/error-context';
import { LoginPropI } from '../../types/login/LoginPropI';
import './Login.css';
export const Login: React.FC<LoginPropI> = (props) => {

  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const loginHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();

    if (!emailInput.current) {
      errCtx.setErrorParamsContext({
        isError: true,
        errorMessage: 'input email field',
        errorTitle: 'Error',
      });
      return;
    }

    if (!passwordInput.current) {
      errCtx.setErrorParamsContext({
        isError: true,
        errorMessage: 'input password field',
        errorTitle: 'Error',
      });
      return;
    }

    await authCtx.login(emailInput.current.value, passwordInput.current.value);
  };
  const toggleHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    props.setFocusOnLoginPage(false);
  };

  return (
    <div>
      <form className='login' onSubmit={loginHandler}>
        <div className='control'>
          <label htmlFor='username'>Username</label>
          <input
            type='username'
            ref={emailInput}
            id='username'
            required></input>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            ref={passwordInput}
            id='password'
            required></input>
        </div>
        <div className='actions'>
          <button type='submit'>Login</button>
          <button className='toggle' onClick={toggleHandler}>
            Sign Up Page
          </button>
        </div>
      </form>
    </div>
  );
};
