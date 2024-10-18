import { useEffect } from 'react';

const useOpenSidebar = () => {
  const openSidebar = () => {
    const sidebar = document.querySelector('.sidebar'); 
    if (sidebar) {
      sidebar.classList.remove('close'); 

      sidebar.classList.add('open'); 
    }
  };

  return openSidebar; 
};

export default useOpenSidebar;
