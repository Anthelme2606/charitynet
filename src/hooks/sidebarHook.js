import { useEffect, useState } from 'react';

const useHasSidebar = () => {
  const [hasSidebar, setHasSidebar] = useState(false);

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    setHasSidebar(!!sidebar); 
  }, []);

  return hasSidebar;
};

export default useHasSidebar;
