import { useContext } from 'react';
import PrivateContext from '../../context/PrivateProvider';

const usePrivate = () => {
  return useContext(PrivateContext);
};

export default usePrivate;
