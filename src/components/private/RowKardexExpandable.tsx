import { useState } from 'react';
import { RowKardexProps } from '../../interface/PrivateProps';
import {
  Box,
  Flex,
  IconButton,
  Td,
  Tr,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { addStyle } from '../authFormik/ButtonCustom';
import { formatDate } from '../../helpers/formatDate';

const RowKardexExpandable = ({
  rowKardex,
  isFirst,
}: {
  rowKardex: RowKardexProps;
  isFirst: boolean;
}) => {
  const { balance, credit, date, debit, description, type, typeModel } =
    rowKardex;

  const [isOpen, setIsOpen] = useState(false);

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
        <Td>{date && formatDate(date)}</Td>
        <Td>{description}</Td>
        <Td textAlign="right">${debit?.toFixed(2)}</Td>
        <Td textAlign="right">${credit?.toFixed(2)}</Td>
        <Td
          textAlign="right"
          style={{ fontWeight: isFirst ? 'bold' : 'normal' }}
        >
          ${balance?.toFixed(2)}
        </Td>
      </Tr>
      {isOpen && (
        <Tr backgroundColor="gray.100">
          <Td colSpan={6}>
            <Box p="0" width="80%" mx="auto">
              <Flex
                alignItems="center"
                justify-content="center"
                justify="space-between"
                align="center"
                mb="10px"
              >
                <Text>{type?.note}</Text>
              </Flex>
            </Box>
            {typeModel === 'Purchase' && (
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Articulo</Th>
                    <Th>Descripcion</Th>
                    <Th>Precio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {type &&
                    'items' in type &&
                    type.items?.map((item) => (
                      <Tr key={item._id}>
                        <Td>{item.name}</Td>
                        <Td>{item.description}</Td>
                        <Td textAlign="right">${item.value?.toFixed(2)}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            )}
          </Td>
        </Tr>
      )}
    </>
  );
};

export default RowKardexExpandable;
