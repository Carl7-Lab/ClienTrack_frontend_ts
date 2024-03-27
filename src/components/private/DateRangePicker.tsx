import { Input, Text, HStack, Skeleton } from '@chakra-ui/react';

const DateRangePicker = ({
  startDate,
  endDate,
  loading,
  setStartDate,
  setEndDate,
}: {
  startDate: string;
  endDate: string;
  loading?: boolean;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isStartDate: boolean,
  ) => {
    const newDate = event.target.value;

    if (isStartDate) {
      if (new Date(newDate) <= new Date(endDate)) {
        setStartDate(newDate);
      } else {
        setStartDate(endDate);
      }
    } else {
      if (new Date(newDate) >= new Date(startDate)) {
        setEndDate(newDate);
      } else {
        setEndDate(startDate);
      }
    }
  };

  return (
    <HStack spacing={4}>
      <Skeleton isLoaded={!loading}>
        <Text>Inicio:</Text>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange(e, true)}
        />
      </Skeleton>

      <Skeleton isLoaded={!loading}>
        <Text>Fin:</Text>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange(e, false)}
        />
      </Skeleton>
    </HStack>
  );
};

export default DateRangePicker;
