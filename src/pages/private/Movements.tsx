import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import useCustomTitle from '../../hooks/public/useCustomTitle';
import usePrivate from '../../hooks/private/usePrivate';
import {
  CollectionList,
  CollectionModal,
  SaleList,
  SaleModal,
} from '../../components/private';

const Movements = () => {
  useCustomTitle('Movimientos | ClienTrack');
  const { sales, collections, getSales, getCollections } = usePrivate();

  useEffect(() => {
    getSales({});
    getCollections({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box minH="60.93vh">
      <Box display={{ md: 'block', lg: 'flex' }}>
        <SaleList sales={sales} />
        <CollectionList collections={collections} />
      </Box>
      <SaleModal />
      <CollectionModal />
    </Box>
  );
};

export default Movements;
