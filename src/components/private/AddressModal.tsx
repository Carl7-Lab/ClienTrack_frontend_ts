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

const AddressModal = () => {
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
          if (pathname === '/login/clients') handleResetAddress();
        }}
      >
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader textColor={colors.one} fontWeight="bold">
            {address._id ? (
              <Text>Editar Dirección</Text>
            ) : (
              <Text>Agregar Dirección</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialAddress}
              onSubmit={onSubmitAddressModal}
              validationSchema={validationAdressModal}
            >
              <Form>
                <VStack spacing={4} align="flex-start">
                  {inputsAddress.map((input) => (
                    <InputModal key={input.name} {...input} />
                  ))}

                  {address._id ? (
                    <ButtonCustom text="Editar Dirección" />
                  ) : (
                    <ButtonCustom text="Agregar Dirección" />
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

export default AddressModal;
