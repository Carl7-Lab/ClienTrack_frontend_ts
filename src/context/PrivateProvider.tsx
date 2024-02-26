import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { useToast } from '@chakra-ui/react';

import {
  AddressPropsBD,
  ClientPropsBD,
  CollectionPropsBD,
  GetClientProps,
  GetCollectionProps,
  GetSaleProps,
  PrivateContextProps,
  PrivateProviderProps,
  SalePropsBD,
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
import { formatDate } from '../helpers/formatDate';

const PrivateContext = createContext<PrivateContextProps>(
  {} as PrivateContextProps,
);

export const PrivateProvider = ({ children }: PrivateProviderProps) => {
  const [clients, setClients] = useState<ClientPropsBD[]>([]);
  const [client, setClient] = useState<ClientPropsBD>({});
  const [totalClients, setTotalClients] = useState(0);
  const [address, setAddress] = useState<AddressPropsBD>({});
  const [sales, setSales] = useState<SalePropsBD[]>([]);
  const [sale, setSale] = useState<SalePropsBD>({});
  const [totalSales, setTotalSales] = useState(0);
  const [collections, setCollections] = useState<CollectionPropsBD[]>([]);
  const [collection, setCollection] = useState<CollectionPropsBD>({});
  const [totalCollections, setTotalCollections] = useState(0);

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
    setInitialSale,
  } = useSale();

  const {
    initialCollection,
    inputsCollection,
    isOpenCollectionModal,
    validationCollectionModal,
    onCloseCollectionModal,
    onOpenCollectionModal,
    setInitialCollection,
  } = useCollection();

  const { isOpenSearchModal, onCloseSearchModal, onOpenSearchModal } =
    useSearch();

  const getClients = async ({ searchValue, limit, page }: GetClientProps) => {
    try {
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
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
      setClients([]);
    }
  };

  const getClient = async (idClient: string) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setClient({});
      navigate('/login/clients');
    }
  };

  const getSales = async ({
    idClient,
    page,
    limit,
    startDate,
    endDate,
  }: GetSaleProps) => {
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
        `/purchases/?client=${idClient || ''}&page=${page}&limit=${limit}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
        config,
      );
      setSales(data.data.purchases);
      setTotalSales(data.data.pagination.total);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setSales([]);
    }
  };

  const getCollections = async ({
    idClient,
    page,
    limit,
    startDate,
    endDate,
  }: GetCollectionProps) => {
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
        `/payments/?client=${idClient || ''}&page=${page}&limit=${limit}&startDate=${startDate || ''}&endDate=${endDate || ''}`,
        config,
      );
      setCollections(data.data.payments);
      setTotalCollections(data.data.pagination.total);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setCollections([]);
    }
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

  const handleSale = (values: SalePropsBD) => {
    setSale(values);

    setInitialSale({
      date: formatDate(values.date || ''),
      items: (values.items ?? []).map((item) => ({
        name: item.name || '',
        description: item.description || '',
        value: item.value || 0,
        returned: item.returned || false,
      })),
      note: values.note ?? '',
      typePay: values.typePay ?? '',
    });
  };

  const handleResetSale = () => {
    setSale({});
    setInitialSale({
      date: '',
      items: [{ name: '', description: '', value: 0, returned: false }],
      note: '',
      typePay: '',
    });
  };

  const handleCollection = (values: CollectionPropsBD) => {
    setCollection(values);

    setInitialCollection({
      date: formatDate(values.date || ''),
      value: values.value || 0,
      note: values.note ?? '',
    });
  };

  const handleResetCollection = () => {
    setCollection({});
    setInitialCollection({
      date: '',
      value: 0,
      note: '',
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

        toast({
          title: 'Cliente Agregado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      if (pathname === '/login/clients') handleResetClient();
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

      if (pathname === '/login/clients') handleResetAddress();
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

      if (sale._id) {
        const { data } = await clientAxios.put(
          `/purchases/${sale._id}`,
          {
            updatePurchase: values,
          },
          config,
        );

        const updatePurchases = sales.map((saleState) =>
          saleState._id === data.data.updatePurchase._id
            ? data.data.updatePurchase
            : saleState,
        );

        setSales(updatePurchases);

        toast({
          title: 'Venta Actualizada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const { data } = await clientAxios.post(
          `/purchases`,
          { newPurchase: { ...values, client: client._id } },
          config,
        );

        setSales([data.data.purchase, ...sales]);

        toast({
          title: 'Venta Agregada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      onCloseSaleModal();
      handleResetSale();
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

      if (collection._id) {
        const { data } = await clientAxios.put(
          `/payments/${collection._id}`,
          {
            updatePayment: values,
          },
          config,
        );

        const updatePayments = collections.map((collectionState) =>
          collectionState._id === data.data.updatePayment._id
            ? data.data.updatePayment
            : collectionState,
        );

        setCollections(updatePayments);

        toast({
          title: 'Cobro Actualizado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        const { data } = await clientAxios.post(
          `/payments`,
          { newPayment: { ...values, client: client._id } },
          config,
        );
        setCollections([data.data.payment, ...collections]);

        toast({
          title: 'Cobro Agregado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      handleResetCollection();
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

  return (
    <PrivateContext.Provider
      value={{
        pathname,
        totalClients,
        totalSales,
        totalCollections,

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

        sales,
        sale,
        initialSale,
        isOpenSaleModal,
        validationSaleModal,
        handleSale,
        handleResetSale,
        getSales,
        onCloseSaleModal,
        onOpenSaleModal,
        onSubmitSaleModal,

        collections,
        collection,
        initialCollection,
        inputsCollection,
        isOpenCollectionModal,
        validationCollectionModal,
        handleCollection,
        handleResetCollection,
        getCollections,
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
