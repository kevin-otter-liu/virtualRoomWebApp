import ax from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContextI, { CompanyDetails } from '../types/contexts/AuthContextI';
import AuthContextProviderI from '../types/contexts/AuthContextProviderI';
import { ErrorContext } from './error-context';

const axios = ax.create({
  baseURL: 'http://' + import.meta.env.VITE_API_HOST,
});

export const AuthContext = React.createContext<AuthContextI>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  onSignUp: async () => {},
  checkAuth: async () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderI> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const errCtx = useContext(ErrorContext);

  const onLogin = async (username: string, password: string) => {
    try {
      let res = await axios.post(`/api/user/sign-in`, {
        username,
        password,
      });

      let { access_token, expires_at, type } = res.data;
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('expires_at', expires_at);

      // set a timer to automatically navigate to home page ones access token expires

      // console.log(expiryInMilliseconds)
      // setTimeout(() => {
      //   onLogout()
      // },expiryInMilliseconds)
      console.log(`user type: ${type}`)

      setIsLoggedIn(true);
      window.localStorage.setItem('user_type', type);


      console.log(
        `login() is called in auth context provider. current auth status: ${isLoggedIn}`
      );
    } catch (error) {
      if (ax.isAxiosError(error)) {
        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: error.response?.data.message,
          errorTitle: 'Error',
        });
      }
      return;
    }
  };

  const onSignUp = async (
    username: string,
    password: string,
    companyDetails: CompanyDetails | null
  ) => {
    try {
      let res = await axios.post(`/api/user/sign-up`, {
        username,
        password,
        companyDetails: companyDetails,
      });

      let { access_token, expires_at, type } = res.data;
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('expires_at', expires_at);
      window.localStorage.setItem('user_type', type);
      

      setIsLoggedIn(true);
      console.log(
        `sign up() is called in auth context provider. current auth status: ${isLoggedIn}`
      );
    } catch (error) {
      if (ax.isAxiosError(error)) {
        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: error.response?.data.message,
          errorTitle: 'Error',
        });
      }

      return;
    }
  };

  const onLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    console.log('logout');
  };

  const checkAuth = async () => {
    let access_token = localStorage.getItem('access_token');
    console.log('check authmethod called');
    if (!access_token) {
      console.log('no access token found');
      setIsLoggedIn(false);
      console.log(`user is signed out cos access_token is missing`);
      return;
    }

    try {
      let res = await axios.get(`/api/user/check-auth`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (res.status === 200) {
        setIsLoggedIn(true);
        return;
      }

      setIsLoggedIn(false);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: onLogin,
        logout: onLogout,
        onSignUp: onSignUp,
        checkAuth: checkAuth,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
