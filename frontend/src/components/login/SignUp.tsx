import { Fragment, useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { ErrorContext } from '../../context/error-context';
import { SignUpPropI } from '../../types/login/SignUpPropI';
import { Button, ButtonGroup, Typography } from '@mui/material';
import './SignUp.css';
import { CompanyDetails } from '../../types/contexts/AuthContextI';

const SignUp: React.FC<SignUpPropI> = (props) => {
  const authCtx = useContext(AuthContext);
  const errCtx = useContext(ErrorContext);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isCompanySignUp, setIsCompanySignUp] = useState<boolean>(false);
  // company fields
  const companyLocationInput = useRef<HTMLInputElement>(null);
  const companyNameInput = useRef<HTMLInputElement>(null);
  const companyEmailInput = useRef<HTMLInputElement>(null);

  const SignUpHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();

    // check for empty username or password
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

    // check whether its a company sign up
    let companyDetails: CompanyDetails | null = null;

    if (isCompanySignUp) {
      if (
        !companyNameInput.current ||
        !companyLocationInput.current ||
        !companyEmailInput.current
      ) {
        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: 'input email field',
          errorTitle: 'Error',
        });
        return;
      }
      companyDetails = {
        companyName: companyNameInput.current.value,
        companyLocation: companyLocationInput.current.value,
        companyEmail: companyEmailInput.current.value,
      };
    }
    await authCtx.onSignUp(
      emailInput.current.value,
      passwordInput.current.value,
      isCompanySignUp ? companyDetails : null
    );
  };

  const toggleHandler = () => {
    props.setFocusOnLoginPage(true);
  };

  const toggleCompanySignUpHandler = () => [
    setIsCompanySignUp((prev) => {
      return !prev;
    }),
  ];

  return (
    <div className='signUp'>
      <form onSubmit={SignUpHandler}>
        <Typography variant='h1' color='secondary'>
          SIGN UP
        </Typography>
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
          {isCompanySignUp && (
            <Fragment>
              <label htmlFor='companyLocation'>Company Location</label>
              <input
                type='text'
                ref={companyLocationInput}
                id='companyLocation'
                required></input>
              <label htmlFor='companyName'>Company Name</label>
              <input
                type='text'
                ref={companyNameInput}
                id='companyName'
                required></input>
              <label htmlFor='companyEmail'>Company Email</label>
              <input
                type='text'
                ref={companyEmailInput}
                id='companyEmail'
                required></input>
            </Fragment>
          )}
          <div className='control-button'>
            <ButtonGroup
              variant='contained'
              orientation='vertical'
              sx={{ width: '100%' }}
              color='secondary'>
              <Button
                sx={{ fontSize: '1.5rem' }}
                onClick={toggleCompanySignUpHandler}>
                Company sign up
              </Button>
              <Button sx={{ fontSize: '1.5rem' }} type='submit'>
                Create Account
              </Button>
              <Button
                sx={{ fontSize: '1.5rem' }}
                color='info'
                onClick={toggleHandler}
                className='toggle'>
                Login Page {'>>'}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
