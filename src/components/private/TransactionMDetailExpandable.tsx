import { useState } from 'react';
import {
  ClientReportMProps,
  TransactionMDetailProps,
} from '../../interface/PrivateProps';
import {
  IconButton,
  Th,
  Tr,
  Text,
  Td,
  Box,
  Table,
  Tbody,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { addStyle } from '../authFormik/ButtonCustom';

const TransactionMDetailExpandable = ({
  report,
  title,
}: {
  report?: TransactionMDetailProps;
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  let totalValue: number | undefined;
  let clientsList: ClientReportMProps[] | undefined;

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
        <Th fontSize="16px" height="60px" alignItems="center">
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
                          {client.clientId?.name +
                            ' ' +
                            client.clientId?.lastName}
                          <Text
                            as="span"
                            display={client.clientId?.alias ? 'block' : 'none'}
                          >
                            {' (' + client.clientId?.alias + ') '}
                          </Text>
                        </Td>
                        <Td>${client.value?.toFixed(2)}</Td>
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

export default TransactionMDetailExpandable;
