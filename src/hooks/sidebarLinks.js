import React from 'react';
import {useUser} from "../app/providers/AppProvider";
import ROUTES from '../app/routes/names';

const SidebarLinks = () => {
  const { user } = useUser();
  const links = [];

  if (user?.isAuth) {
    switch (user?.auth?.userType) {
        case 'Admin':
            links.push(
                { name: 'Tableau de bord', link: '/admin/dashboard' },
                { name: 'Gérer les utilisateurs', link: '/admin/users' },
                { name: 'Gestion des dons', link: '/admin/donations' },
                { name: 'Rapports', link: '/admin/reports' },
                { name: 'Paramètres', link: '/admin/settings' },
                { name: 'Aide', link: '/admin/help' }
            );
            break;
    
        case 'Donor':
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Faire un don', link: '/donor/donate' },
                { name: 'Historique des dons', link: '/donor/history' },
                { name: 'Profil', link: '/donor/profile' },
                { name: 'Notifications', link: '/donor/notifications' },
                { name: 'Aide', link: '/donor/help' },
                { name: 'À propos', link: '/donor/about' }
            );
            break;
    
        case 'Beneficiary':
            links.push(
                { name: 'Tableau de bord', link: ROUTES.DASHBOARD},
                { name: 'Demander de l\'aide', link: ROUTES.CAUSECREATE},
                { name: 'Suivi des demandes', link: ROUTES.TRACK},
                { name: 'Mon portefeuille', link: ROUTES.WALLET},
                { name: 'Profil', link: '/beneficiary/profile' },
                { name: 'Notifications', link: '/beneficiary/notifications' },
                { name: 'Aide', link: '/beneficiary/help' },
                { name: 'À propos', link: '/beneficiary/about' }
            );
            break;
    
        case 'OBNL':
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Gérer les projets', link: '/obnl/projects' },
                { name: 'Historique des dons', link: '/obnl/donations' },
                { name: 'Profil', link: '/obnl/profile' },
                { name: 'Rapports', link: '/obnl/reports' },
                { name: 'Aide', link: '/obnl/help' },
                { name: 'À propos', link: '/obnl/about' }
            );
            break;
    
        case 'User':  // Ajout pour l'utilisateur standard
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Explorer les causes', link: '/causes' },
                { name: 'Mon profil', link: '/profile' },
                { name: 'Aide', link: '/help' },
                { name: 'Notifications', link: '/notifications' },
                { name: 'À propos', link: '/about' }
            );
            break;
    
        default:
            links.push(
                { name: 'Page d\'accueil', link: '/' },
                { name: 'À propos', link: '/about' },
                { name: 'Contact', link: '/contact' },
                { name: 'Aide', link: '/help' },
                { name: 'Inscription', link: '/register' },
                { name: 'Connexion', link: '/login' }
            );
            break;
    }
    

    return links;
  } else {
    return null;  
  }
};

export default SidebarLinks;
