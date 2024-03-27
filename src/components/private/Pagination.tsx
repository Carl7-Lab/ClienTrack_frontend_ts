import { Button, Flex, Box, IconButton, Skeleton } from '@chakra-ui/react';
import { colors } from '../../styles/colors';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { addStyle } from '../authFormik/ButtonCustom';

interface PageProps {
  limit: number;
  total: number;
  currentPage: number;
  loading?: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  limit,
  total,
  loading,
  setCurrentPage,
}: PageProps) => {
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageRange = () => {
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    if (totalPages <= 1) {
      return [];
    }

    const maxButtons = 3;
    const middleButton = Math.floor(maxButtons / 2);

    let startPage = currentPage - middleButton;
    let endPage = currentPage + middleButton;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(startPage + maxButtons - 1, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  };

  return (
    <Skeleton isLoaded={!loading} my="5px">
      <Flex mt={4} justify="center" align="center">
        <IconButton
          aria-label={''}
          icon={<RxDoubleArrowLeft size="40px" />}
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
          rounded="none"
          {...addStyle}
        />
        <Box>
          {getPageRange().map((pageNumber) => (
            <Button
              key={pageNumber}
              rounded="none"
              variant="solid"
              textColor={currentPage === pageNumber ? 'white' : 'black'}
              backgroundColor={
                currentPage === pageNumber ? colors.one : 'gray.300'
              }
              _hover={{
                backgroundColor:
                  currentPage === pageNumber ? colors.two : 'gray.400',
                fontWeight: 'bold',
              }}
              _active={{
                backgroundColor:
                  currentPage === pageNumber ? 'gray.500' : colors.three,
                fontWeight: 'bold',
              }}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
        </Box>
        <IconButton
          aria-label={''}
          icon={<RxDoubleArrowRight size="40px" />}
          onClick={handleNextPage}
          isDisabled={currentPage === Math.max(Math.ceil(total / limit), 1)}
          rounded="none"
          {...addStyle}
        />
      </Flex>
    </Skeleton>
  );
};

export default Pagination;
