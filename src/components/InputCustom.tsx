import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const InputCustom = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormControl isInvalid={!!meta.error && meta.touched}>
        <FormLabel htmlFor={props.id} fontSize="17px" fontWeight="bold">
          {label}
        </FormLabel>
        <Input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          variant="filled"
          {...field}
          {...props}
        />
        <FormErrorMessage>
          <ErrorMessage name={props.name} />
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default InputCustom;
