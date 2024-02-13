import { Button } from '@chakra-ui/react';

const ButtonCustom = ({ text }: { text: string }) => {
  return (
    <Button
      type="submit"
      width="full"
      backgroundColor="rgba(0, 35, 255, 1)"
      color="white"
      _hover={{ backgroundColor: 'rgba(0,34,255,0.5)' }}
    >
      {text}
    </Button>
  );
};

export default ButtonCustom;
