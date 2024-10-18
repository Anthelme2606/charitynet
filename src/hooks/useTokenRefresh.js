import { useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { REFRESH_TOKEN } from '../lib/mutations';
import debounce from 'lodash/debounce';

const useTokenRefresh = () => {
  const [refreshToken] = useMutation(REFRESH_TOKEN);

  // Fonction qui vérifie et rafraîchit le token si nécessaire
  const checkAndRefreshToken = useCallback(async () => {
    const token = Cookies.get('token');
    const lifeTime = parseInt(Cookies.get('lifeTime'));

    if (!token || !lifeTime) {
      return;
    }

    const expirationTime = new Date(lifeTime);
    const currentTime = Date.now();
    const timeLeft = expirationTime - currentTime;

    const maxTimeBeforeExpiry = 118 * 60 * 1000; // 118 minutes avant expiration
    if (timeLeft > 1 && timeLeft <= maxTimeBeforeExpiry) {
      try {
        const { data } = await refreshToken({
          variables: { token: token },
        });

        const newToken = data?.refreshToken?.token;
        const newExpireAt = data?.refreshToken?.expireAt;

        if (newToken) {
          // Mettre à jour le token et la durée de vie dans les cookies
          Cookies.set('token', newToken, { expires: new Date(newExpireAt) });
          Cookies.set('lifeTime', newExpireAt);

          // Mettre à jour le currentUser pour étendre son expiration également
          const currentUser = Cookies.get("currentUser");
          if (currentUser) {
            Cookies.set("currentUser", currentUser, { expires: 1 }); // Prolonge la durée de vie à 1 jour
          }
        }
      } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error);
      }
    }
  }, [refreshToken]);

  // Utilisation du debounce pour limiter les appels à checkAndRefreshToken
  const debouncedCheckAndRefreshToken = debounce(checkAndRefreshToken, 10000); // 10 seconde de délai

  // Fonction pour écouter les événements utilisateur
  useEffect(() => {
    // Écoute des événements utilisateur
    window.addEventListener('scroll', debouncedCheckAndRefreshToken);
    window.addEventListener('mouseover', debouncedCheckAndRefreshToken);
    window.addEventListener('mousedown', debouncedCheckAndRefreshToken);
    window.addEventListener('click', debouncedCheckAndRefreshToken);

    return () => {
      window.removeEventListener('scroll', debouncedCheckAndRefreshToken);
      window.removeEventListener('mouseover', debouncedCheckAndRefreshToken);
      window.removeEventListener('mousedown', debouncedCheckAndRefreshToken);
      window.removeEventListener('click', debouncedCheckAndRefreshToken);
    };
  }, [debouncedCheckAndRefreshToken]);

  return null;
};

export default useTokenRefresh;
