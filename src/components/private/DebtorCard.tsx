import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import usePrivate from '../../hooks/private/usePrivate';
import { useEffect } from 'react';
import { DebtorExpandable } from '.';

const DebtorCard = () => {
  const { getDebtors, debtors, loadingDebtors } = usePrivate();

  useEffect(() => {
    getDebtors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('lista de deudores', debtors);

  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ md: 'full', lg: '50%' }}
    >
      <CardHeader>
        <Heading size="md">Por Cobrar</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            {debtors.length === 0 ? (
              <Tr>
                <Th colSpan={3} fontSize="16px">
                  No Hay Registros de Ventas
                </Th>
              </Tr>
            ) : (
              <Tr height="45px">
                <Th />
                <Th fontSize="16px">Nombre</Th>
                <Th fontSize="16px">Monto</Th>
              </Tr>
            )}
          </Thead>

          <Tbody>
            {loadingDebtors ? (
              <Tr>
                <Th colSpan={3}>
                  <Skeleton height="60px" />
                </Th>
              </Tr>
            ) : (
              debtors.map((debtor, index) => (
                <DebtorExpandable key={index} debtor={debtor} />
              ))
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DebtorCard;
