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
import { Pagination } from '.';
import DateRangePicker from './DateRangePicker';
import usePrivate from '../../hooks/private/usePrivate';
import { useEffect, useState } from 'react';
import { formatDate } from '../../helpers/formatDate';

const SaleList = ({ id }: { id?: string }) => {
  const { sales, totalSales, getSales } = usePrivate();
  const [currentPage, setCurrentPage] = useState(1);
  //numero de ventas por pagina
  const limit = 6;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const [startDate, setStartDate] = useState<string>(formatDate(startOfMonth));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));

  useEffect(() => {
    getSales({
      idClient: id,
      limit: limit,
      page: currentPage,
      startDate: startDate,
      endDate: endDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, startDate, endDate]);

  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ md: 'full', lg: '50%' }}
    >
      <CardHeader>
        <Heading size="md">Movimientos de Ventas</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th colSpan={4}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={4}>
                <Pagination
                  limit={limit}
                  total={totalSales}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Th>
            </Tr>
            {sales.length === 0 ? (
              <Tr>
                <Th colSpan={4} fontSize="16px">
                  No Hay Registros de Ventas
                </Th>
              </Tr>
            ) : (
              <Tr height="45px">
                <Th />
                <Th fontSize="16px">Fecha</Th>
                <Th fontSize="16px">Tipo de Pago</Th>
                <Th fontSize="16px">Monto</Th>
              </Tr>
            )}
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
