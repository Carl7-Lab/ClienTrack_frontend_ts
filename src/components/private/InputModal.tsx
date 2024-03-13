import { ChangeEvent } from 'react';
import { ErrorMessage, useField } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
  Select,
} from '@chakra-ui/react';

import { colors } from '../../styles/colors';

export interface InputProps {
  label: string;
  name: string;
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'date'
    | 'number'
    | 'checkbox'
    | 'selectPay'
    | 'selectReason';
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
        {props.name === 'description' || props.name === 'note' ? (
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
        ) : props.type === 'selectReason' ? (
          <>
            <Select
              id={props.id}
              placeholder={props.placeholder}
              {...field}
              {...props}
            >
              <option value="Pago">Pago</option>
              <option value="Devolucion">Devolución</option>
            </Select>
          </>
        ) : props.type === 'selectPay' ? (
          <>
            <Select
              id={props.id}
              placeholder={props.placeholder}
              {...field}
              {...props}
            >
              <option value="Contado">Contado</option>
              <option value="Credito">Crédito</option>
            </Select>
          </>
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
