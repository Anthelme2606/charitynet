import { useEffect, useState } from 'react';

const useHasSidebar = () => {
  const [hasSidebar, setHasSidebar] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
      setHasSidebar(true);
      setIsSidebarClosed(sidebar.classList.contains('close')); // Check if the sidebar contains 'close' class

      const handleClassChange = () => {
        setIsSidebarClosed(sidebar.classList.contains('close')); // Update state if the class changes
      };

      sidebar.addEventListener('transitionend', handleClassChange); // Update state on transitions or any class change

      // Cleanup event listener when component unmounts
      return () => {
        sidebar.removeEventListener('transitionend', handleClassChange);
      };
    }
  }, []);

  return { hasSidebar, isSidebarClosed };
};

export default useHasSidebar;
