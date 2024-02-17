import { createContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import clientAxios from '../config/clientAxios';
import {
  AddressPropsBD,
  ClientPropsBD,
  PrivateContextProps,
  PrivateProviderProps,
} from '../interface/PrivateProps';
import useClient, {
  ValuesProps as ClientProps,
} from '../hooks/private/useClient';
import useAddress, {
  ValuesProps as AddressProps,
} from '../hooks/private/useAddress';

const PrivateContext = createContext<PrivateContextProps>(
  {} as PrivateContextProps,
);

export const PrivateProvider = ({ children }: PrivateProviderProps) => {
  const [clients, setClients] = useState<ClientPropsBD[]>([]);
  const [client, setClient] = useState<ClientPropsBD>({});
  // const [addresses, setAddresses] = useState<AddressPropsBD[]>([]);
  const [address, setAddress] = useState<AddressPropsBD>({});

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

  useEffect(() => {
    const getClients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios('/clients', config);

        setClients(data.data.clients);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast({
          title: error.response.data.message,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      }
    };

    getClients();
  }, [toast]);

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

        toast({
          title: 'Cliente Agregado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      handleResetClient();
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

      handleResetAddress();
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

  return (
    <PrivateContext.Provider
      value={{
        clients,
        client,
        address,
        handleClient,
        handleResetClient,

        initialClient,
        inputsClient,
        isOpenClientModal,
        validationClientModal,
        onCloseClientModal,
        onOpenClientModal,
        onSubmitClientModal,

        initialAddress,
        inputsAddress,
        isOpenAdressModal,
        validationAdressModal,
        handleAddress,
        handleResetAddress,
        onCloseAddressModal,
        onOpenAddressModal,
        onSubmitAddressModal,
      }}
    >
      {children}
    </PrivateContext.Provider>
  );
};

export default PrivateContext;
