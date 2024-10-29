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
                { name: 'Tableau de bord', link: ROUTES.DASHBOARD },
                { name: 'Gérer les utilisateurs',link:ROUTES.USERMANAGER  },
                { name: 'Gestion des dons', link:ROUTES.DONMANAGER },
                { name: 'Caisse', link:"admin/caisse" },
                { name: 'Rapports', link: ROUTES.RAPPORTMANAGER },
                { name: 'Déconnexion', link:ROUTES.LOGOUT }
            );
            break;
    
        case 'Donor':
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Faire un don', link: '/donor/donate' },
                { name: 'Historique des dons', link: '/donor/history' },
                { name: 'Profil', link: '/donor/profile' },
                { name: 'Notifications', link: '/donor/notifications' },
                { name: 'À propos', link: ROUTES.ABOUT },
                { name: 'Déconnexion', link:ROUTES.LOGOUT }
            );
            break;
    
        case 'Beneficiary':
            links.push(
                { name: 'Tableau de bord', link: ROUTES.DASHBOARD},
                { name: 'Demander de l\'aide', link: ROUTES.CAUSECREATE},
                { name: 'Suivi des demandes', link: ROUTES.TRACK},
                { name: 'Gérer mes dons', link: ROUTES.GESTION },
                { name: 'Mon portefeuille', link: ROUTES.WALLET},
                { name: 'Profil', link: '/beneficiary/profile' },
                { name: 'Notifications', link: '/beneficiary/notifications' },
                { name: 'À propos', link: ROUTES.ABOUT }
            );
            break;
    
        case 'OBNL':
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Gérer les projets', link: '/obnl/projects' },
                { name: 'Historique des dons', link: '/obnl/donations' },
                { name: 'Profil', link: '/obnl/profile' },
                { name: 'Rapports', link: '/obnl/reports' },
                { name: 'À propos', link:ROUTES.ABOUT }
            );
            break;
    
        case 'User':  // Ajout pour l'utilisateur standard
            links.push(
                { name: 'Tableau de bord', link: '/dashboard' },
                { name: 'Explorer les causes', link: '/causes' },
                { name: 'Mon profil', link: '/profile' },
                
                { name: 'Notifications', link: '/notifications' },
                { name: 'À propos', link:ROUTES.ABOUT }
            );
            break;
    
        default:
            links.push(
                { name: 'Page d\'accueil', link: '/' },
                { name: 'À propos', link:ROUTES.ABOUT },
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
