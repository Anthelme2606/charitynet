import { useLocation } from 'react-router-dom';

const useLinkIsActive = (to) => {
    const location = useLocation();
    return location.pathname === to;
};

export default useLinkIsActive;
