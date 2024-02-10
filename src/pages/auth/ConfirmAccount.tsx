import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useCustomTitle from '../../hooks/useCustomTitle';
import { colors } from '../../styles/colors';

const ConfirmAccount = () => {
  useCustomTitle('Confirmar Cuenta | ClienTrack');
  return (
    <>
      <Box>
        <Heading
          mx={{ base: 0, sm: '40px', md: '50px' }}
          py="20px"
          as="h1"
          textTransform="capitalize"
          fontSize="50px"
          color={colors.one}
        >
          Confirma tu <Text color={colors.gray[900]}>cuenta</Text>
        </Heading>
      </Box>

      <Box bg="white" p="15px" py="30px" rounded="md">
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
              <Button
                type="submit"
                width="full"
                backgroundColor="rgba(0, 35, 255, 1)"
                color="white"
                _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
              >
                Confirmar
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default ConfirmAccount;
