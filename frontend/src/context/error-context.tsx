import { createContext, useState } from 'react';
import ErrorContextI, { ErrorState } from '../types/contexts/ErrorContextI';
import ErrorContextProviderPropI from '../types/contexts/ErrorContextPropI';

const initialContext: ErrorContextI = {
  isError: false,
  errorMessage: '',
  errorTitle: '',
  setErrorParamsContext: () => {},
  onCloseErrorMessage: () => {},
};

export const ErrorContext = createContext<ErrorContextI>(initialContext);

export const ErrorContextProvider: React.FC<ErrorContextProviderPropI> = (
  props
) => {
  const [errorParams, setErrorParams] = useState<ErrorState>({
    isError: false,
    errorMessage: '',
    errorTitle: '',
  });

  const setErrorParamsContext = (newErrorState: ErrorState): void => {
    setErrorParams((state) => {
      return newErrorState;
    });
  };

  const onCloseErrorMessage = () => {
    setErrorParamsContext({
      isError: false,
      errorMessage: '',
      errorTitle: '',
    } as ErrorState);
  };

  return (
    <ErrorContext.Provider
      value={{
        ...errorParams,
        setErrorParamsContext,
        onCloseErrorMessage,
      }}>
      {props.children}
    </ErrorContext.Provider>
  );
};
