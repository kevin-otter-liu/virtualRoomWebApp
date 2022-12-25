interface AuthContextI {
    isLoggedIn:boolean;
    login: (access_token:string) => void;
    logout: () => void;
}

export default AuthContextI;