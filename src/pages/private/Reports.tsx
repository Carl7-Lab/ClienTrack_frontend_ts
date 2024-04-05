import { Box, SimpleGrid } from '@chakra-ui/react';

import useCustomTitle from '../../hooks/public/useCustomTitle';
import {
  DebtorCard,
  ReportCard,
  ReportMonthlyCard,
} from '../../components/private';

const Reports = () => {
  useCustomTitle('Reportes | VenCo');

  return (
    <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Box mx={{ base: '10px', sm: '20px', md: '30px', lg: '10%' }}>
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
          spacingX={10}
          spacingY={5}
        >
          <ReportCard />
          <DebtorCard />
          <ReportMonthlyCard />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Reports;
