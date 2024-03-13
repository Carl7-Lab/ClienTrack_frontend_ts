import { useState } from 'react';
import * as Yup from 'yup';
import { useDisclosure } from '@chakra-ui/react';

import { InputProps } from '../../components/private/InputModal';

export interface ValuesProps {
  date: string;
  value: number;
  reason: 'Pago' | 'Devolucion' | '';
  note?: string;
}

const inputsCollection: InputProps[] = [
  {
    label: 'Fecha',
    name: 'date',
    type: 'date',
    isReq: true,
  },
  {
    label: 'Valor',
    name: 'value',
    type: 'number',
    isReq: true,
  },
  {
    label: 'Nota',
    name: 'note',
    type: 'text',
  },
];

const useCollection = () => {
  const [initialCollection, setInitialCollection] = useState<ValuesProps>({
    date: '',
    value: 0,
    reason: '',
    note: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOpenCollectionModal = isOpen;

  const onOpenCollectionModal = () => {
    onOpen();
  };

  const onCloseCollectionModal = () => {
    onClose();
  };

  const validationCollectionModal = Yup.object({
    date: Yup.string().required('Requerido'),
    value: Yup.number().required('Requerido').positive('Mayor a 0'),
    reason: Yup.string()
      .required('Requerido')
      .oneOf(['Pago', 'Devolucion'], 'Razón no válido'),
    note: Yup.string().min(2, 'Mínimo 2 caracteres'),
  });

  return {
    initialCollection,
    inputsCollection,
    isOpenCollectionModal,
    validationCollectionModal,
    onOpenCollectionModal,
    onCloseCollectionModal,
    setInitialCollection,
  };
};

export default useCollection;
