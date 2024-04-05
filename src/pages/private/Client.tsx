import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Skeleton, Text, VStack } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import {
  AddressModal,
  ClientCard,
  ClientKardex,
  ClientModal,
  CollectionModal,
  SaleModal,
} from '../../components/private';

import { addStyle } from '../../components/authFormik/ButtonCustom';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { MdPayments } from 'react-icons/md';

const Client = () => {
  const { id } = useParams();

  const {
    client,
    firstMoveDate,
    loadingClient,
    getClient,
    onOpenSaleModal,
    onOpenCollectionModal,
  } = usePrivate();

  useEffect(() => {
    if (id !== undefined) {
      getClient(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useCustomTitle(
    `Infomación ${client.name + ' ' + client.lastName} ${client.alias ? ' (' + client.alias + ')' : ''} | VenCo`,
  );

  return (
    <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Box mt="20px" mx={{ base: '10px', sm: '20px', md: '30px' }}>
        <ClientCard client={client} loading={loadingClient} />
      </Box>

      <Box mx={{ base: '10px', sm: '20px', md: '30px', lg: '10%' }}>
        <Flex my="20px" justifyContent="flex-end">
          <Skeleton isLoaded={!loadingClient} mx="3px">
            <Button
              leftIcon={<BiSolidPurchaseTag size="24px" />}
              onClick={() => {
                onOpenSaleModal();
              }}
              mx="3px"
              width={{ sm: '42px', md: '180px' }}
              {...addStyle}
              pl="10px"
            >
              <Text display={{ base: 'none', md: 'block' }}>Agregar Venta</Text>
            </Button>
          </Skeleton>

          <Skeleton isLoaded={!loadingClient} mx="3px">
            <Button
              leftIcon={<MdPayments size="24px" />}
              onClick={() => {
                onOpenCollectionModal();
              }}
              {...addStyle}
              mx="3px"
              width={{ sm: '42px', md: '180px' }}
              pl="10px"
            >
              <Text display={{ base: 'none', md: 'block' }}>Agregar Cobro</Text>
            </Button>
          </Skeleton>

          <SaleModal />
          <CollectionModal />
        </Flex>

        <Box display="block">
          <VStack>{firstMoveDate && id && <ClientKardex id={id} />}</VStack>
        </Box>
      </Box>

      <AddressModal />
      <ClientModal />
    </Box>
  );
};

export default Client;
