import DashboardLayout from "../../layouts/dashboardLayout";
import React, { useState, useMemo, useCallback } from "react";
import { AlertCircle, FiCreditCard, FiCheck, FiLock } from "react-icons/fi";

import Card from "../../components/Simple-card";
import Alert from "../../components/Alert";

const MadeDonation = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const predefinedAmounts = useMemo(() => [5, 10, 20, 50, 100], []);

  const formatCardNumber = useCallback((value) => {
    const cleaned = value.replace(/\D/g, "").match(/.{1,4}/g);
    return cleaned ? cleaned.join(" ").substr(0, 19) : "";
  }, []);

  const formatExpiry = useCallback((value) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length >= 2
      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      : cleaned;
  }, []);

  const isValidForm = useMemo(() => {
    return (
      (amount || customAmount) &&
      name &&
      email.includes("@") &&
      cardNumber.replace(/\s/g, "").length === 16 &&
      expiry.length === 5 &&
      cvc.length === 3
    );
  }, [amount, customAmount, name, email, cardNumber, expiry, cvc]);

  const handleCustomAmount = useCallback((value) => {
    setCustomAmount(value.replace(/[^0-9]/g, ""));
    setAmount("");
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!isValidForm) {
        setError("Veuillez remplir tous les champs requis correctement.");
        return;
      }

      console.log({
        amount: amount || customAmount,
        name,
        email,
        message,
        cardNumber: cardNumber.replace(/\s/g, ""),
        expiry,
        cvc
      });

      setIsSubmitted(true);
      setError("");
    },
    [
      amount,
      customAmount,
      name,
      email,
      message,
      cardNumber,
      expiry,
      cvc,
      isValidForm
    ]
  );

  if (isSubmitted) {
    return (
      <Card>
        <div className="text-center">
          <div className="rounded-circle bg-success p-3 mb-3 d-inline-flex">
            <FiCheck className="text-white" size={32} />
          </div>
          <h5>Merci pour votre don!</h5>
          <p className="text-muted">
            Un email de confirmation vous sera envoyé prochainement.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card title="Faire un don">
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-2 row-cols-md-2  g-1 mb-3">
              {predefinedAmounts.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount("");
                  }}
                  className={`btn text-center rounded-md  ${
                    amount === preset ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  {preset}€
                </button>
              ))}
            </div>

            <div className="mb-3 position-relative">
              <input
                type="text"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                placeholder="Montant personnalisé"
                className="form-control"
              />
              <span className="position-absolute end-0 top-0 me-2 mt-2">€</span>
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom *"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email *"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message (optionnel)"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                placeholder="Numéro de carte"
                maxLength="19"
                className="form-control"
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="form-control"
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").substr(0, 3))
                  }
                  placeholder="CVC"
                  maxLength="3"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="d-flex align-items-center mb-3 text-muted">
              <FiLock className="me-2" />
              <span>Vos informations de paiement sont sécurisées</span>
            </div>

            {error && (
              <Alert variant="destructive" title="Erreur" description={error} />
            )}

            <button
              type="submit"
              disabled={!isValidForm}
              className={`btn w-100 ${
                isValidForm ? "btn-primary" : "btn-secondary disabled"
              }`}
            >
              <FiCreditCard className="me-2" />
              Faire un don
            </button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MadeDonation;
