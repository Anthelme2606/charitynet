import React from 'react';
import "../public/assets/css/components/userManager.css";

const users = [
    { donateur: 'user1@example.com', country: 'France',
        beneficiaire:"beneficiaire1@example.com",montant:500000},
        { donateur: 'user1@example.com', country: 'France',
            beneficiaire:"beneficiaire1@example.com",montant:500000},
            { donateur: 'user1@example.com', country: 'Togo',
                beneficiaire:"beneficiaire1@example.com",montant:500000},
                { donateur: 'user1@example.com', country: 'Russie',
                    beneficiaire:"beneficiaire1@example.com",montant:500000},
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
                    Voici le contenu du modal. Vous pouvez mettre ici tout type
                    de contenu HTML.
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

    const handleDisable = (email) => {
        alert(`Disabling user ${email}`);
    };

    return (
        <div className="w-100 m-0 p-0">
            <table className="m-table">
                <thead>
                    <tr>
                        <th>Donateur</th>
                        <th>Pays</th>
                        <th>Beneficiaire</th>
                        <th>Montant</th>
                       
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.donateur}</td>
                            <td>{user.country}</td>
                            <td>{user.beneficiaire}</td>
                            <td>{user.montant}€</td>
                            <td>
                            <button
                        className="badge preview px-4 "
                        onClick={() => handleView(user.donateur)}
                    >
                        <span className="bi bi-eye-fill"></span>
                    </button>
                    <button
                        className="badge preview mx-2 px-4"
                        onClick={() => handleView(user.donateur)}
                    >
                        <span className="bi bi-download"></span>
                    </button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Cards for mobile view */}
            {users.map((user, index) => (
                <div className="user-m-card" key={index}>
                    <h3>Donteur:{user.donateur}</h3>
                    <p><strong>Pays:</strong> {user.country}</p>
                    <p><strong>Beneficiaire:</strong> {user.beneficiaire}</p>
                    <p><strong>Montant:</strong> {user.montant}€</p>
                    <button
                        className="text-center badge px-4 preview"
                        onClick={() => handleView(user.donateur)}
                    >
                        <span className="bi bi-eye-fill"></span>
                    </button>
                    <button
                        className=" text-center badge mx-2 px-4 preview"
                        onClick={() => handleView(user.donateur)}
                    >
                        <span className="bi bi-download"></span>
                    </button>
                    
                </div>
            ))}
        </div>
    );
};

export default DonManager;
