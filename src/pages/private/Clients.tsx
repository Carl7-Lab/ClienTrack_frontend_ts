import { Box, Flex, Text } from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import { ClientModal, Search, ClientList } from '../../components/private';
import usePrivate from '../../hooks/private/usePrivate';

const Clients = () => {
  const { clients } = usePrivate();

  useCustomTitle('Clientes | ClienTrack');

  if (!clients)
    return (
      <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
        <Text>Aun no se ha agregado clientes</Text>
      </Box>
    );

  return (
    <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Flex
        justifyContent="flex-end"
        my={{ base: '10px', sm: '15px', md: '20px' }}
        mr={{ base: '10px', sm: '20px', md: '30px' }}
      >
        <Search />

        <Box mx="10px">
          <ClientModal />
        </Box>
      </Flex>

      <ClientList />
    </Box>
  );
};

export default Clients;
