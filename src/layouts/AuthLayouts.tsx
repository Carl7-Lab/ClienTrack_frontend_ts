import { Container, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const AuthLayouts = () => {
  return (
    <>
      <Flex bg="gray.100" align="center" justify="center" minH="100vh">
        <Container
          mx="auto"
          mt={{ base: 0, sm: '5px', md: '20px' }}
          p="5px"
          justifyContent={{ md: 'center' }}
          width={{ base: '100%', sm: '80%', md: '70%', lg: '60%' }}
        >
          <Outlet />
        </Container>
      </Flex>
    </>
  );
};

export default AuthLayouts;
