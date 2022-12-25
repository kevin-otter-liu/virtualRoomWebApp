import axios from 'axios';
import React, { useState } from 'react';
import AuthContextI from '../types/contexts/AuthContextI';
import AuthContextProviderI from '../types/contexts/AuthContextProviderI';

export const AuthContext = React.createContext<AuthContextI>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderI> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin= (accessToken:string) => {
    window.localStorage.setItem("access_token",accessToken);
    setIsLoggedIn(true);
    console.log('ahere')
  };

  const onLogout = () => {
    localStorage.removeItem("access_token")
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login:onLogin,
        logout:onLogout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
