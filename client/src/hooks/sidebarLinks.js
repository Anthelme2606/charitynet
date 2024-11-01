import React from "react";
import { useUser } from "../app/providers/AppProvider";
import ROUTES from "../app/routes/names";

const SidebarLinks = () => {
  const { user } = useUser();
  const links = [];

  if (user?.isAuth) {
    switch (user?.auth?.userType) {
      case 'Admin':
        links.push(
          { name: 'Tableau de bord', link: ROUTES.DASHBOARD, icon: 'bi-speedometer2' },
          { name: 'Gérer les utilisateurs', link: ROUTES.USERMANAGER, icon: 'bi-people' },
          { name: 'Gestion des dons', link: ROUTES.DONMANAGER, icon: 'bi-gift' },
          { name: 'Caisse', link:ROUTES.CAISSE, icon: 'bi-wallet2' },
          { name: 'Rapports', link: ROUTES.RAPPORTMANAGER, icon: 'bi-bar-chart' },
          // { name: 'Déconnexion', link: ROUTES.LOGOUT, icon: 'bi-box-arrow-right' }
        );
        break;

      case 'Donor':
        links.push(
          { name: 'Tableau de bord', link: '/dashboard', icon: 'bi-speedometer2' },
          { name: 'Faire un don', link: ROUTES.MAKEDONATION, icon: 'bi-heart' },
          { name: 'Historique des dons', link: '/donor/history', icon: 'bi-clock-history' },
          { name: 'Profil', link: '/donor/profile', icon: 'bi-person' },
          { name: 'Notifications', link: '/donor/notifications', icon: 'bi-bell' },
          { name: 'À propos', link: ROUTES.ABOUT, icon: 'bi-info-circle' }
        );
        break;

      case 'Beneficiary':
        links.push(
          { name: 'Tableau de bord', link: ROUTES.DASHBOARD, icon: 'bi-speedometer2' },
          { name: 'Demander de l\'aide', link: ROUTES.CAUSECREATE, icon: 'bi-question-circle' },
          { name: 'Suivi des demandes', link: ROUTES.TRACK, icon: 'bi-truck' },
          { name: 'Gérer mes dons', link: ROUTES.GESTION, icon: 'bi-hand-thumbs-up' },
          { name: 'Mon portefeuille', link: ROUTES.WALLET, icon: 'bi-wallet2' },
          { name: 'Profil', link: '/beneficiary/profile', icon: 'bi-person' },
          { name: 'Notifications', link: '/beneficiary/notifications', icon: 'bi-bell' },
          { name: 'À propos', link: ROUTES.ABOUT, icon: 'bi-info-circle' }
        );
        break;

      case 'OBNL':
        links.push(
          { name: 'Tableau de bord', link: '/dashboard', icon: 'bi-speedometer2' },
          { name: 'Gérer les projets', link: '/obnl/projects', icon: 'bi-briefcase' },
          { name: 'Historique des dons', link: '/obnl/donations', icon: 'bi-clock-history' },
          { name: 'Profil', link: '/obnl/profile', icon: 'bi-person' },
          { name: 'Rapports', link: '/obnl/reports', icon: 'bi-bar-chart' },
          { name: 'À propos', link: ROUTES.ABOUT, icon: 'bi-info-circle' }
        );
        break;

      case 'User': 
        links.push(
          { name: 'Tableau de bord', link: '/dashboard', icon: 'bi-speedometer2' },
          { name: 'Explorer les causes', link: '/causes', icon: 'bi-binoculars' },
          { name: 'Mon profil', link: '/profile', icon: 'bi-person' },
          { name: 'Notifications', link: '/notifications', icon: 'bi-bell' },
          { name: 'À propos', link: ROUTES.ABOUT, icon: 'bi-info-circle' }
        );
        break;

      default:
        links.push(
          { name: 'Page d\'accueil', link: '/', icon: 'bi-house' },
          { name: 'À propos', link: ROUTES.ABOUT, icon: 'bi-info-circle' },
          { name: 'Contact', link: '/contact', icon: 'bi-envelope' },
          { name: 'Aide', link: '/help', icon: 'bi-question-circle' },
          { name: 'Inscription', link: '/register', icon: 'bi-pencil-square' },
          { name: 'Connexion', link: '/login', icon: 'bi-box-arrow-in-right' }
        );
        break;
    }

    return links; // Return the array of links directly
  } else {
    return null;
  }
};

export default SidebarLinks;
