import { Box, Button, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCustomTitle from '../../hooks/useCustomTitle';
import { CheckboxCustom, InputCustom } from '../../components';
import { colors } from '../../styles/colors';

const Login = () => {
  useCustomTitle('Iniciar Sesión | ClienTrack');
  return (
    <>
      <Box>
        <Heading
          mx={{ base: 0, sm: '40px', md: '60px' }}
          py="20px"
          as="h1"
          textTransform="capitalize"
          fontSize="50px"
          color={colors.one}
        >
          Inicia sesión y administra tus <Text color={colors.gray[900]}>clientes</Text>
        </Heading>
      </Box>

      <Box bg="white" p="15px" py="30px" rounded="md">
        <Formik
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Correo no tiene un formato válido')
              .required('Requerido'),
            password: Yup.string().required('Requerido'),
            remember: Yup.boolean(),
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
              <InputCustom
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />

              <CheckboxCustom
                label="Recordar Contraseña"
                id="rememberMe"
                name="rememberMe"
              />

              <Button
                type="submit"
                width="full"
                backgroundColor="rgba(0, 35, 255, 1)"
                color="white"
                _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
              >
                Iniciar Sesión
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
          <Link color="teal.500" href="forget-password">
            Olvide la contraseña
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default Login;
