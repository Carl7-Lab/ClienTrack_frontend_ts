import { Checkbox, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { ErrorMessage, Field, useField } from 'formik';

interface Props {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const CheckboxCustom = ({ label, ...props }: Props) => {
  const [, meta] = useField(props);

  return (
    <>
      <FormControl isInvalid={!!meta.error && meta.touched}>
        <Field as={Checkbox} id={props.id} name={props.name} colorScheme="blue">
          {label}
        </Field>
        <FormErrorMessage>
          <ErrorMessage name={props.name} />
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CheckboxCustom;
