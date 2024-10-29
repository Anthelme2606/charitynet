import React from "react";

const links = {
  unauth: [
    {
      title: 'Se connecter',
      link: '/login'
    },
    {
      title: 'Créer un compte',
      link: '/signup'
    },
    {
      title: 'Témoignages',
      link: '/temoignages'
    },
    {
      title: 'À propos de nous',
      link: '/about'
    }
  ],
  auth: [
    {
      title: 'Se déconnecter',
      link: '/logout'
    },
    {
      title: 'Nos services', // Renvoie à la liste des services
      link: '#'
    },
    {
      title: 'Témoignages',
      link: '/temoignages'
    },
    {
      title: 'À propos de nous',
      link: '/about'
    }
  ]
};

export default links;
