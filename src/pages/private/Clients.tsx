import { useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import {
  ClientModal,
  Search,
  ClientList,
  AddressModal,
} from '../../components/private';

import { addStyle } from '../../components/authFormik/ButtonCustom';
import { ImUserPlus } from 'react-icons/im';

const Clients = () => {
  const {
    clients,
    getClients,
    handleResetClient,
    onOpenClientModal,
    isOpenSearchModal,
  } = usePrivate();

  useCustomTitle('Clientes | ClienTrack');

  useEffect(() => {
    getClients({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSearchModal]);

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
          <Button
            leftIcon={<ImUserPlus size="24px" />}
            onClick={() => {
              handleResetClient();
              onOpenClientModal();
            }}
            {...addStyle}
            pl="10px"
            width={{ sm: '42px', md: '180px' }}
          >
            <Text display={{ base: 'none', md: 'block' }}>Agregar Cliente</Text>
          </Button>
        </Box>
      </Flex>

      <AddressModal />
      <ClientModal />
      <ClientList />
    </Box>
  );
};

export default Clients;
