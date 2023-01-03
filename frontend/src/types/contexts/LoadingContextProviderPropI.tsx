import { ReactNode } from 'react';
import PropI from '../PropI'
import LoadingContextI from './LoadingContextI'
export default interface LoadingContextProviderPropI extends PropI{
    children: ReactNode;
    value?: LoadingContextI;
}