import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Select,
  Skeleton,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { addStyle } from '../authFormik/ButtonCustom';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import usePrivate from '../../hooks/private/usePrivate';
import { CollectionsReportMExpandable, SalesReportMExpandable } from '.';

const ReportMonthlyCard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [viewReport, setViewReport] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const { reports, reportM, loadingReportM, getReports, getReportM } =
    usePrivate();

  useEffect(() => {
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetReport = () => {
    if (selectedOption !== '') {
      getReportM(selectedOption);
      setViewReport(true);
    }
  };

  return (
    <Card my="10px" mx={{ base: '10px', md: '20px', lg: '1%' }} width="100%">
      <CardHeader>
        <Heading size="md">Reporte Por Mes</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr height="45px">
              <Th>
                <Select value={selectedOption} onChange={handleSelectChange}>
                  <option value="">-- Seleccione --</option>
                  {reports.map((report, index) => (
                    <option key={index} value={report._id}>
                      {report.name}
                    </option>
                  ))}
                </Select>
              </Th>
              <Th>
                <Button
                  {...addStyle}
                  px="5px"
                  leftIcon={<FaSearch />}
                  onClick={handleGetReport}
                  isLoading={loadingReportM}
                >
                  Buscar
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {viewReport &&
              (loadingReportM ? (
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
                  <SalesReportMExpandable report={reportM.purchases} />
                  <CollectionsReportMExpandable report={reportM.payments} />
                </>
              ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ReportMonthlyCard;
