import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { colors } from '../../styles/colors';
import { TbEdit } from 'react-icons/tb';
import usePrivate from '../../hooks/private/usePrivate';
import { AddressModal } from '.';
import AddressList from './AddressList';

const ClientList = () => {
  const { clients, handleClient, onOpenClientModal } = usePrivate();

  return (
    <SimpleGrid
      spacing="20px"
      mx={{ base: '10px', sm: '20px', md: '30px' }}
      minChildWidth={{ base: '400px', sm: '450px', md: '450px', lg: '400px' }}
    >
      {clients.map((client) => (
        <Flex key={client._id} align="center" justify="center">
          <Card
            variant="elevated"
            width={{ base: '100%', sm: '80%', md: '80%', lg: '100%' }}
          >
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
                leftIcon={<TbEdit size="25px" />}
                onClick={() => {
                  onOpenClientModal();
                  handleClient(client);
                }}
                mx="3px"
                pl="2px"
                textColor={{ base: 'gray.700', md: colors.white }}
                backgroundColor={{ base: colors.transparent, md: 'gray.400' }}
                _hover={{
                  backgroundColor: { base: colors.transparent, md: 'gray.500' },
                  textColor: { base: 'gray.500', md: 'black' },
                  fontWeight: 'bold',
                }}
                _active={{
                  backgroundColor: { base: colors.transparent, md: 'gray.300' },
                  textColor: { base: 'gray.300', md: 'black' },
                  fontWeight: 'bold',
                }}
              >
                <Text display={{ base: 'none', md: 'block' }}>Actualizar</Text>
              </Button>
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
                  <AddressModal valueC={client} />
                </Heading>

                <Box height="100px">
                  <AddressList client={client} />
                </Box>
              </Box>
            </CardBody>

            <CardFooter pt="10px" display="flex" justifyContent="flex-end">
              <Button
                variant="solid"
                mx="5px"
                textColor={colors.white}
                backgroundColor={colors.one}
                _hover={{
                  backgroundColor: colors.one_light,
                  textColor: colors.one,
                  fontWeight: 'bold',
                }}
                _active={{
                  backgroundColor: colors.three,
                  textColor: colors.one,
                  fontWeight: 'bold',
                }}
              >
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default ClientList;
