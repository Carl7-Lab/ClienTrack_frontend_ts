import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { colors } from '../../styles/colors';
import { navigationLinks } from '../../helpers/variable';

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box
        as="footer"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        zIndex="999"
        backgroundColor={colors.white}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          backgroundColor={colors.white}
        >
          {navigationLinks.map(({ path, icon, label }) => (
            <Link
              key={path}
              href={path}
              fontWeight={pathname === path ? 'bold' : 'normal'}
              textColor={pathname === path ? colors.one : colors.three}
              width="33%"
              textAlign="center"
              px="auto"
              py={{ base: '20px', sm: '20px', md: '30px' }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Icon
                as={icon}
                boxSize={6}
                rounded="10px"
                width="30%"
                height="30px"
                py="5px"
                backgroundColor={
                  pathname === path ? colors.one_light : colors.white
                }
              />
              {label}
            </Link>
          ))}
        </Flex>
      </Box>

      <Box
        as="footer"
        backgroundColor={colors.white}
        py={{ base: '20px', sm: '20px', md: '30px' }}
        display={{ base: 'none', md: 'block' }}
      >
        <Flex justify="center" align="center" direction="column">
          <Text>&copy; 2024 ClienTrack. Todos los derechos reservados.</Text>
          <Flex mt="2">
            <Link mx="2" href="terms">
              Términos de servicio
            </Link>
            <Link mx="2" href="privacy">
              Política de privacidad
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
