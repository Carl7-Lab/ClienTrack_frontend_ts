import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

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

  if (clients.length === 0) {
    return (
      <Center minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
        <Card variant="elevated">
          <CardHeader pb="10px">
            <Heading textAlign="center" size="md">
              No hay clientes aquí todavía.
            </Heading>
          </CardHeader>
          <CardBody pt="10px">
            <Text fontSize="lg" textAlign="center">
              ¿Por qué no empiezas a agregar alguno?
            </Text>

            <Button
              leftIcon={<ImUserPlus size="24px" />}
              onClick={() => {
                handleResetClient();
                onOpenClientModal();
              }}
              {...addStyle}
              mt="20px"
              width="100%"
            >
              <Text>Agregar Cliente</Text>
            </Button>
          </CardBody>
        </Card>
        <ClientModal />
      </Center>
    );
  }

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
