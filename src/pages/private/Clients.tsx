import { Box, Text } from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';

const Clients = () => {
  useCustomTitle('Clientes | ClienTrack');

  return (
    <Box minH="60.93vh">
      <Text>Clients</Text>
    </Box>
  );
};

export default Clients;
