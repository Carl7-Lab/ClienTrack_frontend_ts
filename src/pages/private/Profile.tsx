import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import useCustomTitle from '../../hooks/public/useCustomTitle';
import usePublic from '../../hooks/public/usePublic';
import { addStyle } from '../../components/authFormik/ButtonCustom';
import usePrivate from '../../hooks/private/usePrivate';

const Profile = () => {
  useCustomTitle('Perfil de Usuario | Venco');

  const { auth, resetAuth } = usePublic();
  const { resetVar } = usePrivate();
  const { userName, email } = auth;

  const handleLogout = () => {
    localStorage.removeItem('token');
    resetAuth();
    resetVar();
  };

  return (
    <Center minH="60.93vh" mb={{ base: '20px', sm: '110px', md: '20px' }}>
      <Card>
        <CardHeader pb="10px">
          <Heading>Informacion de cuenta</Heading>
        </CardHeader>
        <CardBody py="10px">
          <Text fontWeight="bold">
            Usuario:{' '}
            <Text as="span" fontWeight="normal">
              {userName}
            </Text>
          </Text>
          <Text fontWeight="bold">
            Email:{' '}
            <Text as="span" fontWeight="normal">
              {email}
            </Text>{' '}
          </Text>
        </CardBody>
        <CardFooter pt="10px">
          <Button onClick={handleLogout} {...addStyle} width="100%">
            Cerrar Sesion
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default Profile;
