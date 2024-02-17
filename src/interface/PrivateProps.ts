import {
  // Dispatch,
  ReactNode,
} from 'react';
import * as Yup from 'yup';
import { ValuesProps as ClientProps } from '../hooks/private/useClient';
import { ValuesProps as AddressProps } from '../hooks/private/useAddress';
import { InputProps } from '../components/private/InputModal';
import { ToastId } from '@chakra-ui/react';

export interface PrivateProviderProps {
  children?: ReactNode;
}

export type PrivateContextProps = {
  clients: ClientPropsBD[];
  client: ClientPropsBD;
  address: AddressPropsBD;
  handleClient: (values: ClientPropsBD) => void;
  handleResetClient: () => void;

  initialClient: ClientProps;
  inputsClient: InputProps[];
  isOpenClientModal: boolean;
  validationClientModal: ValidationClientModal;
  onCloseClientModal: () => void;
  onOpenClientModal: () => void;
  onSubmitClientModal: (values: ClientProps) => Promise<void>;

  initialAddress: AddressProps;
  inputsAddress: InputProps[];
  isOpenAdressModal: boolean;
  validationAdressModal: ValidationAddressModal;
  handleAddress: ({
    valueA,
    valueC,
  }: {
    valueA: AddressPropsBD;
    valueC: ClientPropsBD;
  }) => void;
  handleResetAddress: () => void;
  onCloseAddressModal: () => void;
  onOpenAddressModal: () => void;
  onSubmitAddressModal: (values: AddressProps) => Promise<ToastId | undefined>;
};

export interface ClientPropsBD {
  addresses?: AddressPropsBD[];
  alias?: string;
  cell?: string;
  description?: string;
  email?: string;
  lastName?: string;
  name?: string;
  seller?: string;
  _id?: string;
}

export interface AddressPropsBD {
  city?: string;
  description?: string;
  location?: string;
  streets?: string;
  _id?: string;
}

type ValidationClientModal = Yup.ObjectSchema<
  {
    name: string;
    lastName: string | undefined;
    cell: string;
    email: string | undefined;
    description: string | undefined;
    alias: string | undefined;
  },
  Yup.AnyObject,
  {
    name: undefined;
    lastName: undefined;
    cell: undefined;
    email: undefined;
    description: undefined;
    alias: undefined;
  },
  ''
>;

type ValidationAddressModal = Yup.ObjectSchema<
  {
    streets: string;
    city: string;
    description: string | undefined;
    location: string | undefined;
  },
  Yup.AnyObject,
  {
    streets: undefined;
    city: undefined;
    description: undefined;
    location: undefined;
  },
  ''
>;
