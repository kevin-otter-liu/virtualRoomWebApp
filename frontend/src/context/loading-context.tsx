import { createContext, useContext, useState } from 'react';
import LoadingContextI from '../types/contexts/LoadingContextI';
import LoadingContextProviderPropI from '../types/contexts/providers/LoadingContextProviderPropI';

const initialContext: LoadingContextI = {
  isLoading: false,
  setIsLoadingContext: (status) => {},
};

export const loadingContext = createContext<LoadingContextI>(initialContext);

export const LoadingContextProvider: React.FC<LoadingContextProviderPropI> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(false);

  const setIsLoadingContext = (status: boolean): void => {
    setIsLoading(status);
  };

  return (
    <loadingContext.Provider
      value={{
        isLoading,
        setIsLoadingContext,
      }}>
      {props.children}
    </loadingContext.Provider>
  );
};
