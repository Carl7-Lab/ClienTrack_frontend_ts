import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCustomTitle from '../../hooks/useCustomTitle';
import { InputCustom } from '../../components';
import { colors } from '../../styles/colors';
import { VALID_PASSWORD_REGEX } from '../../helpers/variable';

const NewPassword = () => {
  useCustomTitle('Nueva Contraseña | ClienTrack');
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
          Reestablece tu <Text color={colors.gray[900]}>contraseña</Text>
        </Heading>
      </Box>

      <Box bg="white" p="15px" py="30px" rounded="md">
        <Formik
          initialValues={{
            password: '',
            repeatPassword: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={Yup.object({
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
          })}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
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

              <Button
                type="submit"
                width="full"
                backgroundColor="rgba(0, 35, 255, 1)"
                color="white"
                _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
              >
                Guardar Nueva Contraseña
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default NewPassword;
