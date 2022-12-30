import axios, { AxiosError } from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { ErrorContext } from '../../context/error-context';
import { SignUpPropI } from '../../types/login/SignUpPropI';
import './SignUp.css';

const SignUp: React.FC<SignUpPropI> = (props) => {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const SignUpHandler: React.FormEventHandler = async (event) => {
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

    await authCtx.onSignUp(emailInput.current.value,passwordInput.current.value);
  };

  const toggleHandler = () => {
    props.setFocusOnLoginPage(true);
  };

  return (
    <div>
      <form className='signUp' onSubmit={SignUpHandler}>
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
          <button type='submit'>Create Account</button>
          <button onClick={toggleHandler} className='toggle'>
            Login Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
