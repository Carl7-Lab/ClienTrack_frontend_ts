import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
import { colors } from '../../styles/colors';
import { ChangeEvent } from 'react';

export interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  isReq?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const InputModal = ({ label, isReq, ...props }: InputProps) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    helpers.setValue(numericValue);
  };

  return (
    <>
      <FormControl isInvalid={!!meta.error && meta.touched}>
        <FormLabel
          htmlFor={props.id}
          fontSize="17px"
          fontWeight="bold"
          textColor={colors.two}
          display="flex"
        >
          {label}
          {isReq && <Text textColor="red">*</Text>}
        </FormLabel>
        {props.name === 'description' ? (
          <Textarea
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            _placeholder={{ textColor: colors.three }}
            variant="filled"
            rows={4}
            resize="vertical"
            width="100%"
            {...field}
            {...props}
          />
        ) : (
          <Input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            _placeholder={{ textColor: colors.three }}
            variant="filled"
            {...field}
            {...props}
            onChange={(e) => {
              if (props.name === 'cell') {
                handleChange(e);
              } else {
                field.onChange(e);
              }
            }}
          />
        )}
        <FormErrorMessage>
          <ErrorMessage name={props.name} />
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default InputModal;
