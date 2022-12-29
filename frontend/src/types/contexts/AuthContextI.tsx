interface AuthContextI {
    isLoggedIn:boolean;
    login: (username:string,password:string)=>Promise<void>;
    logout: () => void;
    onSignUp:(username:string,password:string)=>Promise<void>
    checkAuth: ()=>Promise<void>
}

export default AuthContextI;