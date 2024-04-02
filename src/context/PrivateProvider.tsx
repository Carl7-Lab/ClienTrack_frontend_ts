import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { useToast } from '@chakra-ui/react';

import {
  AddressPropsBD,
  ClientPropsBD,
  DebtorProps,
  GetClientProps,
  GetKardexProps,
  PrivateContextProps,
  PrivateProviderProps,
  ReportProps,
  RowKardexProps,
} from '../interface/PrivateProps';

import {
  AddressProps,
  ClientProps,
  CollectionProps,
  SaleProps,
  useAddress,
  useClient,
  useCollection,
  useSale,
  useSearch,
} from '../hooks/private';

const PrivateContext = createContext<PrivateContextProps>(
  {} as PrivateContextProps,
);

export const PrivateProvider = ({ children }: PrivateProviderProps) => {
  const [clients, setClients] = useState<ClientPropsBD[]>([]);
  const [client, setClient] = useState<ClientPropsBD>({});
  const [totalClients, setTotalClients] = useState(0);
  const [address, setAddress] = useState<AddressPropsBD>({});
  const [report, setReport] = useState<ReportProps>({});
  const [rowsKardex, setRowsKardex] = useState<RowKardexProps[]>([]);
  const [firstMoveDate, setFirstMoveDate] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [debtors, setDebtors] = useState<DebtorProps[]>([]);

  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingReport, setLoadingReport] = useState(true);
  const [loadingDebtors, setLoadingDebtors] = useState(true);
  const [loadingClient, setLoadingClient] = useState(true);
  const [loadingKardex, setLoadingKardex] = useState(true);

  const { pathname } = useLocation();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    initialClient,
    inputsClient,
    isOpenClientModal,
    validationClientModal,
    onCloseClientModal,
    onOpenClientModal,
    setInitialClient,
  } = useClient();

  const {
    initialAddress,
    inputsAddress,
    isOpenAdressModal,
    validationAdressModal,
    onCloseAddressModal,
    onOpenAddressModal,
    setInitialAddress,
  } = useAddress();

  const {
    initialSale,
    isOpenSaleModal,
    validationSaleModal,
    onCloseSaleModal,
    onOpenSaleModal,
  } = useSale();

  const {
    initialCollection,
    inputsCollection,
    isOpenCollectionModal,
    validationCollectionModal,
    onCloseCollectionModal,
    onOpenCollectionModal,
  } = useCollection();

  const { isOpenSearchModal, onCloseSearchModal, onOpenSearchModal } =
    useSearch();

  const getClients = async ({ searchValue, limit, page }: GetClientProps) => {
    try {
      setLoadingClients(true);
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (page === undefined) {
        page = 1;
      }
      if (limit === undefined) {
        limit = 5;
      }

      const { data } = await clientAxios(
        `/clients/?search=${searchValue}&page=${page}&limit=${limit}`,
        config,
      );
      setClients(data.data.clients);
      setTotalClients(data.data.pagination.total);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setClients([]);
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
    setLoadingClients(false);
  };

  const getClient = async (idClient: string) => {
    setLoadingClient(true);
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clientAxios(`/clients/${idClient}`, config);
      setClient(data.data.client);
      setFirstMoveDate(data.data.firstMoveDate);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setClient({});
      navigate('/app/clients');
    }
    setLoadingClient(false);
  };

  const getReport = async ({
    startDate,
    endDate,
  }: {
    startDate?: string;
    endDate?: string;
  }) => {
    setLoadingReport(true);

    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clientAxios(
        `/analytics/report/?startDate=${startDate || ''}&endDate=${endDate || ''}`,
        config,
      );
      setReport(data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setReport({});
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingReport(false);
  };

  const getKardex = async ({
    idClient,
    page,
    limit,
    startDate,
    endDate,
  }: GetKardexProps) => {
    setLoadingKardex(true);
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (page === undefined) {
      page = 1;
    }
    if (limit === undefined) {
      limit = 5;
    }

    try {
      const { data } = await clientAxios(
        `/analytics/kardex/${idClient}?page=${page}&limit=${limit}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
        config,
      );
      setTotalRows(data.data.pagination.total);
      setRowsKardex(data.data.rowsKardex);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setRowsKardex([]);
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingKardex(false);
  };

  const getDebtors = async () => {
    setLoadingDebtors(true);
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clientAxios(`/analytics/client-reports`, config);
      // console.log('obtener deudores', data.data.debtors);
      setDebtors(data.data.debtors);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setDebtors([]);
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingDebtors(false);
  };

  const handleClient = (values: ClientPropsBD) => {
    setClient(values);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, seller, addresses, ...getClient } = values;
    setInitialClient(getClient as ClientProps);
  };

  const handleResetClient = () => {
    setClient({});
    setInitialClient({
      name: '',
      lastName: '',
      cell: '',
      email: '',
      description: '',
      alias: '',
      addresses: [],
    });
  };

  const handleAddress = ({
    valueA,
    valueC,
  }: {
    valueA: AddressPropsBD;
    valueC: ClientPropsBD;
  }) => {
    setAddress(valueA);
    handleClient(valueC);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...getAddress } = valueA;
    setInitialAddress(getAddress as AddressProps);
  };

  const handleResetAddress = () => {
    setAddress({});
    handleResetClient();
    setInitialAddress({
      streets: '',
      city: '',
      location: '',
      description: '',
    });
  };

  const onSubmitClientModal = async (values: ClientProps) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (client._id) {
        const addressesClient = client.addresses?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ _id, ...addressClient }) => addressClient,
        );
        const updateClient = {
          ...values,
          addresses: addressesClient,
        };

        const { data } = await clientAxios.put(
          `/clients/${client._id}`,
          { updateClient },
          config,
        );
        setClient(data.data.updateClient);

        const updateClients = clients.map((clientState) =>
          clientState._id === data.data.updateClient._id
            ? data.data.updateClient
            : clientState,
        );
        setClients(updateClients);

        toast({
          title: 'Cliente Editado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const { data } = await clientAxios.post(
          '/clients',
          { newClient: values },
          config,
        );
        setClients([data.data.client, ...clients]);
        setTotalClients((prevTotalClients) => prevTotalClients + 1);

        toast({
          title: 'Cliente Agregado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      if (pathname === '/app/clients') handleResetClient();
      onCloseClientModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmitAddressModal = async (values: AddressProps) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const updateClient = client;
      let addressesClient = client.addresses;
      const formAddress = values;

      if (addressesClient === undefined) {
        return toast({
          title: 'Dirección No Encontrada',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      if (address._id) {
        const indexAddress = addressesClient.findIndex(
          (addressState) => addressState._id === address._id,
        );

        if (indexAddress !== -1) {
          addressesClient[indexAddress] = {
            ...addressesClient[indexAddress],
            ...formAddress,
          };
        }

        toast({
          title: 'Dirección Editada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        addressesClient = [...addressesClient, formAddress];

        toast({
          title: 'Dirección Agregada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      updateClient.addresses = addressesClient;

      const { data } = await clientAxios.put(
        `/clients/${client._id}`,
        { updateClient },
        config,
      );

      const updateClients = clients.map((clientState) =>
        clientState._id === data.data.updateClient._id
          ? data.data.updateClient
          : clientState,
      );
      setClients(updateClients);

      if (pathname === '/app/clients') handleResetAddress();
      onCloseAddressModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmitSaleModal = async (values: SaleProps) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/purchases`,
        { newPurchase: { ...values, client: client._id } },
        config,
      );

      setRowsKardex([data.data.rowKardex, ...rowsKardex]);

      toast({
        title: 'Venta Agregada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onCloseSaleModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmitCollectionModal = async (values: CollectionProps) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/payments`,
        { newPayment: { ...values, client: client._id } },
        config,
      );

      setRowsKardex([data.data.rowKardex, ...rowsKardex]);

      toast({
        title: 'Cobro Agregado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onCloseCollectionModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const resetVar = () => {
    setClients([]);
    setClient({});
    setTotalClients(0);
    setAddress({});
    setReport({});
    setRowsKardex([]);
    setFirstMoveDate('');
    setTotalRows(0);
    setDebtors([]);
  };

  return (
    <PrivateContext.Provider
      value={{
        loadingClients,
        loadingReport,
        loadingDebtors,
        loadingClient,
        loadingKardex,

        pathname,
        totalClients,
        report,
        debtors,
        resetVar,

        totalRows,
        rowsKardex,
        firstMoveDate,
        getReport,
        getDebtors,
        getKardex,

        clients,
        client,
        initialClient,
        inputsClient,
        isOpenClientModal,
        validationClientModal,
        getClients,
        getClient,
        handleClient,
        handleResetClient,
        onCloseClientModal,
        onOpenClientModal,
        onSubmitClientModal,

        address,
        initialAddress,
        inputsAddress,
        isOpenAdressModal,
        validationAdressModal,
        handleAddress,
        handleResetAddress,
        onCloseAddressModal,
        onOpenAddressModal,
        onSubmitAddressModal,

        initialSale,
        isOpenSaleModal,
        validationSaleModal,
        onCloseSaleModal,
        onOpenSaleModal,
        onSubmitSaleModal,

        initialCollection,
        inputsCollection,
        isOpenCollectionModal,
        validationCollectionModal,
        onCloseCollectionModal,
        onOpenCollectionModal,
        onSubmitCollectionModal,

        isOpenSearchModal,
        onCloseSearchModal,
        onOpenSearchModal,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};

export default PrivateContext;
