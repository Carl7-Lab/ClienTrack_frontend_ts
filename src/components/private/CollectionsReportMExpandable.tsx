import { useState } from 'react';
import { TransactionMDetailProps } from '../../interface/PrivateProps';
import {
  IconButton,
  Th,
  Tr,
  Text,
  Td,
  Card,
  Table,
  Tbody,
} from '@chakra-ui/react';
import { addStyle } from '../authFormik/ButtonCustom';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { TransactionMDetailExpandable } from '.';

const CollectionsReportMExpandable = ({
  report,
}: {
  report?: {
    value?: number;
    paymentsDetails?: TransactionMDetailProps;
    purchasesPayDetails?: TransactionMDetailProps;
    returnsDetails?: TransactionMDetailProps;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle1 = () => {
    setIsOpen(!isOpen);
  };

  const transactionsDetails: {
    title: string;
    details?: TransactionMDetailProps;
  }[] = [
    { title: 'Pago de Credito', details: report?.paymentsDetails },
    { title: 'Pago al Contado', details: report?.purchasesPayDetails },
    { title: 'Pago por Devolución', details: report?.returnsDetails },
  ];

  return (
    <>
      <Tr>
        <Th width="33%" height="60px" display="flex" alignItems="center">
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle1}
            aria-label={isOpen ? 'Cerrar' : 'Expandir'}
            {...addStyle}
          />
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center">
          <Text>Cobros</Text>
        </Th>
        <Th fontSize="16px" height="60px" alignItems="center">
          ${report?.value?.toFixed(2)}
        </Th>
      </Tr>
      {isOpen && (
        <Tr backgroundColor="gray.100">
          <Td colSpan={3}>
            <Card p="10px" width="97%" mx="auto">
              <Table variant="simple" size="sm">
                <Tbody>
                  {transactionsDetails.map((transactionsDetails, index) => (
                    <TransactionMDetailExpandable
                      key={index}
                      report={transactionsDetails.details}
                      title={transactionsDetails.title}
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

export default CollectionsReportMExpandable;
