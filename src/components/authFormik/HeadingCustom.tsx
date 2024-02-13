import { Box, Heading } from '@chakra-ui/react';
import { colors } from '../../styles/colors';
import { ReactNode } from 'react';

const HeadingCustom = ({ head, children }: { head: string; children?: ReactNode }) => {
  return (
    <Box>
      <Heading
        mx={{ base: 0, sm: '40px', md: '50px' }}
        py="20px"
        as="h1"
        textTransform="capitalize"
        fontSize="50px"
        color={colors.one}
      >
        {head} {children}
      </Heading>
    </Box>
  );
};

export default HeadingCustom;
