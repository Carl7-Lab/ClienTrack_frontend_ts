import { useParams } from 'react-router-dom';
import { Box, Container, Link, Text } from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import { AlertCustom, HeadingCustom } from '../../components/authFormik';
import { colors } from '../../styles/colors';
import useConfirmAccount from '../../hooks/public/useConfirmAccount';

const ConfirmAccount = () => {
  useCustomTitle('Confirmar Cuenta | VenCo');

  const { id } = useParams();
  const { alert } = useConfirmAccount(id);
  const { msg, status } = alert;

  return (
    <>
      <HeadingCustom head="Tu cuenta ha sido">
        <Text as="span" color={colors.gray[900]}>
          confirmada
        </Text>
      </HeadingCustom>

      <Box bg="white" p="15px" py="30px" rounded="md">
        {msg && <AlertCustom status={status} msg={msg} />}

        <Container textAlign="center" justifyContent="center">
          <Link color="teal.500" href="/">
            Inicia Sesión
          </Link>
        </Container>
      </Box>
    </>
  );
};

export default ConfirmAccount;
