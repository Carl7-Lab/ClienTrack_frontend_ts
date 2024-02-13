import { useEffect } from 'react';
import clientAxios from '../config/clientAxios';
import useAlert from './useAlert';

const useConfirmAccount = (id: string | undefined) => {
  const { alert, viewAlert } = useAlert();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios(`/users/confirm/${id}`);
        viewAlert({ alert: { status: 'success', msg: data.message }, forever: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        viewAlert({
          alert: { status: 'error', msg: error.response.data.message },
          forever: true,
        });
      }
    };
    confirmAccount();
  }, [id]);

  return { alert };
};

export default useConfirmAccount;
