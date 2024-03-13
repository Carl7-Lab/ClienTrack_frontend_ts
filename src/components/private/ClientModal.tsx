import { Form, Formik } from 'formik';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from '@chakra-ui/react';

import usePrivate from '../../hooks/private/usePrivate';
import { ButtonCustom } from '../authFormik';
import { InputModal } from '.';

import { colors } from '../../styles/colors';

const ClientModal = () => {
  const {
    pathname,
    client,
    initialClient,
    inputsClient,
    isOpenClientModal,
    validationClientModal,
    handleResetClient,
    onCloseClientModal,
    onSubmitClientModal,
  } = usePrivate();

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenClientModal}
        onClose={() => {
          onCloseClientModal();
          if (pathname === '/app/clients') handleResetClient();
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
