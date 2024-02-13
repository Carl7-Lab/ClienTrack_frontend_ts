import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react';

export interface AlertProps {
  status?: 'success' | 'info' | 'warning' | 'error' | 'loading' | undefined;
  msg?: string;
}

const AlertCustom = (alert: AlertProps) => {
  return (
    <Alert status={alert.status} rounded="md" my="15px">
      <AlertIcon />
      <Box>
        <AlertTitle textTransform="capitalize">{alert.status}!</AlertTitle>
        <AlertDescription>{alert.msg}</AlertDescription>
      </Box>
    </Alert>
  );
};

export default AlertCustom;
