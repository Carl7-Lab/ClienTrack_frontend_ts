import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import SearchModal from './SearchModal';

import { MdPersonSearch } from 'react-icons/md';
import { colors } from '../../styles/colors';

export interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchValue, setSearchValue }: SearchProps) => {
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
          value={searchValue}
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
      <SearchModal searchValue={searchValue} setSearchValue={setSearchValue} />
    </>
  );
};

export default Search;
