import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';

import { MdPersonSearch } from 'react-icons/md';
import { MdDoubleArrow } from 'react-icons/md';
import { colors } from '../../styles/colors';

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState('');
  const initialRef = useRef(null);
  const { clients, isOpenSearchModal, onCloseSearchModal, getClients } =
    usePrivate();

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpenSearchModal}
      onClose={() => {
        setSearchValue('');
        onCloseSearchModal();
      }}
    >
      <ModalOverlay />
      <ModalContent mx="10px">
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

          {clients.map((client) => (
            <Card
              key={client._id}
              my="4px"
              _hover={{ backgroundColor: 'gray.100' }}
              _active={{ backgroundColor: 'gray.200' }}
              onClick={() => {
                console.log(client._id);
              }}
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
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
