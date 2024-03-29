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
      <Tr
      // height="60px"
      // p="10px"
      // display="flex"
      // alignContent="space-between"
      // alignItems="center"
      // width="100%"
      >
        <Th
          // width="33%"
          height="60px"
          // display="flex"
          alignItems="center"
        >
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle}
            aria-label={isOpen ? 'Cerrar' : 'Expandir'}
            {...addStyle}
          />
        </Th>
        <Th
          // width="33%"
          fontSize="16px"
          height="60px"
          // display="flex"
          alignItems="center"
        >
          <Text>Ventas</Text>
        </Th>
        <Th
          // width="33%"
          fontSize="16px"
          height="60px"
          // display="flex"
          alignItems="center"
        >
          ${report?.value?.toFixed(2)}
        </Th>
      </Tr>
      {isOpen && (
        <Tr backgroundColor="gray.100">
          <Td colSpan={3}>
            <Box p="10px" width="90%">
              <Table variant="simple" size="sm">
                <Tbody>
                  {report?.clientsDetails &&
                    report.clientsDetails.map((client, index) => (
                      <Tr key={index}>
                        <Td>
                          {client.name + ' ' + client.lastName}
                          <Text
                            as="span"
                            display={client.alias ? 'bolk' : 'none'}
                          >
                            {' (' + client.alias + ') '}
                          </Text>
                        </Td>
                        <Td>${client.value?.toFixed(2)}</Td>
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
