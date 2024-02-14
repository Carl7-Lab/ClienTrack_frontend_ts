import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import useLogin from '../../hooks/public/useLogin';
import {
  AlertCustom,
  ButtonCustom,
  // CheckboxCustom,
  HeadingCustom,
  InputCustom,
} from '../../components/authFormik';
import { colors } from '../../styles/colors';

const Login = () => {
  useCustomTitle('Iniciar Sesión | ClienTrack');
  const { alert, initialValues, validationSchema, onSubmit } = useLogin();

  const { msg, status } = alert;

  return (
    <>
      <HeadingCustom head="Inicia sesión y administra tus">
        <Text as="span" color={colors.gray[900]}>
          clientes
        </Text>
      </HeadingCustom>

      {msg && <AlertCustom status={status} msg={msg} />}

      <Box bg="white" p="15px" py="30px" rounded="md">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
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

              {/* <CheckboxCustom
                label="Recordar Contraseña"
                id="rememberMe"
                name="rememberMe"
              /> */}

              <ButtonCustom text="Iniciar Sesión" />
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
