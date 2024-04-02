import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, Flex, Spinner, VStack } from '@chakra-ui/react';

import usePublic from '../hooks/public/usePublic';
import { Footer, Header } from '../components/private';

import { navigationLinks } from '../helpers/variable';
import { colors } from '../styles/colors';

const UserLayout = () => {
  const { pathname } = useLocation();

  const { auth, isLoading } = usePublic();
  const { _id } = auth;

  const matchingLink = navigationLinks.find(({ path }) =>
    pathname.includes(path),
  );
  const page = matchingLink ? matchingLink.label : 'Error...';

  if (isLoading)
    return (
      <Flex bg="gray.100" align="center" justify="center" minH="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );

  return (
    <>
      <Flex bg={colors.one_light} minH="100vh" flexDirection="column">
        <Box
          justifyContent="center"
          width="100%"
          mt={{ base: '70px', sm: '85px', md: '90px' }}
          mb={{ base: '94px', sm: 0 }}
          flex="1"
        >
          <VStack spacing={0} align="stretch">
            <Header page={page} />

            {_id ? <Outlet /> : <Navigate to="/" />}
          </VStack>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default UserLayout;
