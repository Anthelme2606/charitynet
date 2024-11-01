import React, { useState, useEffect } from "react";
import '../../public/assets/css/signup.css';
import charity from "../../public/assets/images/charity.jpg";
import In from "../../public/assets/images/in.png";
import { NavLink } from "react-router-dom";
import ROUTES from "../../app/routes/names";
import Loader from '../../components/Loader';
import { SIGN_UP, SEND_MAIL } from "../../lib/mutations";  // Importer les deux mutations
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [username, setUsername] = useState('');  // Nouvelle variable pour stocker le username

    const [signup, { loading: signupLoading }] = useMutation(SIGN_UP, {
        onCompleted: (data) => {
            setUsername(data.signup.username);  
            handleSendMail(data.signup.username);  
        },
        onError: (err) => toast.error(`Erreur de création de compte: ${err.message}`),
    });

    const [sendMail, { loading: sendMailLoading }] = useMutation(SEND_MAIL, {
        onCompleted: () => toast.success("Email de confirmation envoyé !"),
        onError: (err) => toast.error(`Erreur d'envoi de mail: ${err.message}`),
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setCountries(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (e) => {
        const inputValue = e.target.value;
        setCountry(inputValue);
        
        if (inputValue) {
            const filtered = countries.filter((c) =>
                c.name.common.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setFilteredCountries(filtered);
        } else {
            setFilteredCountries([]);
        }
    };

    const handleCountrySelect = (selectedCountry) => {
        setCountry(selectedCountry);
        setFilteredCountries([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setPasswordError("Les mots de passe ne correspondent pas.");
            return;
        }

        setPasswordError(null);

        // Appeler la mutation de création de compte
        signup({
            variables: {
                input: {
                    email,
                    country,
                    password,
                },
            },
        });
    };

    const handleSendMail = (username) => {
        sendMail({
            variables: {
                receiver: email,
                subject: "Confirmation de votre compte",
                input: {
                    username,  
                    message: `Bienvenue ${username}! Merci de confirmer votre inscription pour accéder à votre compte.`,
                },
            },
        });
    };

    // if (isLoading || signupLoading || sendMailLoading) {
    //     return <Loader/>
    // }

    if (error) {
        return <div className="text-center text-danger">Erreur : {error}</div>;
    }

    return (
      <div className="w-100 m-1 p-1 d-flex justify-content-center align-items-center vh-100">
      <div className="row  align-items-center justify-content-center">
          <div className="col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
              <div className="image-container">
                  <img src={In} alt="Signup Visual" className="img-fluid" />
              </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-10 order-2 order-lg-1">
              <div className="card">
                  <div className="card-body text-center">
                      <img src={charity} alt="Logo" className="img-fluid signup-logo" />
                      <h3 className="text-dark mb-4">Création de Compte</h3>
                      <div className="d-flex justify-content-between mx-4">
          <button className="social-button">Google</button>
          <button className="social-button">Facebook</button>
          {/* <button className="social-button">Twitter</button> */}
        </div>
                      <p>ou</p>
                      <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                              <input
                                  type="email"
                                  className="form-control rounded-input"
                                  placeholder="Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </div>
                          <div className="mb-3 position-relative">
                              <input
                                  type="text"
                                  className="form-control rounded-input"
                                  placeholder="Pays"
                                  value={country}
                                  onChange={handleCountryChange}
                                  required
                              />
                              {filteredCountries.length > 0 && (
                                  <ul className="list-group mt-2 position-absolute" style={{ zIndex: 10 }}>
                                      {filteredCountries.map((countryItem) => (
                                          <li
                                              key={countryItem.name.common}
                                              className="list-group-item list-group-item-action"
                                              onClick={() => handleCountrySelect(countryItem.name.common)}
                                              style={{ cursor: "pointer" }}
                                          >
                                              <img
                                                  src={countryItem.flags.svg}
                                                  alt={`Drapeau de ${countryItem.name.common}`}
                                                  className="flag-image"
                                              />
                                              {countryItem.name.common}
                                          </li>
                                      ))}
                                  </ul>
                              )}
                          </div>
                          <div className="mb-3">
                              <input
                                  type="password"
                                  className="form-control rounded-input"
                                  placeholder="Mot de passe"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                              />
                          </div>
                          <div className="mb-3">
                              <input
                                  type="password"
                                  className="form-control rounded-input"
                                  placeholder="Confirmer le mot de passe"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  required
                              />
                              {passwordError && <p className="text-danger">{passwordError}</p>}
                          </div>
                          <button 
    type="submit" 
    className="btn btn-warning w-100" 
    disabled={isLoading || signupLoading || sendMailLoading}
>
    {isLoading || signupLoading || sendMailLoading ? "Création en cours..." : "Créer un compte"}
</button>

                      </form>
                      <div className="text-center mt-3">
                          <p>Vous avez déjà un compte? <NavLink to={ROUTES.LOGIN} className="text-warning">Connectez-vous</NavLink></p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
};

export default Signup;
