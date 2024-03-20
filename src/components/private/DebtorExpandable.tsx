import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Th,
  Tr,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Flex,
  Thead,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addStyle } from '../authFormik/ButtonCustom';
import { DebtorProps } from '../../interface/PrivateProps';
import { formatDate } from '../../helpers/formatDate';

const DebtorExpandable = ({ debtor }: { debtor: DebtorProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [more, setMore] = useState(false);
  const { client, lastRowKardex } = debtor;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMore = () => {
    setMore(!more);
  };

  // console.log('ultima transaccion', lastRowKardex);
  return (
    <>
      <Tr>
        <Th height="60px" alignItems="center">
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle}
            aria-label={isOpen ? 'Cerrar' : 'Expandir'}
            {...addStyle}
          />
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center">
          <Text>
            {client && client.name + ' ' + client.lastName}
            <Text as="span" display={client && client.alias ? 'bolk' : 'none'}>
              {client && ' (' + client.alias + ') '}
            </Text>
          </Text>
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center">
          ${lastRowKardex?.balance?.toFixed(2)}
        </Th>
      </Tr>
      {isOpen && (
        <>
          <Tr backgroundColor="gray.100">
            <Td colSpan={4}>
              <Box p="20px" width="97%" mx="auto">
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td colSpan={3}>Ultimo Movimiento</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {lastRowKardex &&
                          lastRowKardex.date &&
                          formatDate(lastRowKardex?.date)}
                      </Td>
                      {lastRowKardex?.description?.includes('Compra') && (
                        <Td>${lastRowKardex?.debit?.toFixed(2)}</Td>
                      )}
                      {lastRowKardex?.description?.includes('Pago') ||
                        (lastRowKardex?.description?.includes('Devolucion') && (
                          <Td>${lastRowKardex?.credit?.toFixed(2)}</Td>
                        ))}
                      <Td>
                        <IconButton
                          icon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          onClick={handleMore}
                          aria-label={more ? 'Cerrar' : 'Expandir'}
                          {...addStyle}
                        />
                      </Td>
                    </Tr>
                    {more && (
                      <Tr>
                        <Td colSpan={3}>
                          <Box p="0" width="80%" mx="auto">
                            <Flex
                              alignItems="center"
                              justify-content="center"
                              justify="space-between"
                              align="center"
                              mb="10px"
                            >
                              <Text>{lastRowKardex?.description}</Text>
                            </Flex>
                            {lastRowKardex?.typeModel === 'Purchase' && (
                              <Table variant="simple" size="sm">
                                <Thead>
                                  <Tr>
                                    <Th>Articulo</Th>
                                    <Th>Descripcion</Th>
                                    <Th>Precio</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {lastRowKardex.type &&
                                    'items' in lastRowKardex.type &&
                                    lastRowKardex.type.items?.map((item) => (
                                      <Tr key={item._id}>
                                        <Td>{item.name}</Td>
                                        <Td>{item.description}</Td>
                                        <Td>${item.value?.toFixed(2)}</Td>
                                      </Tr>
                                    ))}
                                </Tbody>
                              </Table>
                            )}
                          </Box>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default DebtorExpandable;
