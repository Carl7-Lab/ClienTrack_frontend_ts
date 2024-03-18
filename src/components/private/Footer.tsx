import { navigationLinks } from '../../helpers/variable';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import { colors } from '../../styles/colors';

const Footer = () => {
  const { pathname } = usePrivate();

  const widthP: number = 100 / navigationLinks.length;

  console.log(`${widthP}%`);

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
        boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)"
      >
        <Flex
          as="nav"
          width="300px"
          align="center"
          justify="center"
          mx="auto"
          backgroundColor={colors.white}
        >
          {navigationLinks.map(({ path, icon, label }) => (
            <Link
              key={path}
              href={path}
              fontWeight={pathname.includes(path) ? 'bold' : 'normal'}
              textColor={pathname.includes(path) ? colors.one : colors.three}
              width={`${widthP}%`}
              textAlign="center"
              px="20px"
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
                  pathname.includes(path) ? colors.one_light : colors.white
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
        boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)"
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
