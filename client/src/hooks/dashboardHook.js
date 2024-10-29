
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const useDashboard = () => {
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const sidebarToggleRef = useRef(null);
  const sidebarCloseRef = useRef(null);
  const userManagementToggleRef = useRef(null);
  const userManagementMenuRef = useRef(null);
  const [isClosed, setClosed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [session, setSession] = useState(null);

  const closeToggler = () => {
    setClosed(!isClosed);
  };

  const updateScreen = () => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
      setClosed(isClosed);
    } else {
      setIsSmallScreen(false);
      setClosed(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const toast_s = localStorage.getItem("toast-session");
      if (toast_s) {
        toast.success("Vous êtes authentifié avec succès !");
        localStorage.removeItem("toast-session");
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateScreen);
    window.addEventListener("load", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
      window.removeEventListener("load", updateScreen);
    };
  }, []);

  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
      localStorage.removeItem("session");
    }
  }, []);

  return {
    sidebarRef,
    mainContentRef,
    sidebarToggleRef,
    sidebarCloseRef,
    userManagementToggleRef,
    userManagementMenuRef,
    isClosed,
    closeToggler,
    isSmallScreen,
    session,
  };
};

export default useDashboard;
