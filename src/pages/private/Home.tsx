import { Box, Text } from '@chakra-ui/react';

import useCustomTitle from '../../hooks/public/useCustomTitle';

const Home = () => {
  useCustomTitle('Inicio | ClienTrack');

  return (
    <Box minH="60.93vh">
      <Text>-Inicio</Text>
      <Text>-clientes</Text>
      <Text>-movimientos</Text>
    </Box>
  );
};

export default Home;
