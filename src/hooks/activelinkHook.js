import { useLocation } from 'react-router-dom';

const useLinkIsActive = (elementClass) => {
    const location = useLocation();

    return () => {
        const links = document.querySelectorAll(`.${elementClass}`);
        links.forEach((link) => {
            if (link && link.getAttribute('href') === location.pathname) {
                link.classList.add('link-active');
            } else {
                link.classList.remove('link-active'); // Remove class if it doesn't match
            }
        });
    };
};

export default useLinkIsActive;
