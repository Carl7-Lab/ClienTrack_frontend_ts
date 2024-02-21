import { Button } from '@chakra-ui/react';
import { colors } from '../../styles/colors';
import { TbEdit } from 'react-icons/tb';

export const addStyle = {
  variant: 'solid',
  p: '0px',
  textColor: colors.white,
  backgroundColor: colors.one,
  fontWeight: 'bold',
  _hover: { backgroundColor: colors.one_light, textColor: colors.one },
  _active: {
    backgroundColor: colors.three,
    textColor: colors.one,
    fontWeight: 'bold',
  },
};

export const updateStyle = {
  leftIcon: <TbEdit size="25px" />,
  mx: '3px',
  textColor: { base: 'gray.700', md: colors.white },
  backgroundColor: { base: colors.transparent, md: 'gray.400' },
  _hover: {
    backgroundColor: { base: colors.transparent, md: 'gray.500' },
    textColor: { base: 'gray.500', md: 'black' },
    fontWeight: 'bold',
  },
  _active: {
    backgroundColor: { base: colors.transparent, md: 'gray.300' },
    textColor: { base: 'gray.300', md: 'black' },
    fontWeight: 'bold',
  },
};

interface ButtonCustomProps {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const ButtonCustom = ({ text, ...otherProps }: ButtonCustomProps) => {
  return (
    <Button type="submit" width="full" {...addStyle} {...otherProps}>
      {text}
    </Button>
  );
};

export default ButtonCustom;
