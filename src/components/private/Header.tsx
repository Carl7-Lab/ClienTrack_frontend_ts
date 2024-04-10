import { Box, Flex, Link, Text, Image } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';

import { navigationLinks } from '../../helpers/variable';
import { colors } from '../../styles/colors';
import logo from '/venco-logo-transparent.png';

const Header = ({ page }: { page: string }) => {
  const { pathname } = usePrivate();

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      backgroundColor={colors.white}
      px={{ base: '10px', sm: '10px', md: '10px' }}
      py={{ base: '20px', sm: '20px', md: '20px' }}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text>
          <Link color="teal.500" href="/app">
            <Image
              height={{ base: '30px', sm: '40px' }}
              objectFit="fill"
              src={logo}
              alt="Logo"
              px="20px"
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
          // width="25%"
          fontSize={{ base: 'xl', sm: 'xl', md: 'xl' }}
          display={{ base: 'none', md: 'flex' }}
        >
          {navigationLinks.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              fontWeight={pathname.includes(path) ? 'bold' : 'normal'}
              textColor={pathname.includes(path) ? colors.white : colors.one}
              backgroundColor={
                pathname.includes(path) ? colors.three : colors.white
              }
              // width="50%"
              textAlign="center"
              px="20px"
              py={{ base: '10px', sm: '10px', md: '10px' }}
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
