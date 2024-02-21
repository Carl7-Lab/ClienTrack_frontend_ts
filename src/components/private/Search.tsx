import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import SearchModal from './SearchModal';

import { MdPersonSearch } from 'react-icons/md';
import { colors } from '../../styles/colors';

const Search = () => {
  const { onOpenSearchModal } = usePrivate();

  return (
    <>
      <InputGroup width={{ base: '75%', sm: '70%', md: '50%' }}>
        <Input
          type="tel"
          fontWeight="bold"
          placeholder="Buscar ..."
          borderColor={colors.one}
          _hover={{ borderWidth: '2px' }}
          value={''}
          onChange={() => {
            onOpenSearchModal();
          }}
          onClick={() => {
            onOpenSearchModal();
          }}
        />
        <InputRightElement width={{ sm: '30px', md: '30px' }}>
          <MdPersonSearch size="30px" />
        </InputRightElement>
      </InputGroup>
      <SearchModal />
    </>
  );
};

export default Search;
