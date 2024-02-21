import { useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';

import usePrivate from '../../hooks/private/usePrivate';
import { SalePropsBD } from '../../interface/PrivateProps';
import { addStyle, updateStyle } from '../authFormik/ButtonCustom';
import ClientInfoView from './ClientInfoView';

const SaleExpandable = ({ sale }: { sale: SalePropsBD }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSale, onOpenSaleModal } = usePrivate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tr>
        <Td>
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle}
            aria-label={isOpen ? 'Cerrar' : 'Expandir'}
            {...addStyle}
          />
        </Td>
        <Td>{sale.date && format(sale.date, 'yyyy-MM-dd')}</Td>
        <Td>{sale.typePay}</Td>
        <Td>${sale.value}</Td>
      </Tr>
      {isOpen && (
        <>
          <Tr backgroundColor="gray.100">
            <Td colSpan={4}>
              <Box p="0" width="80%" mx="auto">
                <Flex
                  alignItems="center"
                  justify-content="center"
                  justify="space-between"
                  align="center"
                  mb="10px"
                >
                  <Text>{sale.note}</Text>
                  <Button
                    variant="solid"
                    p="0px"
                    m="0px"
                    pl="6px"
                    {...updateStyle}
                    onClick={() => {
                      onOpenSaleModal();
                      handleSale(sale);
                    }}
                  />
                </Flex>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>N°</Th>
                      <Th>Articulo</Th>
                      <Th>Precio</Th>
                      <Th>Devuelto</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sale.items &&
                      sale.items.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.name}</Td>
                          <Td>{item.description}</Td>
                          <Td>${item.value}</Td>
                          <Td>{item.returned ? 'Si' : 'No'}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            </Td>
          </Tr>
          {sale.client && (
            <Tr backgroundColor="gray.100">
              <Td colSpan={4}>
                <Box p="0" width="80%" mx="auto">
                  <ClientInfoView client={sale.client} />
                </Box>
              </Td>
            </Tr>
          )}
        </>
      )}
    </>
  );
};

export default SaleExpandable;
