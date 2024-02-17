import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdPersonSearch } from 'react-icons/md';
import { colors } from '../../styles/colors';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('Valor del Search:', searchValue);
  };

  return (
    <InputGroup width={{ base: '75%', sm: '70%', md: '50%' }}>
      <Input
        type="tel"
        fontWeight="bold"
        placeholder="Buscar ..."
        borderColor={colors.one}
        _hover={{ borderWidth: '2px' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <InputRightElement width={{ sm: '70px', md: '100px' }}>
        <Button
          variant="solid"
          leftIcon={<MdPersonSearch size="30px" />}
          colorScheme="blue"
          textColor={colors.white}
          backgroundColor={colors.one}
          fontWeight="bold"
          _hover={{ backgroundColor: colors.white, textColor: colors.one }}
          _active={{
            backgroundColor: colors.three,
            textColor: colors.one,
            fontWeight: 'bold',
          }}
          onClick={handleSearch}
        >
          <Text display={{ base: 'none', md: 'block' }}>Buscar</Text>
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
