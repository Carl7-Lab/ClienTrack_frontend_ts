import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addStyle } from '../authFormik/ButtonCustom';
import {
  ClientReportProps,
  TransactionDetailProps,
} from '../../interface/PrivateProps';

const TransactionDetailExpandable = ({
  report,
  title,
}: {
  report?: TransactionDetailProps;
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  let totalValue: number | undefined;
  let clientsList: ClientReportProps[] | undefined;

  if (report) {
    const { value, clientsDetails } = report;
    totalValue = value;
    clientsList = clientsDetails;
  } else {
    totalValue = 0;
    clientsList = [];
  }

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
          <Text>{title}</Text>
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center" textAlign="right">
          ${totalValue?.toFixed(2)}
        </Th>
      </Tr>
      {isOpen && (
        <Tr backgroundColor="gray.100">
          <Td colSpan={3}>
            <Box py="20px" px="10px" width="97%" mx="auto">
              <Table variant="simple" size="sm">
                <Tbody>
                  {clientsList &&
                    clientsList.map((client, index) => (
                      <Tr key={index}>
                        <Td>
                          {client.name + ' ' + client.lastName}
                          <Text
                            as="span"
                            display={client.alias ? 'block' : 'none'}
                          >
                            {' (' + client.alias + ') '}
                          </Text>
                        </Td>
                        <Td textAlign="right">${client.value?.toFixed(2)}</Td>
                      </Tr>
                    ))}
                  {clientsList?.length === 0 &&
                    ((title?.includes('Pago de Credito') && (
                      <Tr>
                        <Td colSpan={3}>
                          No hay registros de pagos de credito
                        </Td>
                      </Tr>
                    )) ||
                      (title?.includes('Pago al Contado') && (
                        <Tr>
                          <Td colSpan={3}>
                            No hay registros de pagos al contado
                          </Td>
                        </Tr>
                      )) ||
                      (title?.includes('Pago por Devolución') && (
                        <Tr>
                          <Td colSpan={3}>No hay registros de devoluciones</Td>
                        </Tr>
                      )))}
                </Tbody>
              </Table>
            </Box>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default TransactionDetailExpandable;
