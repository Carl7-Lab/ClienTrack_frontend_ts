import { Box, Button, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCustomTitle from '../../hooks/useCustomTitle';
import { CheckboxCustom, InputCustom } from '../../components';
import { colors } from '../../styles/colors';
import { VALID_PASSWORD_REGEX } from '../../helpers/variable';

const Register = () => {
  useCustomTitle('Registro De Usuario | ClienTrack');
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
          Crea tu cuenta y administra tus <Text color={colors.gray[900]}>clientes</Text>
        </Heading>
      </Box>

      <Box>
        <Box bg="white" p="15px" py="30px" rounded="md">
          <Formik
            initialValues={{
              userName: '',
              email: '',
              password: '',
              repeatPassword: '',
              terms: false,
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={Yup.object({
              userName: Yup.string()
                .min(2, 'Debe de tener 2 caracteres como minimo')
                .required('Requerido'),
              email: Yup.string()
                .email('Correo no tiene un formato válido')
                .required('Requerido'),
              password: Yup.string()
                .min(8, 'Debe de tener 8 caracteres como minimo')
                .max(20, 'No debe superar los 20 caracteres')
                .required('Requerido')
                .matches(
                  VALID_PASSWORD_REGEX,
                  'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
                ),
              repeatPassword: Yup.string()
                .oneOf(
                  [Yup.ref('password'), undefined],
                  'Las contraseñas deben ser iguales',
                )
                .required('Requerido'),
              terms: Yup.boolean().oneOf([true], 'Debe de aceptar las condiciones'),
            })}
          >
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

                <Button
                  type="submit"
                  width="full"
                  backgroundColor="rgba(0, 35, 255, 1)"
                  color="white"
                  _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
                >
                  Crear Cuenta
                </Button>
              </VStack>
            </Form>
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
