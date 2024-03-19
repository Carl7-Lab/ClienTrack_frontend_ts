import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import {
  ClientModal,
  Search,
  ClientList,
  AddressModal,
  Pagination,
} from '../../components/private';

import { addStyle } from '../../components/authFormik/ButtonCustom';
import { ImUserPlus } from 'react-icons/im';

const Clients = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  //numero de clientes por pagina
  const limit = 9;

  const {
    clients,
    isOpenSearchModal,
    totalClients,

    getClients,
    handleResetClient,
    onOpenClientModal,
  } = usePrivate();

  useCustomTitle('Clientes | ClienTrack');

  useEffect(() => {
    getClients({ searchValue, limit: limit, page: currentPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSearchModal, currentPage]);

  if (!clients)
    return (
      <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
        <Text>Aun no se ha agregado clientes</Text>
      </Box>
    );

  return (
    <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Flex
        align="center"
        justify="center"
        my={{ base: '10px', sm: '15px', md: '20px' }}
      >
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />

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

      <Pagination
        limit={limit}
        total={totalClients}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ClientList />
      <Pagination
        limit={limit}
        total={totalClients}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <AddressModal />
      <ClientModal />
    </Box>
  );
};

export default Clients;
