import PropI from '../PropI';
export interface LoginPropI extends PropI {
  setFocusOnLoginPage: (status: boolean) => void;
  nextPageUrl: string;
}
