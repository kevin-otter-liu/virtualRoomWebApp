import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import AuthContextI from '../types/contexts/AuthContextI';
import AuthContextProviderI from '../types/contexts/AuthContextProviderI';
import { ErrorContext } from './error-context';

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
    console.log('hihi');
    console.log(import.meta.env.VITE_API_HOST);
    try {
      let res = await axios.post(
        `http://${import.meta.env.VITE_API_HOST}:${
          import.meta.env.VITE_API_PORT
        }/api/virtual-house-project/user/sign-in`,
        {
          username,
          password,
        }
      );

      let { access_token, expires_at } = res.data;
      window.localStorage.setItem('access_token', access_token);
      window.localStorage.setItem('expires_at', expires_at);

      // set a timer to automatically navigate to home page ones access token expires

      // console.log(expiryInMilliseconds)
      // setTimeout(() => {
      //   onLogout()
      // },expiryInMilliseconds)

      setIsLoggedIn(true);

      console.log(
        `login() is called in auth context provider. current auth status: ${isLoggedIn}`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: error.response?.data.message,
          errorTitle: 'Error',
        });
      }
      return;
    }
  };

  const onSignUp = async (username: string, password: string) => {
    try {
      let res = await axios.post(
        `http://${import.meta.env.VITE_API_HOST}:${
          import.meta.env.VITE_API_PORT
        }/api/virtual-house-project/user/sign-up`,
        {
          username,
          password,
        }
      );

      let { access_token, expires_at } = res.data;
      window.localStorage.setItem('access_token', access_token);
      setIsLoggedIn(true);
      console.log(
        `sign up() is called in auth context provider. current auth status: ${isLoggedIn}`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
      let res = await axios.get(
        `http://${import.meta.env.VITE_API_HOST}:${
          import.meta.env.VITE_API_PORT
        }/api/virtual-house-project/user/check-auth`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

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
