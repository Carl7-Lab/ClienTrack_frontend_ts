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
import { Pagination } from '.';
import { useEffect, useState } from 'react';
import usePrivate from '../../hooks/private/usePrivate';
import { formatDate } from '../../helpers/formatDate';
import DateRangePicker from './DateRangePicker';

const CollectionList = ({ id }: { id?: string }) => {
  const { collections, totalCollections, getCollections } = usePrivate();
  const [currentPage, setCurrentPage] = useState(1);
  //numero de cobros por pagina
  const limit = 6;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const [startDate, setStartDate] = useState<string>(formatDate(startOfMonth));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));

  useEffect(() => {
    getCollections({
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
        <Heading size="md">Movimientos de Cobros</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th colSpan={3}>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={3}>
                <Pagination
                  limit={limit}
                  total={totalCollections}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Th>
            </Tr>
            {collections.length === 0 ? (
              <Tr>
                <Th colSpan={3} fontSize="16px">
                  No Hay Registros de Cobros
                </Th>
              </Tr>
            ) : (
              <Tr height="45px">
                <Th></Th>
                <Th fontSize="16px">Fecha</Th>
                <Th fontSize="16px">Monto</Th>
              </Tr>
            )}
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
