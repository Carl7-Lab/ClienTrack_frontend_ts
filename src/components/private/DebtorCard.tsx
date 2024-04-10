import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Select,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import usePrivate from '../../hooks/private/usePrivate';
import { useState } from 'react';
import { DebtorExpandable } from '.';
import { FaSearch } from 'react-icons/fa';
import { addStyle } from '../authFormik/ButtonCustom';

const DebtorCard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [viewDebtors, setViewDebtors] = useState(false);

  const { getDebtors, debtors, loadingDebtors } = usePrivate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSearching = async () => {
    if (!loadingDebtors && selectedOption !== '') {
      setViewDebtors(true);
      await getDebtors(selectedOption);
    }
  };

  return (
    <Card my="10px" mx={{ base: '10px', md: '20px', lg: '1%' }} width="100%">
      <CardHeader>
        <Heading size="md">Clientes Por Cobrar</Heading>
      </CardHeader>

      <CardBody pt="0px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr height="45px">
              <Th>
                <Select value={selectedOption} onChange={handleSelectChange}>
                  <option value="">-- Seleccione --</option>
                  <option value="time15weeks">15 semanas</option>
                  <option value="time36weeks">36 semanas</option>
                  <option value="time52weeks">52 semanas</option>
                  <option value="timemore52weeks">Más de 52 semanas</option>
                </Select>
              </Th>
              <Th>
                <Button
                  {...addStyle}
                  px="5px"
                  leftIcon={<FaSearch />}
                  onClick={handleSearching}
                  isLoading={loadingDebtors}
                >
                  Buscar
                </Button>
              </Th>
            </Tr>
          </Thead>

          <Tbody maxHeight="300px" overflow="auto">
            {viewDebtors &&
              (loadingDebtors ? (
                <Tr>
                  <Th colSpan={3}>
                    <Skeleton height="60px" />
                    <Skeleton height="180px" mt="10px" />
                  </Th>
                </Tr>
              ) : (
                <Tr>
                  <Td colSpan={3}>
                    <Box width="100%" maxHeight="420px" overflow="auto">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr height="45px">
                            <Th />
                            <Th fontSize="16px">Nombre</Th>
                            <Th fontSize="16px">Monto</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {debtors.map((debtor, index) => (
                            <DebtorExpandable key={index} debtor={debtor} />
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DebtorCard;
