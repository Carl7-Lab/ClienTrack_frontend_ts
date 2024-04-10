import { useState } from 'react';
import { TransactionMDetailProps } from '../../interface/PrivateProps';
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

const SalesReportMExpandable = ({
  report,
}: {
  report: TransactionMDetailProps | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
          <Text>Ventas</Text>
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center" textAlign="right">
          ${report?.value?.toFixed(2)}
        </Th>
      </Tr>
      {isOpen && (
        <Tr backgroundColor="gray.100">
          <Td colSpan={3}>
            <Box py="10px" width="100%" maxHeight="300px" overflow="auto">
              <Table variant="simple" size="sm">
                <Tbody>
                  {report?.clientsDetails &&
                    report.clientsDetails.map((client, index) => (
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
                        <Td textAlign="right">${client.value?.toFixed(2)}</Td>
                      </Tr>
                    ))}
                  {report?.clientsDetails?.length === 0 && (
                    <Tr>
                      <Td colSpan={3}>No hay ventas registradas</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default SalesReportMExpandable;
