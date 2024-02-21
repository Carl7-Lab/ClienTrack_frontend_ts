import { useContext } from 'react';

import PublicContext from '../../context/PublicProvider';

const usePublic = () => {
  return useContext(PublicContext);
};

export default usePublic;
