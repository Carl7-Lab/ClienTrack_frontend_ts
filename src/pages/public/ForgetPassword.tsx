import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import {
  AlertCustom,
  ButtonCustom,
  HeadingCustom,
  InputCustom,
} from '../../components/authFormik';
import { colors } from '../../styles/colors';
import useForgetPassword from '../../hooks/public/useForgetPassword';

const ForgetPassword = () => {
  useCustomTitle('Olvidó Contraseña | VenCo');
  const { alert, initialValues, validationSchema, onSubmit } =
    useForgetPassword();
  const { msg, status } = alert;

  return (
    <>
      <HeadingCustom head="Recupera tu">
        <Text color={colors.gray[900]}>acceso</Text>
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

              <ButtonCustom text="Enviar Instrucciones" />
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
