import DashboardLayout from "../../layouts/dashboardLayout";
import React, { useState, useMemo, useCallback } from "react";
import { AlertCircle, CreditCard, Check, Lock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MadeDonation = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // États pour la carte bancaire
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // Montants prédéfinis
  const predefinedAmounts = useMemo(() => [5, 10, 20, 50, 100], []);

  // Formatage du numéro de carte
  const formatCardNumber = useCallback((value) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/(\d{1,4})/g);
    return groups ? groups.join(" ").substr(0, 19) : "";
  }, []);

  // Formatage de la date d'expiration
  const formatExpiry = useCallback((value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  }, []);

  // Validation du formulaire
  const isValidForm = useMemo(() => {
    const validAmount = amount || customAmount;
    const validEmail = email.includes("@");
    const validCard = cardNumber.replace(/\s/g, "").length === 16;
    const validExpiry = expiry.length === 5;
    const validCvc = cvc.length === 3;
    return (
      validAmount && name && validEmail && validCard && validExpiry && validCvc
    );
  }, [amount, customAmount, name, email, cardNumber, expiry, cvc]);

  // Gestion du montant personnalisé
  const handleCustomAmount = useCallback((value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setCustomAmount(numericValue);
    setAmount("");
  }, []);

  // Gestion de la soumission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!isValidForm) {
        setError("Veuillez remplir tous les champs requis correctement.");
        return;
      }

      // Simulation d'envoi à une API
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
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold">Merci pour votre don!</h2>
            <p className="text-center text-gray-600">
              Un email de confirmation vous sera envoyé prochainement.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <DashboardLayout>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Faire un don</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Montants prédéfinis */}
            <div className="grid grid-cols-3 gap-2">
              {predefinedAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount("");
                  }}
                  className={`p-3 rounded border ${
                    amount === preset
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  {preset}€
                </button>
              ))}
            </div>

            {/* Montant personnalisé */}
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                placeholder="Montant personnalisé"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="absolute right-3 top-3">€</span>
            </div>

            {/* Informations personnelles */}
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom *"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email *"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message (optionnel)"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 h-24"
              />
            </div>

            {/* Informations de paiement */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="Numéro de carte"
                  maxLength="19"
                  className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").substr(0, 3))
                  }
                  placeholder="CVC"
                  maxLength="3"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            {/* Message de sécurité */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Vos informations de paiement sont sécurisées</span>
            </div>

            {/* Message d'erreur */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={!isValidForm}
              className={`w-full p-3 rounded flex items-center justify-center gap-2 ${
                isValidForm
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              Faire un don
            </button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MadeDonation;
