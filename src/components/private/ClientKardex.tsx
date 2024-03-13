import { useEffect, useState } from 'react';
import usePrivate from '../../hooks/private/usePrivate';
import { formatDate } from '../../helpers/formatDate';
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
import { DateRangePicker, Pagination, RowKardexExpandable } from '.';

const ClientKardex = ({ id }: { id: string }) => {
  const { rowsKardex, firstMoveDate, totalRows, getKardex } = usePrivate();
  const [currentPage, setCurrentPage] = useState(1);
  //numero de movimientos por pagina
  const limit = 6;

  const [startDate, setStartDate] = useState<string>(formatDate(firstMoveDate));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));

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
      width={{ md: 'full', lg: '80%' }}
    >
      <CardHeader>
        <Heading size="md">Kardex del Cliente</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th colSpan={6}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={6}>
                <Pagination
                  limit={limit}
                  total={totalRows}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Th>
            </Tr>
            {totalRows === 0 ? (
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
            {rowsKardex.map((rowKardex, index) => (
              <RowKardexExpandable key={index} rowKardex={rowKardex} />
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ClientKardex;
