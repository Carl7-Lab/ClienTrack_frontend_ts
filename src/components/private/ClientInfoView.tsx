import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const ClientInfoView = ({
  client,
}: {
  client: {
    name?: string;
    lastName?: string;
    alias?: string;
    seller?: string;
    _id?: string;
  };
}) => {
  return (
    <Text as={Link} to={`/login/clients/${client._id}`}>
      {client.name + ' ' + client.lastName + ' (' + client.alias + ') '}
    </Text>
  );
};

export default ClientInfoView;
