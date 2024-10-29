import React from 'react';
import DashboardLayout from '../layouts/dashboardLayout';

const About = () => {
    return (
        <DashboardLayout>
        <div>
            <style>
                {`
                   

                    main {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 20px;
                    }

                    section {
                        padding: 20px;
                        margin: 10px 0;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        color: blueviolet;
                        text-align: center;
                    }

                    h2 {
                        color: orange;
                    }

                    ul {
                        list-style-type: disc;
                        padding-left: 20px;
                    }

                    @media (max-width: 600px) {
                        main {
                            padding: 10px;
                        }

                        section {
                            padding: 15px;
                        }

                        h1, h2 {
                            font-size: 1.5em; /* Ajuster la taille de police sur les petits écrans */
                        }
                    }
                `}
            </style>

            <main>
                <section className="intro">
                    <h1>À Propos de Nous</h1>
                    <p>
                        Nous sommes une organisation dédiée à la gestion des dons de bienfaisance. 
                        Notre objectif est de faciliter les contributions des donateurs tout en garantissant 
                        que chaque don est utilisé de manière transparente et responsable.
                    </p>
                </section>

                <section className="mission">
                    <h2>Notre Mission</h2>
                    <p>
                        Faciliter le processus de dons pour les œuvres caritatives et assurer que chaque contribution 
                        atteint ceux qui en ont besoin. Nous nous engageons à rendre le don simple et accessible pour tous.
                    </p>
                </section>

                <section className="vision">
                    <h2>Notre Vision</h2>
                    <p>
                        Nous croyons en un monde où chaque don compte et où chacun a la possibilité d'aider les autres. 
                        Ensemble, nous pouvons faire une différence significative dans la vie des personnes dans le besoin.
                    </p>
                </section>

                <section className="values">
                    <h2>Nos Valeurs</h2>
                    <ul>
                        <li>Transparence</li>
                        <li>Engagement</li>
                        <li>Compassion</li>
                        <li>Responsabilité</li>
                    </ul>
                    <p>
                        Nous nous engageons à respecter ces valeurs dans toutes nos actions et interactions.
                    </p>
                </section>
            </main>
        </div>
        </DashboardLayout>
    );
};

export default About;
