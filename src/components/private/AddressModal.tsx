import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiSolidLocationPlus } from 'react-icons/bi';
import { colors } from '../../styles/colors';
import { Form, Formik } from 'formik';
import { InputModal } from '.';
import ButtonCustom from '../authFormik/ButtonCustom';
import usePrivate from '../../hooks/private/usePrivate';
import { ClientPropsBD } from '../../interface/PrivateProps';

const AddressModal = ({ valueC }: { valueC: ClientPropsBD }) => {
  const {
    address,
    initialAddress,
    inputsAddress,
    isOpenAdressModal,
    validationAdressModal,
    onCloseAddressModal,
    onOpenAddressModal,
    onSubmitAddressModal,
    handleResetAddress,
    handleClient,
  } = usePrivate();

  return (
    <>
      <Button
        leftIcon={<BiSolidLocationPlus size="25px" />}
        onClick={() => {
          onOpenAddressModal();
          handleResetAddress();
          handleClient(valueC);
        }}
        variant="solid"
        mx="5px"
        p="0px"
        pl="5px"
        height="30px"
        textColor={colors.white}
        backgroundColor={colors.one}
        width={{ sm: '20px', md: '120px' }}
        _hover={{
          backgroundColor: colors.one_light,
          textColor: colors.one,
          fontWeight: 'bold',
        }}
        _active={{
          backgroundColor: colors.three,
          textColor: colors.one,
          fontWeight: 'bold',
        }}
      >
        <Text display={{ base: 'none', md: 'block' }}>Agregar</Text>
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenAdressModal}
        onClose={() => {
          onCloseAddressModal();
          handleResetAddress();
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
