import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { ButtonCustom } from '../authFormik';
import { InputModal } from '.';
import { colors } from '../../styles/colors';
import usePrivate from '../../hooks/private/usePrivate';
import { ImUserPlus } from 'react-icons/im';

const ClientModal = () => {
  const {
    client,
    initialClient,
    inputsClient,
    isOpenClientModal,
    validationClientModal,
    handleResetClient,
    onCloseClientModal,
    onOpenClientModal,
    onSubmitClientModal,
  } = usePrivate();

  return (
    <>
      <Button
        leftIcon={<ImUserPlus size="24px" />}
        onClick={() => {
          handleResetClient();
          onOpenClientModal();
        }}
        variant="solid"
        p="0px"
        pl="10px"
        textColor={colors.white}
        backgroundColor={colors.one}
        fontWeight="bold"
        width={{ sm: '42px', md: '180px' }}
        _hover={{ backgroundColor: colors.white, textColor: colors.one }}
        _active={{
          backgroundColor: colors.three,
          textColor: colors.one,
          fontWeight: 'bold',
        }}
      >
        <Text display={{ base: 'none', md: 'block' }}>Agregar Cliente</Text>
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenClientModal}
        onClose={() => {
          onCloseClientModal();
          handleResetClient();
        }}
      >
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader textColor={colors.one} fontWeight="bold">
            {client._id ? (
              <Text>Editar Cliente</Text>
            ) : (
              <Text>Agregar Cliente</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialClient}
              onSubmit={onSubmitClientModal}
              validationSchema={validationClientModal}
            >
              <Form>
                <VStack spacing={4} align="flex-start">
                  {inputsClient.map((input) => (
                    <InputModal key={input.name} {...input} />
                  ))}
                  {client._id ? (
                    <ButtonCustom text="Editar Cliente" />
                  ) : (
                    <ButtonCustom text="Agregar Cliente" />
                  )}
                </VStack>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClientModal;
