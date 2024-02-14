import { Dispatch, ReactNode } from 'react';

export interface PublicProviderProps {
  children?: ReactNode;
}

export interface AuthProps {
  _id?: string;
  email?: string;
  userName?: string;
}

export type PublicContextProps = {
  auth: AuthProps;
  isLoading: boolean;
  setAuth: Dispatch<React.SetStateAction<object>>;
};
