interface AuthContextI {
    isLoggedIn:boolean;
    loginHandler: () => void;
    logoutHandler: () => void;
}

export default AuthContextI;