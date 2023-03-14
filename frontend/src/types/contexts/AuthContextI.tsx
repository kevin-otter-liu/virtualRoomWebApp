export type CompanyDetails = {
  companyName: string;
  companyEmail: string;
  companyLocation: string;
};
interface AuthContextI {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  onSignUp: (
    username: string,
    password: string,
    companyDetails: CompanyDetails | null
  ) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export default AuthContextI;
