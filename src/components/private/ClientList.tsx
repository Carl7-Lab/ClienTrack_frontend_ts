import { Card, Flex, SimpleGrid } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import ClientCard from './ClientCard';

const ClientList = () => {
  const { clients } = usePrivate();

  return (
    <SimpleGrid
      spacing="20px"
      mt="20px"
      mx={{ base: '10px', sm: '20px', md: '30px' }}
      minChildWidth={{ base: '400px', sm: '450px', md: '450px', lg: '400px' }}
    >
      {clients.map((client) => (
        <ClientCard key={client._id} client={client} />
      ))}
      {clients.length < 2 && (
        <Flex>
          <Card></Card>
        </Flex>
      )}
      {clients.length < 3 && (
        <Flex>
          <Card></Card>
        </Flex>
      )}
    </SimpleGrid>
  );
};

export default ClientList;
