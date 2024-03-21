import { useEffect, useState } from 'react';
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
  VStack,
} from '@chakra-ui/react';
import usePrivate from '../../hooks/private/usePrivate';
import {
  CollectionsReportExpandable,
  DateRangePicker,
  SalesReportExpandable,
} from '.';

const ReportCard = () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const [startDate, setStartDate] = useState<string>(formatDate(startOfMonth));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));

  const { report, getReport } = usePrivate();

  useEffect(() => {
    getReport({ startDate: startDate, endDate: endDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width={{ md: 'full', lg: '50%' }}
    >
      <CardHeader>
        <Heading size="md">Reporte</Heading>
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
          </Thead>
          <Tbody>
            <VStack>
              <SalesReportExpandable report={report.purchases} />
              <CollectionsReportExpandable report={report.payments} />
            </VStack>
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ReportCard;
