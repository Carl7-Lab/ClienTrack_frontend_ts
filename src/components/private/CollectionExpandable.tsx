import { useState } from 'react';
import { Box, Button, Flex, IconButton, Td, Tr, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

import usePrivate from '../../hooks/private/usePrivate';
import { CollectionPropsBD } from '../../interface/PrivateProps';
import ClientInfoView from './ClientInfoView';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { addStyle, updateStyle } from '../authFormik/ButtonCustom';

const CollectionExpandable = ({
  collection,
}: {
  collection: CollectionPropsBD;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleCollection, onOpenCollectionModal } = usePrivate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Tr>
        <Td>
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={handleToggle}
            aria-label={isOpen ? 'Cerrar' : 'Expandir'}
            {...addStyle}
          />
        </Td>
        <Td>{collection.date && format(collection.date, 'yyyy-MM-dd')}</Td>
        <Td>${collection.value}</Td>
      </Tr>
      {isOpen && (
        <>
          <Tr backgroundColor="gray.100">
            <Td colSpan={3}>
              <Box p="0" width="80%" mx="auto">
                <Flex
                  alignItems="center"
                  justify-content="center"
                  justify="space-between"
                  align="center"
                  mb="10px"
                >
                  <Text>{collection.note}</Text>
                  <Button
                    variant="solid"
                    p="0px"
                    m="0px"
                    pl="6px"
                    {...updateStyle}
                    onClick={() => {
                      handleCollection(collection);
                      onOpenCollectionModal();
                    }}
                  />
                </Flex>
              </Box>
            </Td>
          </Tr>
          {collection.client && (
            <Tr backgroundColor="gray.100">
              <Td colSpan={3}>
                <Box p="0" width="80%" mx="auto">
                  <ClientInfoView client={collection.client} />
                </Box>
              </Td>
            </Tr>
          )}
        </>
      )}
    </>
  );
};

export default CollectionExpandable;
