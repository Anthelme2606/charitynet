import React, { useState } from 'react';
import '../public/assets/css/components/pop.css';

function ConfirmPop({ message, onConfirm, onClose }) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="popup">
            <div className="popup-content">
                <h2>{message}</h2>
                <p>Cette action est irréversible. Assurez-vous d'avoir vérifié tous les détails avant de procéder.</p>
                <div className="button-container">
                    <button className="btn btn-oui" onClick={onConfirm}>
                        <svg className="icon-pop" viewBox="0 0 20 20">
                            <path fill="currentColor" d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 M7.3,14.7 L3.6,11 L5,9.6 L7.3,11.9 L14.3,5 L15.7,6.4 L7.3,14.7 Z"/>
                        </svg>
                        Oui
                    </button>
                    <button className="btn btn-non" onClick={onClose}>
                        <svg className="icon-pop" viewBox="0 0 20 20">
                            <path fill="currentColor" d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 M14.3,14.3 C14.1,14.5 13.9,14.6 13.7,14.6 C13.5,14.6 13.3,14.5 13.1,14.3 L10,11.2 L6.9,14.3 C6.7,14.5 6.5,14.6 6.3,14.6 C6.1,14.6 5.9,14.5 5.7,14.3 C5.3,13.9 5.3,13.3 5.7,12.9 L8.8,9.8 L5.7,6.7 C5.3,6.3 5.3,5.7 5.7,5.3 C6.1,4.9 6.7,4.9 7.1,5.3 L10.2,8.4 L13.3,5.3 C13.7,4.9 14.3,4.9 14.7,5.3 C15.1,5.7 15.1,6.3 14.7,6.7 L11.6,9.8 L14.7,12.9 C15.1,13.3 15.1,13.9 14.7,14.3 L14.3,14.3 Z"/>
                        </svg>
                        Non
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}



export default ConfirmPop;
