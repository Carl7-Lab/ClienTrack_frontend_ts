import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { useToast } from '@chakra-ui/react';
import { format } from 'date-fns';

import {
  AddressPropsBD,
  ClientPropsBD,
  CollectionPropsBD,
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

const PrivateContext = createContext<PrivateContextProps>(
  {} as PrivateContextProps,
);

export const PrivateProvider = ({ children }: PrivateProviderProps) => {
  const [clients, setClients] = useState<ClientPropsBD[]>([]);
  const [client, setClient] = useState<ClientPropsBD>({});
  const [address, setAddress] = useState<AddressPropsBD>({});
  const [sales, setSales] = useState<SalePropsBD[]>([]);
  const [sale, setSale] = useState<SalePropsBD>({});
  const [collections, setCollections] = useState<CollectionPropsBD[]>([]);
  const [collection, setCollection] = useState<CollectionPropsBD>({});
  const { pathname } = useLocation();

  const toast = useToast();

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

  const getClients = async ({ searchValue }: { searchValue?: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (searchValue) {
        const { data } = await clientAxios(
          `/clients/?search=${searchValue}`,
          config,
        );
        setClients(data.data.clients);
      } else {
        const { data } = await clientAxios('/clients', config);
        setClients(data.data.clients);
      }

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
    const { data } = await clientAxios(`/clients/${idClient}`, config);
    setClient(data.data.client);
  };

  const getSales = async ({ idClient }: { idClient?: string }) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (idClient !== undefined) {
      const { data } = await clientAxios(
        `/purchases/?client=${idClient}`,
        config,
      );
      setSales(data.data.purchasesList);
    }
    if (idClient === undefined) {
      const { data } = await clientAxios(`/purchases/`, config);
      setSales(data.data.purchasesList);
    }
  };

  const getCollections = async ({ idClient }: { idClient?: string }) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (idClient !== undefined) {
      const { data } = await clientAxios(
        `/payments/?client=${idClient}`,
        config,
      );
      setCollections(data.data.paymentsList);
    }
    if (idClient === undefined) {
      const { data } = await clientAxios(`/payments/`, config);
      setCollections(data.data.paymentsList);
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
      date: format(`${values.date}`, 'yyyy-MM-dd'),
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
      date: format(`${values.date}`, 'yyyy-MM-dd'),
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
          `/purchases/?client=${client._id}`,
          { newPurchase: values },
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
          `/payments/?client=${client._id}`,
          { newPayment: values },
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
