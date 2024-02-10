import { Box, Button, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCustomTitle from '../../hooks/useCustomTitle';
import { InputCustom } from '../../components';
import { colors } from '../../styles/colors';

const ForgetPassword = () => {
  useCustomTitle('Olvidó Contraseña | ClienTrack');
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
          Recupera tu <Text color={colors.gray[900]}>acceso</Text>
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
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Correo no tiene un formato válido')
              .required('Requerido'),
          })}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
              <InputCustom
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />

              <Button
                type="submit"
                width="full"
                backgroundColor="rgba(0, 35, 255, 1)"
                color="white"
                _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
              >
                Enviar Instrucciones
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>

      <Flex
        display={{ base: 'block', sm: 'block', md: 'flex' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>
          ¿No tienes una cuenta?{' '}
          <Link color="teal.500" href="register">
            Regístrate
          </Link>
        </Text>
        <Text>
          ¿Ya tienes una cuenta?{' '}
          <Link color="teal.500" href="/">
            Inicia Sesión
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default ForgetPassword;
