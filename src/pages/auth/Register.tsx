import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useCustomTitle from '../../hooks/useCustomTitle';
import useUserRegister from '../../hooks/useUserRegister';
import {
  AlertCustom,
  ButtonCustom,
  CheckboxCustom,
  HeadingCustom,
  InputCustom,
} from '../../components/authFormik';
import { colors } from '../../styles/colors';

const Register = () => {
  useCustomTitle('Registro De Usuario | ClienTrack');
  const { initialValues, validationSchema, onSubmit, alert } = useUserRegister();
  const { msg, status } = alert;

  return (
    <>
      <HeadingCustom head="Crea tu cuenta y administra tus">
        <Text as="span" color={colors.gray[900]}>
          clientes
        </Text>
      </HeadingCustom>

      {msg && <AlertCustom status={status} msg={msg} />}

      <Box>
        <Box bg="white" p="15px" py="30px" rounded="md">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form>
                <VStack spacing={4} align="flex-start">
                  <InputCustom
                    label="Usuario"
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Usuario"
                  />
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
                  <InputCustom
                    label="Repeat Password"
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                  />

                  <CheckboxCustom
                    label="Aceptar Términos & Condiciones"
                    id="terms"
                    name="terms"
                  />

                  <ButtonCustom text="Crear Cuenta" />
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>

        <Flex
          display={{ base: 'block', sm: 'block', md: 'flex' }}
          justifyContent="space-between"
          alignItems="center"
          mb="50px"
        >
          <Text>
            ¿Ya tienes una cuenta?{' '}
            <Link color="teal.500" href="/">
              Inicia Sesión
            </Link>
          </Text>
          <Text>
            <Link color="teal.500" href="forget-password">
              Olvidó Contraseña
            </Link>
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
