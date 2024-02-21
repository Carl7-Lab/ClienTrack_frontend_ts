import { useEffect, useState } from 'react';
import clientAxios from '../../config/clientAxios';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik/dist/types';

import useAlert from './useAlert';
import { VALID_PASSWORD_REGEX } from '../../helpers/variable';

interface ValuesProps {
  password: string;
  repeatPassword: string;
}

const useNewPassword = (token: string | undefined) => {
  const [validToken, setValidToken] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { alert, viewAlert } = useAlert();

  useEffect(() => {
    const confirmToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`);
        setValidToken(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        viewAlert({
          alert: { status: 'error', msg: error.response.data.message },
          forever: true,
        });
      }
    };
    confirmToken();
  }, [token, viewAlert]);

  const initialValues: ValuesProps = {
    password: '',
    repeatPassword: '',
  };

  const validationSchema = Yup.object({
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
  });

  const onSubmit = async (
    values: ValuesProps,
    { resetForm }: FormikHelpers<ValuesProps>,
  ) => {
    try {
      const { data } = await clientAxios.post(
        `/users/forgot-password/${token}`,
        values,
      );
      resetForm();
      setChangePassword(true);
      viewAlert({
        alert: { status: 'success', msg: data.message },
        forever: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      viewAlert({
        alert: { status: 'error', msg: error.response.data.message },
      });
    }
  };

  return {
    alert,
    validToken,
    initialValues,
    validationSchema,
    changePassword,
    onSubmit,
  };
};

export default useNewPassword;
