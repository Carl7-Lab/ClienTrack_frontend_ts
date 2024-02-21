import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AlertProps } from '../../components/authFormik';

interface ViewAlertProps {
  alert: AlertProps;
  route?: string;
  forever?: boolean;
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertProps>({});
  const navigate = useNavigate();

  const viewAlert = ({ alert, route, forever }: ViewAlertProps) => {
    setAlert(alert);
    if (!forever) {
      setTimeout(() => {
        setAlert({});
        if (route) {
          navigate(route);
        }
      }, 5000);
    }
  };

  return { alert, viewAlert };
};

export default useAlert;
