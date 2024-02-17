import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { AddressPropsBD, ClientPropsBD } from '../../interface/PrivateProps';
import { TbEdit } from 'react-icons/tb';
import { colors } from '../../styles/colors';
import usePrivate from '../../hooks/private/usePrivate';
import { useState } from 'react';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

const AddressList = ({ client }: { client: ClientPropsBD }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { onOpenAddressModal, handleAddress } = usePrivate();
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let totalPages;

  if (client.addresses !== undefined) {
    totalPages = Math.max(
      Math.ceil(client.addresses?.length / itemsPerPage),
      1,
    );
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const displayedAddresses: AddressPropsBD[] | undefined =
    client.addresses?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Flex justifyContent="space-between">
      <IconButton
        isDisabled={currentPage === 1}
        icon={<RxDoubleArrowLeft size="40px" />}
        aria-label={''}
        onClick={() => handlePageChange(currentPage - 1)}
        height="100px"
        textColor={colors.one}
        backgroundColor={colors.transparent}
        _hover={{
          textColor: colors.two,
          fontWeight: 'bold',
        }}
        _active={{
          textColor: colors.one_light,
          fontWeight: 'bold',
        }}
      />
      <Box>
        {displayedAddresses?.length !== 0 ? (
          displayedAddresses?.map((address, index) => (
            <Flex key={address._id} mt="5px" mx="5px">
              <Text
                display="flex"
                alignItems="center"
                justify-content="center"
                fontWeight="bold"
                mr={{ base: '30px', md: '20px' }}
              >
                <Button
                  variant="solid"
                  leftIcon={<TbEdit size="25px" />}
                  onClick={() => {
                    onOpenAddressModal();
                    handleAddress({ valueA: address, valueC: client });
                  }}
                  mx="3px"
                  p="0px"
                  m="0px"
                  pl="6px"
                  textColor={{ base: 'gray.700', md: colors.white }}
                  backgroundColor={{ base: colors.transparent, md: 'gray.400' }}
                  _hover={{
                    backgroundColor: {
                      base: colors.transparent,
                      md: 'gray.500',
                    },
                    textColor: { base: 'gray.500', md: 'black' },
                    fontWeight: 'bold',
                  }}
                  _active={{
                    backgroundColor: {
                      base: colors.transparent,
                      md: 'gray.300',
                    },
                    textColor: { base: 'gray.300', md: 'black' },
                    fontWeight: 'bold',
                  }}
                >
                  <Text display={{ base: 'none', md: 'none' }}>Actualizar</Text>
                </Button>
                {'Dirección ' +
                  (itemsPerPage * (currentPage - 1) + index + 1) +
                  ' : '}
              </Text>

              <Box>
                <Text>{address.city + ', ' + address.streets}</Text>
                {address.description && <Text>{address.description}</Text>}
                {location && <Text>{address.location}</Text>}
              </Box>
            </Flex>
          ))
        ) : (
          <Text
            display="flex"
            alignItems="center"
            justify-content="center"
            height="100px"
          >
            No hay direcciones aún
          </Text>
        )}
      </Box>
      <IconButton
        isDisabled={currentPage === totalPages}
        icon={<RxDoubleArrowRight size="40px" />}
        aria-label={''}
        onClick={() => handlePageChange(currentPage + 1)}
        height="100px"
        textColor={colors.one}
        backgroundColor={colors.transparent}
        _hover={{
          textColor: colors.two,
          fontWeight: 'bold',
        }}
        _active={{
          textColor: colors.one_light,
          fontWeight: 'bold',
        }}
      />
    </Flex>
  );
};

export default AddressList;
