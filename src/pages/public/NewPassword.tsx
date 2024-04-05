import { useParams } from 'react-router-dom';
import { Box, Container, Link, Text, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import useNewPassword from '../../hooks/public/useNewPassword';
import {
  AlertCustom,
  ButtonCustom,
  HeadingCustom,
  InputCustom,
} from '../../components/authFormik';
import { colors } from '../../styles/colors';

const NewPassword = () => {
  useCustomTitle('Nueva Contraseña | VenCo');
  const { token } = useParams();
  const {
    alert,
    validToken,
    initialValues,
    validationSchema,
    changePassword,
    onSubmit,
  } = useNewPassword(token);
  const { msg, status } = alert;

  return (
    <>
      <HeadingCustom head="Reestablece tu">
        <Text color={colors.gray[900]}>contraseña</Text>
      </HeadingCustom>

      {msg && <AlertCustom status={status} msg={msg} />}
      {validToken && (
        <>
          <Box bg="white" p="15px" py="30px" rounded="md">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
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

                  <ButtonCustom text="Guardar Nueva Contraseña" />
                </VStack>
              </Form>
            </Formik>
          </Box>
          {changePassword && (
            <Container
              mt="20px"
              mb="50px"
              textAlign="center"
              justifyContent="center"
            >
              <Link color="teal.500" href="/">
                Inicia Sesión
              </Link>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default NewPassword;
