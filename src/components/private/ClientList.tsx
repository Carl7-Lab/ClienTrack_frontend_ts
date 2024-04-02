import { Card, Flex, SimpleGrid } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import ClientCard from './ClientCard';

const ClientList = () => {
  const { clients } = usePrivate();

  return (
    <SimpleGrid
      spacing="5px"
      mt="20px"
      mx="5px"
      minChildWidth={{ base: '350px', sm: '350px', md: '350px', lg: '350px' }}
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
