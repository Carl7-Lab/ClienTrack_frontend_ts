import { Box, Text } from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';

const Sales = () => {
  useCustomTitle('Ventas | ClienTrack');
  return (
    <Box minH="60.93vh">
      <Text>Sales</Text>
    </Box>
  );
};

export default Sales;
