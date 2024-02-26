import { ReactNode } from 'react';
import { ToastId } from '@chakra-ui/react';
import * as Yup from 'yup';

import {
  AddressProps,
  ClientProps,
  CollectionProps,
  SaleProps,
} from '../hooks/private';
import { InputProps } from '../components/private/InputModal';

export interface PrivateProviderProps {
  children?: ReactNode;
}

export type PrivateContextProps = {
  pathname: string;
  totalClients: number;
  totalSales: number;
  totalCollections: number;

  clients: ClientPropsBD[];
  client: ClientPropsBD;
  initialClient: ClientProps;
  inputsClient: InputProps[];
  isOpenClientModal: boolean;
  validationClientModal: ValidationClientModal;
  getClients: ({ searchValue, limit, page }: GetClientProps) => Promise<void>;
  getClient: (idClient: string) => Promise<void>;
  handleClient: (values: ClientPropsBD) => void;
  handleResetClient: () => void;
  onCloseClientModal: () => void;
  onOpenClientModal: () => void;
  onSubmitClientModal: (values: ClientProps) => Promise<void>;

  address: AddressPropsBD;
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

  sales: SalePropsBD[];
  sale: SalePropsBD;
  initialSale: SaleProps;
  isOpenSaleModal: boolean;
  validationSaleModal: ValidationSaleModal;
  getSales: ({ idClient, page, limit }: GetSaleProps) => Promise<void>;
  handleSale: (values: SalePropsBD) => void;
  handleResetSale: () => void;
  onCloseSaleModal: () => void;
  onOpenSaleModal: () => void;
  onSubmitSaleModal: (values: SaleProps) => Promise<void>;

  collections: CollectionPropsBD[];
  collection: CollectionPropsBD;
  initialCollection: CollectionProps;
  inputsCollection: InputProps[];
  isOpenCollectionModal: boolean;
  validationCollectionModal: ValidationCollectionModal;
  getCollections: ({
    idClient,
    page,
    limit,
  }: GetCollectionProps) => Promise<void>;
  handleCollection: (values: CollectionPropsBD) => void;
  handleResetCollection: () => void;
  onCloseCollectionModal: () => void;
  onOpenCollectionModal: () => void;
  onSubmitCollectionModal: (values: CollectionProps) => Promise<void>;

  isOpenSearchModal: boolean;
  onCloseSearchModal: () => void;
  onOpenSearchModal: () => void;
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

export interface ItemPropsBD {
  name?: string;
  description?: string;
  value?: number;
  returned?: boolean;
  _id?: string;
}

export interface SalePropsBD {
  date?: string;
  items?: ItemPropsBD[];
  note?: string;
  typePay?: 'Contado' | 'Credito' | '';
  value?: number;
  _id?: string;
  client?: {
    name?: string;
    lastName?: string;
    alias?: string;
    seller?: string;
    _id?: string;
  };
}

export interface CollectionPropsBD {
  date?: string;
  value?: number;
  note?: string;
  _id?: string;
  client?: {
    name?: string;
    lastName?: string;
    alias?: string;
    seller?: string;
    _id?: string;
  };
}

export interface GetClientProps {
  searchValue?: string;
  page?: number;
  limit?: number;
}

export interface GetSaleProps {
  idClient?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface GetCollectionProps {
  idClient?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
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

type ValidationSaleModal = Yup.ObjectSchema<
  {
    date: string;
    items: {
      returned?: boolean | undefined;
      name: string;
      description: string;
      value: number;
    }[];
    note: string | undefined;
    typePay: string;
  },
  Yup.AnyObject,
  {
    date: undefined;
    items: '';
    note: undefined;
    typePay: undefined;
  },
  ''
>;

type ValidationCollectionModal = Yup.ObjectSchema<
  {
    date: string;
    value: number;
    note: string | undefined;
  },
  Yup.AnyObject,
  {
    date: undefined;
    value: undefined;
    note: undefined;
  },
  ''
>;
