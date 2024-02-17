import { Button } from '@chakra-ui/react';
import { colors } from '../../styles/colors';

const ButtonCustom = ({ text }: { text: string }) => {
  return (
    <Button
      type="submit"
      width="full"
      backgroundColor={colors.one}
      color="white"
      _hover={{ backgroundColor: colors.three }}
      _active={{
        backgroundColor: colors.three,
        textColor: colors.one,
        fontWeight: 'bold',
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
