import { SimpleGrid } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import ClientCard from './ClientCard';

const ClientList = () => {
  const { clients } = usePrivate();

  return (
    <SimpleGrid
      spacing="20px"
      mx={{ base: '10px', sm: '20px', md: '30px' }}
      minChildWidth={{ base: '400px', sm: '450px', md: '450px', lg: '400px' }}
    >
      {clients.map((client) => (
        <ClientCard key={client._id} client={client} />
      ))}
    </SimpleGrid>
  );
};

export default ClientList;
