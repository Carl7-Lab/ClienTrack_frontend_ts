import { Box } from '@chakra-ui/react';

import useCustomTitle from '../../hooks/public/useCustomTitle';
import { DebtorCard, ReportCard } from '../../components/private';

const Home = () => {
  useCustomTitle('Inicio | VenCo');

  return (
    <Box minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Box mx={{ base: '10px', sm: '20px', md: '30px', lg: '10%' }}>
        <Box display={{ md: 'block', lg: 'flex' }}>
          <ReportCard />
          <DebtorCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
