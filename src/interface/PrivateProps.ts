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
  resetVar: () => void;

  firstMoveDate: string;
  report: ReportProps;
  rowsKardex: RowKardexProps[];
  debtors: DebtorProps[];
  getReport: ({
    startDate,
    endDate,
  }: {
    startDate?: string | undefined;
    endDate?: string | undefined;
  }) => Promise<void>;
  getDebtors: () => Promise<void>;
  totalRows: number;
  getKardex: ({
    idClient,
    page,
    limit,
    startDate,
    endDate,
  }: GetKardexProps) => Promise<void>;

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

  initialSale: SaleProps;
  isOpenSaleModal: boolean;
  validationSaleModal: ValidationSaleModal;
  onCloseSaleModal: () => void;
  onOpenSaleModal: () => void;
  onSubmitSaleModal: (values: SaleProps) => Promise<void>;

  initialCollection: CollectionProps;
  inputsCollection: InputProps[];
  isOpenCollectionModal: boolean;
  validationCollectionModal: ValidationCollectionModal;
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
  reason?: string;
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

export interface ClientReportProps {
  clientId?: string;
  name?: string;
  lastName?: string;
  alias?: string;
  value?: number;
}

export interface TransactionDetailProps {
  value?: number;
  clientsDetails?: ClientReportProps[];
}

export interface ReportProps {
  purchases?: TransactionDetailProps;
  payments?: {
    value?: number;
    paymentsDetails?: TransactionDetailProps;
    purchasesPayDetails?: TransactionDetailProps;
    returnsDetails?: TransactionDetailProps;
  };
}

export interface GetKardexProps {
  idClient: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface RowKardexProps {
  balance?: number;
  credit?: number;
  date?: string;
  debit?: number;
  description?: string;
  typeModel?: 'Payment' | 'Purchase';
  type?: SalePropsBD | CollectionPropsBD;
}

export interface DebtorProps {
  client?: ClientPropsBD;
  lastRowKardex?: RowKardexProps;
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
