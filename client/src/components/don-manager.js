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
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleView = (user) => {
        setSelectedUser(user);
        setOpenDetail(true);
    };

    const handleDisable = (email) => {
        alert(`Désactivation de l'utilisateur ${email}`);
    };

    return (
        <div className="w-100 m-0 p-0">
            {/* Vue en tableau pour les écrans larges */}
            <table className="m-table d-none d-md-table">
                <thead>
                    <tr>
                        <th>Donateur</th>
                        <th>Pays</th>
                        <th>Bénéficiaire</th>
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
                                    className="badge preview px-4"
                                    onClick={() => handleView(user)}
                                >
                                    <span className="bi bi-eye-fill"></span>
                                </button>
                                <button
                                    className="badge preview mx-2 px-4"
                                    onClick={() => handleDisable(user.donateur)}
                                >
                                    <span className="bi bi-download"></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Vue en carte pour les écrans mobiles */}
            <div className="d-md-none">
                {users.map((user, index) => (
                    <div className="user-m-card" key={index}>
                        <h3>Donateur : {user.donateur}</h3>
                        <p><strong>Pays :</strong> {user.country}</p>
                        <p><strong>Bénéficiaire :</strong> {user.beneficiaire}</p>
                        <p><strong>Montant :</strong> {user.montant}€</p>
                        <button
                            className="text-center badge px-4 preview"
                            onClick={() => handleView(user)}
                        >
                            <span className="bi bi-eye-fill"></span>
                        </button>
                        <button
                            className="text-center badge mx-2 px-4 preview"
                            onClick={() => handleDisable(user.donateur)}
                        >
                            <span className="bi bi-download"></span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal de détail */}
            {openDetail && selectedUser && (
                <DetailPayment
                    paymentInfos={selectedUser}
                    closeDetail={() => setOpenDetail(false)}
                    modalId="paymentDetailModal"
                />
            )}
        </div>
    );
};

export default DonManager;
