import { Box, Text } from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';

const Home = () => {
  useCustomTitle('Inicio | ClienTrack');

  return (
    <Box minH="60.93vh">
      <Text>-Inicio</Text>
      <Text>--clientes</Text>
      <Text>--ventas</Text>
      <Text>--cobros</Text>
      <Text>--reportes</Text>
    </Box>
  );
};

export default Home;
