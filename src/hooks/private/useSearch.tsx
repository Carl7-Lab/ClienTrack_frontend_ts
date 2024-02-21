import { useDisclosure } from '@chakra-ui/react';

const useSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isOpenSearchModal = isOpen;

  const onOpenSearchModal = () => {
    onOpen();
  };

  const onCloseSearchModal = () => {
    onClose();
  };
  return { isOpenSearchModal, onOpenSearchModal, onCloseSearchModal };
};

export default useSearch;
