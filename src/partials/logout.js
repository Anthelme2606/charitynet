import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from '../app/providers/AppProvider'; // Hypothèse que useUser est utilisé pour gérer l'état utilisateur
import Loader from '../components/Loader';
import { useApolloClient } from '@apollo/client';

const Logout = () => {
  const { setUser } = useUser(); // État utilisateur dans ton contexte
  const navigate = useNavigate();
  const client = useApolloClient(); // Apollo Client pour gérer les requêtes et le cache

  useEffect(() => {
    const handleLogout = async () => {
      // Supprimer le token et autres données d'authentification
      Cookies.remove('token');
      Cookies.remove('lifeTime');

      // Réinitialiser l'état utilisateur
      setUser({ isAuth: false, auth: null });

      try {
        // Réinitialiser le cache Apollo, sans refetch de données nécessitant un utilisateur authentifié
        await client.clearStore(); // Efface le cache sans refetch
      } catch (error) {
        console.error("Erreur lors de la réinitialisation du store Apollo:", error);
      }

      // Rediriger vers la page de connexion
      setTimeout(() => {
        navigate('/login');
      }, 500);
    };

    handleLogout();
  }, [navigate, setUser, client]);

  return <Loader />;
};


export default Logout;
