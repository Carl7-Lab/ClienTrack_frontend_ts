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
import { TransactionDetailProps } from '../../interface/PrivateProps';

const SalesReportExpandable = ({
  report,
}: {
  report: TransactionDetailProps | undefined;
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

export default SalesReportExpandable;
