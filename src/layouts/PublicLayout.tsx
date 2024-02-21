import { Navigate, Outlet } from 'react-router-dom';
import { Container, Flex, Spinner } from '@chakra-ui/react';

import usePublic from '../hooks/public/usePublic';

const PublicLayout = () => {
  const { auth, isLoading } = usePublic();
  const { _id } = auth;

  console.log(auth);

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
      <Flex bg="gray.100" align="center" justify="center" minH="100vh">
        <Container
          mx={{ base: '10px', sm: 'auto', md: 'auto' }}
          mt={{ base: 0, sm: '5px', md: '20px' }}
          p="5px"
          justifyContent={{ md: 'center' }}
          width={{ base: '100%', sm: '80%', md: '70%', lg: '60%' }}
        >
          {_id ? <Navigate to="/login" /> : <Outlet />}
        </Container>
      </Flex>
    </>
  );
};

export default PublicLayout;
