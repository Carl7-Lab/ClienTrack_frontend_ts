import { createContext, useEffect, useState } from 'react';
import clientAxios from '../config/clientAxios';
import {
  AuthProps,
  PublicContextProps,
  PublicProviderProps,
} from '../interface/PublicProps';

const PublicContext = createContext<PublicContextProps>(
  {} as PublicContextProps,
);

export const PublicProvider = ({ children }: PublicProviderProps) => {
  const [auth, setAuth] = useState<AuthProps>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios('/users/profile', config);
        setAuth(data.data.user);
      } catch (error) {
        setAuth({});
      }

      setIsLoading(false);
    };

    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetAuth = () => {
    setAuth({});
  };

  return (
    <PublicContext.Provider value={{ auth, isLoading, setAuth, resetAuth }}>
      {children}
    </PublicContext.Provider>
  );
};

export default PublicContext;
