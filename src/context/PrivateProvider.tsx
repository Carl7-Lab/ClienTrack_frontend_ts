import { createContext } from 'react';
import { PrivateProviderProps } from '../interface/PrivateProps';

const PrivateContext = createContext({});

export const PrivateProvider = ({ children }: PrivateProviderProps) => {
  return <PrivateContext.Provider value={{}}>{children}</PrivateContext.Provider>;
};

export default PrivateContext;
