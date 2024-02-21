import clientAxios from '../../config/clientAxios';
import { FormikHelpers } from 'formik/dist/types';
import * as Yup from 'yup';

import useAlert from './useAlert';

import { VALID_PASSWORD_REGEX } from '../../helpers/variable';

interface ValuesProps {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  terms: boolean;
}

const useUserRegister = () => {
  const { alert, viewAlert } = useAlert();

  const initialValues: ValuesProps = {
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
    terms: false,
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, 'Debe de tener 2 caracteres como minimo')
      .required('Requerido'),
    email: Yup.string()
      .email('Correo no tiene un formato válido')
      .required('Requerido'),
    password: Yup.string()
      .min(8, 'Debe de tener 8 caracteres como minimo')
      .max(20, 'No debe superar los 20 caracteres')
      .required('Requerido')
      .matches(
        VALID_PASSWORD_REGEX,
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
      ),
    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), undefined],
        'Las contraseñas deben ser iguales',
      )
      .required('Requerido'),
    terms: Yup.boolean().oneOf([true], 'Debe de aceptar las condiciones'),
  });

  const onSubmit = async (
    values: ValuesProps,
    { resetForm }: FormikHelpers<ValuesProps>,
  ) => {
    try {
      const { data } = await clientAxios.post('/users', values);
      resetForm();
      viewAlert({
        alert: { status: 'success', msg: data.message },
        route: '/',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      viewAlert({
        alert: { status: 'error', msg: error.response.data.message },
      });
    }
  };

  return { initialValues, validationSchema, onSubmit, alert };
};

export default useUserRegister;
