import { useState } from 'react';
import * as Yup from 'yup';
import { useDisclosure } from '@chakra-ui/react';

export interface ItemProps {
  name: string;
  description: string;
  value: number;
  returned: boolean;
}

export interface ValuesProps {
  date: string;
  items: ItemProps[];
  note: string;
  typePay: 'Contado' | 'Credito' | '';
}

const useSale = () => {
  const [initialSale, setInitialSale] = useState<ValuesProps>({
    date: '',
    items: [{ name: '', description: '', value: 0, returned: false }],
    note: '',
    typePay: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOpenSaleModal = isOpen;

  const onOpenSaleModal = () => {
    onOpen();
  };

  const onCloseSaleModal = () => {
    onClose();
  };

  const itemSchema = Yup.object({
    name: Yup.string().required('Requerido').min(2, 'Mínimo 2 caracteres'),
    description: Yup.string()
      .required('Requerido')
      .min(2, 'Mínimo 2 caracteres'),
    value: Yup.number().required('Requerido').positive('Mayor a 0'),
    returned: Yup.boolean(),
  });

  const validationSaleModal = Yup.object({
    date: Yup.string().required('Requerido'),
    items: Yup.array().of(itemSchema).required('Requerido'),
    note: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
    typePay: Yup.string()
      .required('Requerido')
      .oneOf(['Contado', 'Credito'], 'Tipo de pago no válido'),
  });

  return {
    initialSale,
    isOpenSaleModal,
    validationSaleModal,
    onOpenSaleModal,
    onCloseSaleModal,
    setInitialSale,
  };
};

export default useSale;
