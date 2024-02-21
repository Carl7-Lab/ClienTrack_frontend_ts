import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import * as Yup from 'yup';

import { InputProps } from '../../components/private/InputModal';

export interface ValuesProps {
  streets: string;
  city: string;
  location?: string;
  description?: string;
}

const inputsAddress: InputProps[] = [
  {
    label: 'Calles',
    name: 'streets',
    type: 'text',
    placeholder: 'Calle Principal, Calles Secundaria',
    isReq: true,
  },
  {
    label: 'Ciudad',
    name: 'city',
    type: 'text',
    placeholder: 'Ciudad',
    isReq: true,
  },
  {
    label: 'Referencia',
    name: 'description',
    type: 'text',
    placeholder: 'Referencia',
  },
  {
    label: 'Ubicación',
    name: 'location',
    type: 'text',
    placeholder: 'Ubicación',
  },
];

const useAddress = () => {
  const [initialAddress, setInitialAddress] = useState<ValuesProps>({
    streets: '',
    city: '',
    location: '',
    description: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOpenAdressModal = isOpen;

  const onOpenAddressModal = () => {
    onOpen();
  };

  const onCloseAddressModal = () => {
    onClose();
  };

  const validationAdressModal = Yup.object({
    streets: Yup.string().required('Requerido'),
    city: Yup.string().required('Requerido'),
    location: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
    description: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
  });

  return {
    initialAddress,
    inputsAddress,
    isOpenAdressModal,
    validationAdressModal,
    onOpenAddressModal,
    onCloseAddressModal,
    setInitialAddress,
  };
};

export default useAddress;
