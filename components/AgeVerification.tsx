'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVerified(true);
    setShowModal(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified || !showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Vérification d'âge</h2>
        <p className="text-gray-600 mb-6">
          Ce site propose la vente d'alcool. Vous devez avoir 18 ans ou plus pour y accéder.
        </p>
        <p className="text-sm text-red-600 mb-6 font-semibold">
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleConfirm}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            J'ai 18 ans ou plus
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            J'ai moins de 18 ans
          </button>
        </div>
      </div>
    </div>
  );
}