import { createContext, useEffect, useState } from 'react';
import clientAxios from '../config/clientAxios';
import {
  AuthProps,
  PublicContextProps,
  PublicProviderProps,
} from '../interface/PublicProps';

const PublicContext = createContext<PublicContextProps>({} as PublicContextProps);

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
          'Content-Type': 'aplication/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios('/users/profile', config);
        setAuth(data.data.user);
        // setIsAuth(!!token);
      } catch (error) {
        setAuth({});
      }

      setIsLoading(false);
    };

    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PublicContext.Provider value={{ auth, isLoading, setAuth }}>
      {children}
    </PublicContext.Provider>
  );
};

export default PublicContext;
