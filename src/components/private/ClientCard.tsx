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
  Skeleton,
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

const ClientCard = ({
  client,
  loading,
}: {
  client: ClientPropsBD;
  loading?: boolean;
}) => {
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

      <Box height="100px" mt="20px">
        <AddressList client={client} />
      </Box>
    </Box>
  );

  const [isSm] = useMediaQuery('(max-width: 48em)');

  if (loading) {
    return (
      <Flex align="center" justify="center" mt="10px">
        <Card variant="elevated" width="300px">
          <CardHeader pb="5px">
            <Skeleton height="40px" />
          </CardHeader>
          <CardBody py="5px" mb="10px">
            <Flex flexDirection="column" alignItems="flex-end">
              <Skeleton height="25px" width="50%" mb="1px" />
              <Skeleton height="25px" width="50%" mt="1px" />
            </Flex>
            <Skeleton height="30px" width="60%" mt="5px" />
            {!isSm ? (
              <Skeleton height="100px" width="100%" mt="5px" />
            ) : (
              <Flex justifyContent="flex-end">
                <Skeleton height="40px" width="160px" mt="5px" />
              </Flex>
            )}
          </CardBody>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="center" mt="10px">
      <Card variant="elevated" width="360px" minHeight="220px">
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
        <CardBody py="10px" mb="10px">
          <Text display="flex" justifyContent="flex-end">
            {client.cell}
          </Text>
          <Text display="flex" justifyContent="flex-end">
            {client.email}
          </Text>
          {pathname.includes('/app/clients') && more && addressesSection()}
        </CardBody>

        {pathname.includes('/app/clients') && (
          <CardFooter pt="10px" display="flex" justifyContent="flex-end">
            {pathname.includes('clients/') && (
              <Button
                onClick={handleMore}
                {...addStyle}
                px="10px"
                fontSize="sm"
                width="160px"
                leftIcon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {more ? 'Mostrar Menos' : 'Mostrar Más'}
              </Button>
            )}

            {pathname === '/app/clients' && (
              <>
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
                  fontSize="sm"
                >
                  Ver Detalles
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>
    </Flex>
  );
};

export default ClientCard;
