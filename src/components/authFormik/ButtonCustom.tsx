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
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
