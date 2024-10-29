import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import "../public/assets/css/components/paymentDetail.css";

const DetailPayment = ({ paymentInfos, closeDetail ,modalId }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Détails de Paiement', 105, 20, null, null, 'center');
        doc.setFontSize(12);
        let y = 40;

        Object.entries(paymentInfos).forEach(([label, value]) => {
            doc.text(`${label}: ${value}`, 20, y);
            y += 10;
        });

        doc.save('details_paiement.pdf');
    };

    const renderDonateurIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
    );

    const renderPaysDonateurIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    );

    const renderSommePayeeIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
    );

    const renderMoyenPaiementIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
        </svg>
    );

    const renderStatutIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    );

    const renderDatePaiementIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
    );

    const renderHeurePaiementIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
    );

    const renderBeneficiaireIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
    );

    const renderPaysBeneficiaireIcon = () => (
        <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    );

    return (
        <div className="modal show d-block" id={modalId} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header header-payment">
                        <h5 className="modal-title" id="paymentDetailLabel">
                            {renderDonateurIcon()} Détails de Paiement
                        </h5>
                        {/* <button type="button" className="close" onClick={closeDetail} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    <div className="modal-body">
                        <div className="details-grid">
                            <div className="detail-payment">
                                {renderDonateurIcon()}
                                <span className="detail-label">Donateur</span>
                                <span className="detail-value">{paymentInfos?.donateur}</span>
                            </div>
                            <div className="detail-payment">
                                {renderPaysDonateurIcon()}
                                <span className="detail-label">Pays du donateur</span>
                                <span className="detail-value">{paymentInfos?.country}</span>
                            </div>
                            <div className="detail-payment">
                                {renderSommePayeeIcon()}
                                <span className="detail-label">Somme payée</span>
                                <span className="detail-value badge-montant px-4">
                                    {paymentInfos?.montant}€
                                    </span>
                            </div>
                            <div className="detail-payment">
                                {renderMoyenPaiementIcon()}
                                <span className="detail-label">Moyen de paiement</span>
                                <span className="detail-value">{paymentInfos?.moyenPaiement}</span>
                            </div>
                            <div className="detail-payment">
                                {renderStatutIcon()}
                                <span className="detail-label">Statut</span>
                                <span className="detail-value">{paymentInfos?.statut}</span>
                            </div>
                            <div className="detail-payment">
                                {renderDatePaiementIcon()}
                                <span className="detail-label">Date de paiement</span>
                                <span className="detail-value">{paymentInfos?.datePaiement}</span>
                            </div>
                            <div className="detail-payment">
                                {renderHeurePaiementIcon()}
                                <span className="detail-label">Heure de paiement</span>
                                <span className="detail-value">{paymentInfos?.heurePaiement}</span>
                            </div>
                            <div className="detail-payment">
                                {renderBeneficiaireIcon()}
                                <span className="detail-label">Bénéficiaire</span>
                                <span className="detail-value">{paymentInfos.beneficiaire}</span>
                            </div>
                            <div className="detail-payment">
                                {renderPaysBeneficiaireIcon()}
                                <span className="detail-label">Pays du bénéficiaire</span>
                                <span className="detail-value">{paymentInfos?.country}</span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn  test-pop" onClick={closeDetail}>Fermer</button>
                        <button type="button" className="btn  test-pop" onClick={downloadPDF}>Télécharger</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPayment;
