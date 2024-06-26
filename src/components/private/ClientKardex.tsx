import { useEffect, useState } from 'react';
import usePrivate from '../../hooks/private/usePrivate';
import { formatDate } from '../../helpers/formatDate';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DateRangePicker, Pagination, RowKardexExpandable } from '.';

const ClientKardex = ({ id }: { id: string }) => {
  const {
    client,
    rowsKardex,
    firstMoveDate,
    totalRows,
    loadingKardex,
    getKardex,
  } = usePrivate();
  const [currentPage, setCurrentPage] = useState(1);
  //numero de movimientos por pagina
  const limit = 6;

  const [startDate, setStartDate] = useState<string>(formatDate(firstMoveDate));
  const [endDate, setEndDate] = useState<string>(
    formatDate(new Date(new Date().getTime() - 300 * 60 * 1000)),
  );

  useEffect(() => {
    getKardex({
      idClient: id,
      limit: limit,
      page: currentPage,
      startDate: startDate,
      endDate: endDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, startDate, endDate, rowsKardex.length]);

  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ base: '100%', md: 'full', lg: '80%' }}
    >
      <CardHeader pb="10px">
        <Heading size="md">Kardex del Cliente</Heading>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          loading={loadingKardex}
        />

        <Pagination
          limit={limit}
          total={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loadingKardex}
        />

        <Heading size="md" mt="10px">
          {client.name + ' ' + client.lastName}
        </Heading>
      </CardHeader>

      <Divider orientation="horizontal" borderColor="gray.200" />

      <CardBody pt="0px" width="100%" overflow="auto">
        <Table variant="simple" size="sm">
          <Thead>
            {loadingKardex ? (
              <Tr>
                <Th colSpan={6}>
                  <Skeleton height="45px" />
                </Th>
              </Tr>
            ) : totalRows === 0 ? (
              <Tr>
                <Th colSpan={6} fontSize="16px">
                  No Hay Registros de Movimientos
                </Th>
              </Tr>
            ) : (
              <Tr height="45px">
                <Th></Th>
                <Th fontSize="16px">Fecha</Th>
                <Th fontSize="16px">Descripción</Th>
                <Th fontSize="16px">Debe</Th>
                <Th fontSize="16px">Haber</Th>
                <Th fontSize="16px">Saldo</Th>
              </Tr>
            )}
          </Thead>
          <Tbody>
            {!loadingKardex &&
              rowsKardex.map((rowKardex, index) => (
                <RowKardexExpandable
                  key={index}
                  rowKardex={rowKardex}
                  isFirst={index === 0}
                />
              ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ClientKardex;
