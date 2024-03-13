import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  FormLabel,
  Box,
  HStack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik } from 'formik';

import usePrivate from '../../hooks/private/usePrivate';
import { InputModal } from '.';
import { ButtonCustom } from '../authFormik';

import { addStyle } from '../authFormik/ButtonCustom';
import { TiDelete } from 'react-icons/ti';
import { colors } from '../../styles/colors';

const SaleModal = () => {
  const {
    initialSale,
    isOpenSaleModal,
    validationSaleModal,
    onCloseSaleModal,
    onSubmitSaleModal,
  } = usePrivate();

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenSaleModal}
        onClose={() => {
          onCloseSaleModal();
        }}
      >
        <ModalOverlay />
        <ModalContent mx="10px">
          <ModalHeader textColor={colors.one} fontWeight="bold">
            <Text>Agregar Venta</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={initialSale}
              validationSchema={validationSaleModal}
              onSubmit={onSubmitSaleModal}
            >
              {({ values }) => (
                <Form>
                  <InputModal
                    label="Fecha"
                    name="date"
                    type="date"
                    isReq={true}
                  />

                  <HStack>
                    {['Nombre', 'Descripción', 'Precio'].map((label, index) => (
                      <FormLabel
                        key={index}
                        fontSize="17px"
                        fontWeight="bold"
                        textColor={colors.two}
                      >
                        {label}
                      </FormLabel>
                    ))}

                    {false && (
                      <FormLabel
                        fontSize="17px"
                        fontWeight="bold"
                        textColor={colors.two}
                      >
                        Devuelto
                      </FormLabel>
                    )}
                    <FormLabel></FormLabel>
                  </HStack>

                  <FieldArray name="items">
                    {(arrayHelpers) => (
                      <VStack spacing={4} align="stretch">
                        {values.items.map((item, index) => (
                          <Box key={index}>
                            <HStack spacing={4}>
                              {['name', 'description', 'value'].map(
                                (field, i) => (
                                  <InputModal
                                    key={i}
                                    label=""
                                    name={`items[${index}].${field}`}
                                    type={field === 'value' ? 'number' : 'text'}
                                    placeholder={
                                      field === 'value'
                                        ? '0'
                                        : capitalizeFirstLetter(field)
                                    }
                                  />
                                ),
                              )}

                              {false && (
                                <InputModal
                                  label=""
                                  name="{`items[${index}].returned`}"
                                  type="checkbox"
                                  isChecked={values.items[index].returned}
                                  placeholder="Articulo"
                                />
                              )}

                              <IconButton
                                isRound={true}
                                variant="solid"
                                colorScheme="red"
                                aria-label="Delete"
                                fontSize="20px"
                                icon={<TiDelete />}
                                isDisabled={values.items.length === 1}
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              />
                            </HStack>
                          </Box>
                        ))}
                        <Button
                          onClick={() =>
                            arrayHelpers.push({
                              name: '',
                              description: '',
                              value: 0,
                              returned: false,
                            })
                          }
                          {...addStyle}
                          mb="10px"
                        >
                          Agregar Articulo
                        </Button>
                      </VStack>
                    )}
                  </FieldArray>

                  <InputModal
                    label="Nota"
                    name="note"
                    type="text"
                    placeholder="Nota"
                  />

                  <InputModal
                    label="Tipo de Pago"
                    name="typePay"
                    type="selectPay"
                    placeholder="Seleccione Tipo de Pago"
                    isReq={true}
                  />

                  <ButtonCustom text="Agregar Venta" mt="30px" />
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaleModal;
