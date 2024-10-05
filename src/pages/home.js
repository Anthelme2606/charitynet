import React from "react";
import PageLayout from "../layouts/pageLayout.js";
import Donate from "../partials/donate.js";
import "../public/assets/css/home.css";
import Try from "../layouts/try.js";
import World from '../partials/world.js';
import Services from "../components/services.js";

const Home = () => {
  return (
    <PageLayout pageTitle="Accueil">
    
      <div className="w-100 m-0 p-0">
        <header className="header-bg d-flex flex-column justify-content-center align-items-center text-center">
          <div className=" w-100">
            <h1 className="display-6 font-weight-bold mb-2">
              Bienvenue sur{" "}
              <span
                style={{
                  color: "#f8a708",
                }}
              >
                C
              </span>
              harity
              <span
                style={{
                  color: "#f8a708",
                }}
              >
                N
              </span>
              et
            </h1>
            <p className="lead lead-bottom-text">
            Chaque don compte. Donateurs et bénéficiaires, 
            vous êtes au cœur de notre mission.<br/> Explorez et ensemble, changeons des vies ! 




            </p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="wave"
          >
            <path
              fill="#F7FAFC"
              d="M0,32L34.3,26.7C68.6,21,137,11,206,53.3C274.3,96,343,192,411,224C480,256,549,224,617,186.7C685.7,149,754,107,823,101.3C891.4,96,960,128,1029,117.3C1097.1,107,1166,53,1234,32C1302.9,11,1371,21,1406,26.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>

        
        </header>
      </div>
      <Services/>
    
     
        <Try />
        <div className='row row-cols-1 row-cols-md-2 g-2 w-100'>
          <div className="col h-100">
    
          <World/>
          </div>
          
       <Donate/>
        
        

        </div>
      
    </PageLayout>
  );
};

export default Home;
