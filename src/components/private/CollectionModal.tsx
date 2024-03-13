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

import usePrivate from '../../hooks/private/usePrivate';
import { InputModal } from '.';
import { ButtonCustom } from '../authFormik';

import { colors } from '../../styles/colors';

const CollectionModal = () => {
  const {
    isOpenCollectionModal,
    inputsCollection,
    initialCollection,
    validationCollectionModal,
    onSubmitCollectionModal,
    onCloseCollectionModal,
  } = usePrivate();

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpenCollectionModal}
      onClose={() => {
        onCloseCollectionModal();
      }}
    >
      <ModalOverlay />
      <ModalContent mx="10px">
        <ModalHeader textColor={colors.one} fontWeight="bold">
          <Text>Agregar Cobro</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialCollection}
            onSubmit={onSubmitCollectionModal}
            validationSchema={validationCollectionModal}
          >
            <Form>
              <VStack spacing={4} align="flex-start">
                {inputsCollection.map((collection) => (
                  <InputModal key={collection.name} {...collection} />
                ))}

                <InputModal
                  label="Razon de Cobro"
                  name="reason"
                  type="selectReason"
                  placeholder="Seleccione Razon de Pago"
                  isReq={true}
                />

                <ButtonCustom text="Agregar Cobro" />
              </VStack>
            </Form>
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CollectionModal;
