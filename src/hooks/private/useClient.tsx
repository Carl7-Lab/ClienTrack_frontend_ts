import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import * as Yup from 'yup';

import { InputProps } from '../../components/private/InputModal';
import { AddressProps } from '../../hooks/private';

export interface ValuesProps {
  name: string;
  lastName?: string;
  cell: string;
  email?: string;
  description?: string;
  alias?: string;
  addresses: AddressProps[];
}

const inputsClient: InputProps[] = [
  {
    label: 'Nombre',
    name: 'name',
    type: 'text',
    placeholder: 'Nombre del Cliente',
    isReq: true,
  },
  {
    label: 'Apellido',
    name: 'lastName',
    type: 'text',
    placeholder: 'Apellido del Cliente',
  },
  {
    label: 'Celular',
    name: 'cell',
    type: 'text',
    placeholder: 'Celular del Cliente',
    isReq: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email del Cliente',
  },
  {
    label: 'Nota',
    name: 'description',
    type: 'text',
    placeholder: 'Ingrese una Nota',
  },
  {
    label: 'Alias',
    name: 'alias',
    type: 'text',
    placeholder: 'Alias del Cliente',
  },
];

const useClient = () => {
  const [initialClient, setInitialClient] = useState<ValuesProps>({
    name: '',
    lastName: '',
    cell: '',
    email: '',
    description: '',
    alias: '',
    addresses: [],
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOpenClientModal = isOpen;

  const onOpenClientModal = () => {
    onOpen();
  };

  const onCloseClientModal = () => {
    onClose();
  };

  const validationClientModal = Yup.object({
    name: Yup.string()
      .min(2, 'Debe de tener 2 caracteres como minimo')
      .required('Requerido'),
    lastName: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
    cell: Yup.string()
      .min(10, 'Debe de tener 10 caracteres como minimo')
      .required('Requerido'),
    email: Yup.string().email('Correo no tiene un formato válido'),
    description: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
    alias: Yup.string().min(2, 'Debe de tener 2 caracteres como minimo'),
  });

  return {
    initialClient,
    inputsClient,
    isOpenClientModal,
    validationClientModal,
    onCloseClientModal,
    onOpenClientModal,
    setInitialClient,
  };
};

export default useClient;
