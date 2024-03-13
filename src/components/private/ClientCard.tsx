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
} from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import { ClientPropsBD } from '../../interface/PrivateProps';
import AddressList from './AddressList';

import { BiSolidLocationPlus } from 'react-icons/bi';
import { addStyle, updateStyle } from '../authFormik/ButtonCustom';

const ClientCard = ({ client }: { client: ClientPropsBD }) => {
  const {
    onOpenClientModal,
    handleClient,
    handleResetAddress,
    onOpenAddressModal,
    pathname,
  } = usePrivate();
  return (
    <Flex align="center" justify="center">
      <Card variant="elevated" width="470px">
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
        <CardBody py="10px">
          <Text display="flex" justifyContent="flex-end">
            {client.cell}
          </Text>
          <Text display="flex" justifyContent="flex-end">
            {client.email}
          </Text>
          <Box>
            <Heading mt="10px" size="md" display="flex" alignItems="center">
              Direcciones:
              {/* <AddressModal valueC={client} /> */}
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
        </CardBody>

        {pathname === '/app/clients' && (
          <CardFooter pt="10px" display="flex" justifyContent="flex-end">
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
    </Flex>
  );
};

export default ClientCard;
