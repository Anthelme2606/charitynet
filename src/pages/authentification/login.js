import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import charity from "../../public/assets/images/charity.jpg";
import { LOGIN_USER } from "../../lib/mutations"; 
import { useUser } from "../../app/providers/AppProvider";
import Cookies from 'js-cookie';
import styles from './Login.module.css'; 
import { NavLink } from "react-router-dom";
import ROUTES from "../../app/routes/names";

const Login = () => {
  
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { setUser } = useUser(); 
  const navigate = useNavigate();
 

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if(data && data.login){
  
      const { token, user, lifeTime } = data.login;
      Cookies.set('token', token, { expires: new Date(parseInt(lifeTime)) });
      Cookies.set('lifeTime', parseInt(lifeTime));  

      setUser({
        isAuth: true,
        auth: {
          userType: user.userType,
          reference:user.referenceNumber,
        
        },
      });

      toast.success('Login successful!...', {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 2000);
    }else {
      toast.error('Invalid data received.', {
        position: "top-right",
        autoClose: 2000,
      });
    }
    },
    onError: (error) => {
      toast.error(` ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({
      variables: {
        input: { username, password },
      },
    });
  };

  return (
    <div className="w-100 m-1 p-1 d-flex justify-content-center align-items-center vh-100">
    <div className={`${styles.container}   d-flex justify-content-center align-items-center flex-column `}>
    <NavLink to={ROUTES.HOME}>
  <div className={styles['logo-container']}>
    <img src={charity} alt="Logo de l'application" className={styles.logo} />
  </div>
</NavLink>

     

      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <div className={styles['form-group']}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
          className={`${styles.input}`}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Mot de passe</label>
          <input
           className={`${styles.input}`}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={`${styles.button}`} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Se connecter'}
        </button>
        <p>Ou connectez-vous avec :</p>
        <div className={styles['social-login']}>
          <button className={`${styles['social-button']} ${styles.button}`}>Google</button>
          <button className={`${styles['social-button']} ${styles.button}`}>Facebook</button>
          <button className={`${styles['social-button']} ${styles.button}`}>Twitter</button>
        </div>
        <p>Pas encore de compte ? <NavLink to={ROUTES.SIGNUP}>Inscrivez-vous</NavLink></p>
      </form>
    </div>
    </div>
  );
};

export default Login;
