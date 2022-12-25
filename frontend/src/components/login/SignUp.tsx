import axios, { AxiosError } from 'axios';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/auth-context';
import { ErrorContext } from '../../context/error-context';
import { SignUpPropI } from '../../types/login/SignUpPropI';
import './SignUp.css'


const SignUp: React.FC<SignUpPropI> = (props) => {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

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

    let res: any;
    try {
        res = await axios.post('http://localhost:3000/user/sign-up', {
        username: emailInput.current.value,
        password: passwordInput.current.value,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {

        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: error.response?.data.message,
          errorTitle: 'Error',
        });
      }

      return
    }

    let { access_token, expires_at } = res.data;
    console.log('it is run');
    authCtx.login(access_token);
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
