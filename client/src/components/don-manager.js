import React, { useState } from "react";
import "../public/assets/css/components/userManager.css";
import DetailPayment from "../components/paymentDetail";

const users = [
  {
    donateur: "user1@example.com",
    country: "France",
    beneficiaire: "beneficiaire1@example.com",
    montant: 500000
  },
  {
    donateur: "user2@example.com",
    country: "France",
    beneficiaire: "beneficiaire2@example.com",
    montant: 500000
  },
  {
    donateur: "user3@example.com",
    country: "Togo",
    beneficiaire: "beneficiaire3@example.com",
    montant: 500000
  },
  {
    donateur: "user4@example.com",
    country: "Russie",
    beneficiaire: "beneficiaire4@example.com",
    montant: 500000
  }
];

const DonManager = () => {
  const handleView = (email) => {
    alert(`Viewing details for ${email}`);
    return (
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Titre du Modal
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fermer"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                Voici le contenu du modal. Vous pouvez mettre ici tout type de
                contenu HTML.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button type="button" class="btn btn-primary">
                Enregistrer les changements
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default DonManager;
