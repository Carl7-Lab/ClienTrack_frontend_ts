import { useEffect } from 'react';

const useCustomTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useCustomTitle;
