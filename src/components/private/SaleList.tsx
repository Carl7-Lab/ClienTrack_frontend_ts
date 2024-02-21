import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Card,
  CardHeader,
  Heading,
  CardBody,
} from '@chakra-ui/react';

import SaleExpandable from './SaleExpandable';
import { SalePropsBD } from '../../interface/PrivateProps';

const SaleList = ({ sales }: { sales: SalePropsBD[] }) => {
  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ md: 'full', lg: '50%' }}
    >
      <CardHeader>
        <Heading size="md">Movimientos de Ventas</Heading>
      </CardHeader>

      <CardBody>
        <Table variant="simple" size="sm">
          <Thead height="56px">
            <Tr>
              <Th />
              <Th fontSize="16px">Fecha</Th>
              <Th fontSize="16px">Tipo de Pago</Th>
              <Th fontSize="16px">Monto</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales.map((sale, index) => (
              <SaleExpandable key={index} sale={sale} />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SaleList;
