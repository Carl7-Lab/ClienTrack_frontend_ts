import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Card,
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
import { TransactionDetailExpandable } from '.';

const CollectionsReportExpandable = ({
  report,
}: {
  report?: {
    value?: number;
    paymentsDetails?: TransactionDetailProps;
    purchasesPayDetails?: TransactionDetailProps;
    returnsDetails?: TransactionDetailProps;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle1 = () => {
    setIsOpen(!isOpen);
  };

  const transactionsDetails: {
    title: string;
    details?: TransactionDetailProps;
  }[] = [
    { title: 'Pago de Credito', details: report?.paymentsDetails },
    { title: 'Pago al Contado', details: report?.purchasesPayDetails },
    { title: 'Pago por Devolución', details: report?.returnsDetails },
  ];

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
        <Th width="33%" height="60px" display="flex" alignItems="center">
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle1}
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
          <Text>Cobros</Text>
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
            <Card p="10px" width="97%" mx="auto">
              <Table variant="simple" size="sm">
                <Tbody>
                  {transactionsDetails.map((transactionDetail, index) => (
                    <TransactionDetailExpandable
                      key={index}
                      report={transactionDetail.details}
                      title={transactionDetail.title}
                    />
                  ))}
                </Tbody>
              </Table>
            </Card>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default CollectionsReportExpandable;
