import React, { useState } from 'react';
import DashboardLayout from "../../layouts/dashboardLayout";
import '../../public/assets/css/caisse-page.css';

const CaissePage = () => {
  const [beneficiaires, setBeneficiaires] = useState([
    { id: 1, nom: "Association A", pays: "France", sommeEnCaisse: 5000 },
    { id: 2, nom: "Fondation B", pays: "Belgique", sommeEnCaisse: 7500 },
    { id: 3, nom: "ONG C", pays: "Suisse", sommeEnCaisse: 3000 },
  ]);
  
  const [transactions, setTransactions] = useState({
    1: [
      { id: 1, type: 'crédit', montant: 2000, date: '2023-05-01', expediteur: 'Donateur X' },
      { id: 2, type: 'débit', montant: 500, date: '2023-05-15', raison: 'Achat de fournitures' },
      { id: 3, type: 'crédit', montant: 3500, date: '2023-05-20', expediteur: 'Entreprise Y' },
    ],
    2: [
      { id: 1, type: 'crédit', montant: 5000, date: '2023-05-05', expediteur: 'Fondation Z' },
      { id: 2, type: 'crédit', montant: 2500, date: '2023-05-10', expediteur: 'Donateur W' },
      { id: 3, type: 'débit', montant: 1000, date: '2023-05-25', raison: 'Frais de fonctionnement' },
    ],
    3: [
      { id: 1, type: 'crédit', montant: 3000, date: '2023-05-03', expediteur: 'Donateur V' },
      { id: 2, type: 'débit', montant: 500, date: '2023-05-18', raison: 'Matériel informatique' },
      { id: 3, type: 'crédit', montant: 500, date: '2023-05-22', expediteur: 'Donateur U' },
    ],
  });

  const [selectedBeneficiaire, setSelectedBeneficiaire] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Calcul du total des virements
  const totalVirements = beneficiaires.reduce((sum, b) => sum + b.sommeEnCaisse, 0);

  // Fonction pour gérer le clic sur les détails du bénéficiaire
  const handleDetailsClick = (beneficiaireId) => {
  
    setSelectedBeneficiaire(beneficiaireId);
    
  
  };
  const getBeneficiaire=(id)=>{
    console.log("message",id);
    return beneficiaires.find((ben)=>ben.id===id);

  }

  
  

  // Fonction pour gérer le clic sur les détails de la transaction
  const handleTransactionClick = (beneficiaireId, transactionId) => {
    const transaction = transactions[beneficiaireId].find(t => t.id === transactionId);
    setSelectedTransaction(transaction);
  };

  // Fonction pour fermer les modals
  const closeModals = () => {
    setSelectedBeneficiaire(null);
    setSelectedTransaction(null);
  };

  return (
    <DashboardLayout>
      <div className="card card-caisse">
        <header className="card-header card-caisse-header">
          <h1 className="card-title">Interface de Caisse</h1>
          <span className="badge badge-caisse" id="totalVirements">
            Total des virements: {totalVirements.toFixed(2)} €
          </span>
        </header>
        <div className="card-caisse-content">
          <div className="table-caisse-container">
            <table className="table-caisse" id="beneficiairesTable">
              <thead className="thead-caisse">
                <tr className="tr-caisse">
                  <th className="th-caisse">Nom du bénéficiaire</th>
                  <th className="th-caisse">Pays</th>
                  <th className="th-caisse">Somme en caisse</th>
                  <th className="th-caisse">Détails</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaires.map((beneficiaire) => (
                  <tr className="tr-caisse" key={beneficiaire.id}>
                    <td className="td-caisse">{beneficiaire.nom}</td>
                    <td className="td-caisse">{beneficiaire.pays}</td>
                    <td className="td-caisse">{beneficiaire.sommeEnCaisse.toFixed(2)} €</td>
                    <td className="td-caisse">
                      <button className="btn-caisse" onClick={() =>(
                        //setSelectedBeneficiaire(beneficiaire.id),
                        handleDetailsClick(beneficiaire.id)
                      )}>Détails {beneficiaire.id}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBeneficiaire !== null && (
          <div className="modal modal-caisse show d-block" id={selectedBeneficiaire} tabIndex="-1" role="dialog"onClick={closeModals}>
            <div className="modal-content modal-caisse-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-caisse" onClick={closeModals}>&times;</span>
              <h2>Transactions de {getBeneficiaire(selectedBeneficiaire).nom}</h2>
              <table className="table-caisse" id="transactionsTable">
                <thead className="thead-caisse">
                  <tr className="tr-caisse">
                    <th className="th-caisse">Date</th>
                    <th className="th-caisse">Type</th>
                    <th className="th-caisse">Montant</th>
                    <th className="th-caisse">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions[selectedBeneficiaire].map((transaction) => (
                    <tr className="tr-caisse" key={transaction.id}>
                      <td className="td-caisse">{transaction.date}</td>
                      <td className="td-caisse">
                        <span className={`badge bagde-caisse ${transaction.type === 'crédit' ? 'badge-caisse-success' : 'badge-caisse-danger'}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="td-caisse">{transaction.montant.toFixed(2)} €</td>
                      <td className="td-caisse">
                        <button className="btn-caisse" onClick={() => handleTransactionClick(selectedBeneficiaire, transaction.id)}>
                          Voir détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTransaction && (
          <div className="modal show d-block modal-caisse" id={selectedTransaction} onClick={closeModals}>
            <div className="modal-content modal-caisse-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-caisse" onClick={closeModals}>&times;</span>
              <h2>Détails de la transaction du {selectedTransaction.date}</h2>
              <p><strong>Type:</strong> {selectedTransaction.type}</p>
              <p><strong>Montant:</strong> {selectedTransaction.montant.toFixed(2)} €</p>
              {selectedTransaction.type === 'crédit' 
                ? <p><strong>Expéditeur:</strong> {selectedTransaction.expediteur}</p>
                : <p><strong>Raison:</strong> {selectedTransaction.raison}</p>}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CaissePage;
