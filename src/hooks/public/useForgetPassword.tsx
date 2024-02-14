import * as Yup from 'yup';
import useAlert from './useAlert';
import clientAxios from '../../config/clientAxios';

interface ValuesProps {
  email: string;
}

const useForgetPassword = () => {
  const { alert, viewAlert } = useAlert();

  const initialValues: ValuesProps = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo no tiene un formato válido').required('Requerido'),
  });

  const onSubmit = async (
    values: ValuesProps,
    // { resetForm }: FormikHelpers<ValuesProps>,
  ) => {
    try {
      const { data } = await clientAxios.post('/users/forgot-password', values);
      //   resetForm();
      viewAlert({ alert: { status: 'success', msg: data.message }, forever: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response);
      viewAlert({
        alert: { status: 'error', msg: error.response.data.message },
        forever: true,
      });
    }
  };

  return { alert, initialValues, validationSchema, onSubmit };
};

export default useForgetPassword;
