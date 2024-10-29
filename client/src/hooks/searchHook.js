import { useState } from 'react';

const useSearchOpen = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  return {
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
  };
};

export default useSearchOpen;
