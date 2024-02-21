import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import CollectionExpandable from './CollectionExpandable';
import { CollectionPropsBD } from '../../interface/PrivateProps';

const CollectionList = ({
  collections,
}: {
  collections: CollectionPropsBD[];
}) => {
  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ md: 'full', lg: '50%' }}
    >
      <CardHeader>
        <Heading size="md">Movimientos de Cobros</Heading>
      </CardHeader>

      <CardBody>
        <Table variant="simple" size="sm">
          <Thead height="56px">
            <Tr>
              <Th></Th>
              <Th fontSize="16px">Fecha</Th>
              <Th fontSize="16px">Monto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {collections.map((collection, index) => (
              <CollectionExpandable key={index} collection={collection} />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default CollectionList;
