import React, { useContext, useState } from 'react';
import AuthContextI from '../types/contexts/AuthContextI';
import AuthContextProviderI from '../types/contexts/AuthContextProviderI';

const AuthContext = React.createContext<AuthContextI>({
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
});

const AuthContextProvider: React.FC<AuthContextProviderI> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;