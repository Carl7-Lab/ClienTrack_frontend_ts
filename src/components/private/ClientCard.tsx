import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  // useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import { ClientPropsBD } from '../../interface/PrivateProps';
import AddressList from './AddressList';

import { BiSolidLocationPlus, BiSolidPurchaseTag } from 'react-icons/bi';
import { addStyle, updateStyle } from '../authFormik/ButtonCustom';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { MdPayments } from 'react-icons/md';
import { CollectionModal, SaleModal } from '.';

const ClientCard = ({ client }: { client: ClientPropsBD }) => {
  const {
    onOpenClientModal,
    handleClient,
    handleResetAddress,
    onOpenAddressModal,
    onOpenSaleModal,
    onOpenCollectionModal,
    pathname,
  } = usePrivate();

  const [more, setMore] = useState(false);

  const handleMore = () => {
    setMore(!more);
  };

  const addressesSection = () => (
    <Box>
      <Heading mt="10px" size="md" display="flex" alignItems="center">
        Direcciones:
        <Button
          leftIcon={<BiSolidLocationPlus size="25px" />}
          onClick={() => {
            onOpenAddressModal();
            handleResetAddress();
            handleClient(client);
          }}
          {...addStyle}
          mx="5px"
          pl="5px"
          height="30px"
          width={{ sm: '20px', md: '120px' }}
        >
          <Text display={{ base: 'none', md: 'block' }}>Agregar</Text>
        </Button>
      </Heading>

      <Box height="100px">
        <AddressList client={client} />
      </Box>
    </Box>
  );

  const [isSm] = useMediaQuery('(max-width: 48em)');

  return (
    <Flex align="center" justify="center">
      <Card variant="elevated" width="430px">
        <CardHeader pb="10px" display="flex">
          <Heading
            size="md"
            display="flex"
            alignItems="center"
            justify-content="center"
          >
            {client.name + ' ' + client.lastName}
            <Text as="span" display={client.alias ? 'bolk' : 'none'}>
              {' (' + client.alias + ') '}
            </Text>
          </Heading>{' '}
          <Button
            variant="solid"
            {...updateStyle}
            p="0px"
            m="0px"
            pl="6px"
            onClick={() => {
              onOpenClientModal();
              handleClient(client);
            }}
          />
        </CardHeader>
        <CardBody py="10px" mb="30px">
          <Text display="flex" justifyContent="flex-end">
            {client.cell}
          </Text>
          <Text display="flex" justifyContent="flex-end">
            {client.email}
          </Text>
          {isSm && pathname === '/app/clients' && more && addressesSection()}
          {!isSm && addressesSection()}
        </CardBody>

        {pathname === '/app/clients' && (
          <CardFooter pt="10px" display="flex" justifyContent="flex-end">
            {isSm && (
              <Button
                onClick={handleMore}
                {...addStyle}
                px="10px"
                width="160px"
                leftIcon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {more ? 'Mostrar Menos' : 'Mostrar Más'}
              </Button>
            )}

            <Button
              leftIcon={<BiSolidPurchaseTag size="24px" />}
              onClick={() => {
                onOpenSaleModal();
                handleClient(client);
              }}
              mx="3px"
              width={{ sm: '42px' }}
              {...addStyle}
              pl="10px"
            >
              {/* <Text display={{ base: 'none', md: 'none' }}>Agregar Venta</Text> */}
            </Button>

            <Button
              leftIcon={<MdPayments size="24px" />}
              onClick={() => {
                onOpenCollectionModal();
                handleClient(client);
              }}
              {...addStyle}
              mx="3px"
              width={{ sm: '42px' }}
              pl="10px"
            >
              {/* <Text display={{ base: 'none', md: 'none' }}>Agregar Cobro</Text> */}
            </Button>

            <Button
              as={Link}
              to={`${client._id}`}
              {...addStyle}
              mx="5px"
              px="20px"
            >
              Ver Detalles
            </Button>
          </CardFooter>
        )}
      </Card>
      <SaleModal />
      <CollectionModal />
    </Flex>
  );
};

export default ClientCard;
