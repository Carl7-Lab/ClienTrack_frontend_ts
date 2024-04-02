import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import { SearchProps } from './Search';

import { MdPersonSearch } from 'react-icons/md';
import { MdDoubleArrow } from 'react-icons/md';
import { colors } from '../../styles/colors';

const SearchModal = ({ searchValue, setSearchValue }: SearchProps) => {
  const initialRef = useRef(null);
  const {
    clients,
    isOpenSearchModal,
    loadingClients,
    onCloseSearchModal,
    getClients,
  } = usePrivate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onCloseSearchModal();
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpenSearchModal}
      onClose={() => {
        onCloseSearchModal();
      }}
    >
      <ModalOverlay />
      <ModalContent mx="10px" onKeyDown={handleKeyDown}>
        <ModalHeader textColor={colors.one} fontWeight="bold">
          <Text>Buscar Cliente</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <InputGroup width="100%">
            <Input
              ref={initialRef}
              fontWeight="bold"
              placeholder="Buscar ..."
              borderColor={colors.one}
              _hover={{ borderWidth: '2px' }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                getClients({ searchValue: e.target.value });
              }}
            />
            <InputRightElement width={{ sm: '30px', md: '30px' }}>
              <MdPersonSearch size="30px" />
            </InputRightElement>
          </InputGroup>

          {loadingClients ? (
            <Flex align="center" justify="center" minH="60vh">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            clients.slice(0, 5).map((client) => (
              <Card
                key={client._id}
                my="4px"
                _hover={{ backgroundColor: 'gray.100' }}
                _active={{ backgroundColor: 'gray.200' }}
              >
                <CardHeader
                  as={Link}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  to={`${client._id}`}
                  onClick={() => {
                    onCloseSearchModal();
                  }}
                >
                  <Text>
                    {client.name + ' ' + client.lastName}
                    <Text as="span" display={client.alias ? 'bolk' : 'none'}>
                      {' (' + client.alias + ') '}
                    </Text>
                  </Text>
                  <MdDoubleArrow />
                </CardHeader>
              </Card>
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
