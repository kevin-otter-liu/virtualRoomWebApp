export type ErrorState = {
    isError:boolean,
    errorMessage:string,
    errorTitle:string
}

export default interface ErrorContextI{
    isError:boolean,
    errorMessage:string,
    errorTitle:string,
    setErrorParamsContext: (errorParams: ErrorState) => void;
    onCloseErrorMessage: ()=> void;
}