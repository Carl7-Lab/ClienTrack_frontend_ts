import { useNavigate } from 'react-router-dom';
import clientAxios from '../../config/clientAxios';
import * as Yup from 'yup';

import useAlert from './useAlert';
import usePublic from './usePublic';

interface ValuesProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const useLogin = () => {
  const { alert, viewAlert } = useAlert();
  const { setAuth } = usePublic();

  const navigate = useNavigate();

  const initialValues: ValuesProps = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo no tiene un formato válido')
      .required('Requerido'),
    password: Yup.string().required('Requerido'),
    remember: Yup.boolean(),
  });

  const onSubmit = async (values: ValuesProps) => {
    try {
      const { data } = await clientAxios.post('/users/login', values);
      localStorage.setItem('token', data.data.user.token);
      setAuth(data.data.user);
      navigate('/app');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      viewAlert({
        alert: { status: 'error', msg: error.response.data.message },
      });
    }
  };

  return { alert, initialValues, validationSchema, onSubmit };
};

export default useLogin;
