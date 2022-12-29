import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContextI from '../types/contexts/AuthContextI';
import AuthContextProviderI from '../types/contexts/AuthContextProviderI';
import { ErrorContext } from './error-context';

export const AuthContext = React.createContext<AuthContextI>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  onSignUp:async()=>{},
  checkAuth:async()=>{}
});

export const AuthContextProvider: React.FC<AuthContextProviderI> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const errCtx = useContext(ErrorContext)

  const onLogin= async (username:string,password:string) => {
    try {
      let res = await axios.post('http://localhost:3000/user/sign-in',{
        username,
        password
      })

      let {access_token, expires_at} = res.data;
      window.localStorage.setItem("access_token",access_token);
      setIsLoggedIn(true);
      console.log(`login function called.`)
    } 
    catch (error) {
      if (axios.isAxiosError(error)) {

        console.log(error.response?.data.message);
        errCtx.setErrorParamsContext({
          isError: true,
          errorMessage: error.response?.data.message,
          errorTitle: 'Error',
        });
      }
      return
    }
  };

  const onSignUp= async (username:string,password:string)=>{
    try {
      let res = await axios.post('http://localhost:3000/user/sign-up', {
        username,
        password,
      });

      let { access_token, expires_at } = res.data
      window.localStorage.setItem("access_token",access_token);
      setIsLoggedIn(true);
      console.log(`sign up function called.`)
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

  }

  const onLogout = () => {
    localStorage.removeItem("access_token")
    setIsLoggedIn(false);
    console.log(`user is logged out`)
  };

  const checkAuth =async ()=>{
    let access_token = localStorage.getItem("access_token")
    console.log('check authmethod called')
    console.log(access_token)
    if(!access_token){
      console.log('no access token found')
      setIsLoggedIn(false)
      return
    }
    let res = await axios.get('http://localhost:3000/user/check-auth',{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    res.status=== 200?setIsLoggedIn(true):setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login:onLogin,
        logout:onLogout,
        onSignUp:onSignUp,
        checkAuth:checkAuth
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
