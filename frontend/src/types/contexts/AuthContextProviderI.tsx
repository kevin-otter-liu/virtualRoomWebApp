interface AuthContextProviderI {
    children: React.ReactNode;
    isLoggedIn:boolean;
    loginHandler: () => void;
    logoutHandler: () => void;
}

export default AuthContextProviderI;