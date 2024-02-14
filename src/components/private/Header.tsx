import { Box, Flex, Link, Text, Image } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import logo from '../../../public/logo-no-background.png';
import { colors } from '../../styles/colors';
import { navigationLinks } from '../../helpers/variable';

const Header = ({ page }: { page: string }) => {
  const { pathname } = useLocation();

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      backgroundColor={colors.white}
      px={{ base: '10px', sm: '20px', md: '30px' }}
      py={{ base: '20px', sm: '20px', md: '30px' }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text>
          <Link color="teal.500" href="/login">
            <Image
              height={{ base: '30px', sm: '40px', md: '70px' }}
              objectFit="fill"
              src={logo}
              alt="Logo"
            />
          </Link>
        </Text>

        <Text
          as="b"
          textTransform="capitalize"
          fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
          display={{ base: 'block', md: 'none' }}
        >
          {page}
        </Text>

        <Flex
          as="nav"
          align="center"
          justify="space-between"
          backgroundColor={colors.white}
          width="30%"
          fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
          display={{ base: 'none', md: 'flex' }}
        >
          {navigationLinks.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              fontWeight={pathname === path ? 'bold' : 'normal'}
              textColor={pathname === path ? colors.white : colors.one}
              backgroundColor={pathname === path ? colors.three : colors.white}
              width="33%"
              textAlign="center"
              px="auto"
              py={{ base: '20px', sm: '20px', md: '30px' }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {label}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
