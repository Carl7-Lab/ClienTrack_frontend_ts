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
import { useState } from 'react';

const ClientModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            <Text>{client._id ? 'Editar Cliente' : 'Agregar Cliente'}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialClient}
              validationSchema={validationClientModal}
              onSubmit={async (values) => {
                if (!isSubmitting) {
                  setIsSubmitting(true);
                  await onSubmitClientModal(values);
                  setIsSubmitting(false);
                }
              }}
            >
              <Form>
                <VStack spacing={4} align="flex-start">
                  {inputsClient.map((input) => (
                    <InputModal key={input.name} {...input} />
                  ))}
                  <ButtonCustom
                    text={client._id ? 'Editar Cliente' : 'Agregar Cliente'}
                    isSubmitting={isSubmitting}
                  />
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
