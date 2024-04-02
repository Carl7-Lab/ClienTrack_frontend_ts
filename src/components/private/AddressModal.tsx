import { Form, Formik } from 'formik';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

import { InputModal } from '.';
import usePrivate from '../../hooks/private/usePrivate';
import ButtonCustom from '../authFormik/ButtonCustom';

import { colors } from '../../styles/colors';
import { useState } from 'react';

const AddressModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    pathname,
    address,
    initialAddress,
    inputsAddress,
    isOpenAdressModal,
    validationAdressModal,
    onCloseAddressModal,
    onSubmitAddressModal,
    handleResetAddress,
  } = usePrivate();

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenAdressModal}
        onClose={() => {
          onCloseAddressModal();
          if (pathname === '/app/clients') handleResetAddress();
        }}
      >
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader textColor={colors.one} fontWeight="bold">
            <Text>
              {address._id ? 'Editar Dirección' : 'Agregar Dirección'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialAddress}
              validationSchema={validationAdressModal}
              onSubmit={async (values) => {
                if (!isSubmitting) {
                  setIsSubmitting(true);
                  await onSubmitAddressModal(values);
                  setIsSubmitting(false);
                }
              }}
            >
              <Form>
                <VStack spacing={4} align="flex-start">
                  {inputsAddress.map((input) => (
                    <InputModal key={input.name} {...input} />
                  ))}
                  <ButtonCustom
                    text={
                      address._id ? 'Editar Dirección' : 'Agregar Dirección'
                    }
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

export default AddressModal;
