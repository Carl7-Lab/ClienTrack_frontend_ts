import { useState } from 'react';
import { formatDate } from '../../helpers/formatDate';
import {
  Button,
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
import {
  CollectionsReportExpandable,
  DateRangePicker,
  SalesReportExpandable,
} from '.';
import { addStyle } from '../authFormik/ButtonCustom';
import { FaSearch } from 'react-icons/fa';

const ReportCard = () => {
  const startOfMonth = new Date(new Date().getTime() - 300 * 60 * 1000);
  startOfMonth.setDate(1);

  const [viewReport, setViewReport] = useState(false);
  const [startDate, setStartDate] = useState<string>(formatDate(startOfMonth));
  const [endDate, setEndDate] = useState<string>(
    formatDate(new Date(new Date().getTime() - 300 * 60 * 1000)),
  );

  const { reportByDate, loadingReport, doReportByDate } = usePrivate();

  const handleReportByDate = async () => {
    doReportByDate({ startDate: startDate, endDate: endDate });
    setViewReport(true);
  };

  return (
    <Card
      my="10px"
      mx={{ base: '10px', md: '20px', lg: '1%' }}
      width="100%"
      boxShadow="xs"
    >
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md">Reporte Por Fecha</Heading>
        <Button
          {...addStyle}
          px="5px"
          leftIcon={<FaSearch />}
          onClick={handleReportByDate}
          isLoading={loadingReport}
        >
          Generar Reporte
        </Button>
      </CardHeader>

      <CardBody pt="0px" maxHeight="470px" overflow="auto">
        <Table variant="simple" size="sm" position="relative" right="9px">
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
            {viewReport &&
              (loadingReport ? (
                <>
                  <Tr>
                    <Th colSpan={3}>
                      <Skeleton height="60px" />
                    </Th>
                  </Tr>
                  <Tr>
                    <Th colSpan={3}>
                      <Skeleton height="60px" />
                    </Th>
                  </Tr>
                </>
              ) : (
                <>
                  <SalesReportExpandable report={reportByDate.purchases} />
                  <CollectionsReportExpandable report={reportByDate.payments} />
                </>
              ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ReportCard;
