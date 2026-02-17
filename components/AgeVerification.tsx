'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('age_verified');
    if (!isVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('age_verified', 'true');
    setIsOpen(false);
  };

  const handleDecline = () => {
    setShowWarning(true);
    setTimeout(() => {
      window.location.href = 'https://www.google.com';
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0A1628 0%, #0C2E4A 50%, #0A1628 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Navigation grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(126,180,210,0.08) 79px, rgba(126,180,210,0.08) 80px),' +
            'repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(126,180,210,0.08) 79px, rgba(126,180,210,0.08) 80px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Dashed latitude/longitude overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 159px, rgba(126,180,210,0.12) 159px, rgba(126,180,210,0.12) 160px),' +
            'repeating-linear-gradient(90deg, transparent, transparent 159px, rgba(126,180,210,0.12) 159px, rgba(126,180,210,0.12) 160px)',
          backgroundSize: '160px 160px',
        }}
      />

      {/* SVG Guadeloupe — right side */}
      <svg
        viewBox="0 0 200 220"
        style={{
          position: 'absolute',
          right: '8%',
          top: '15%',
          width: '260px',
          height: '280px',
          opacity: 0.12,
        }}
      >
        {/* Basse-Terre (left wing) */}
        <path
          d="M40,60 C35,45 45,25 60,20 C75,15 85,25 90,40 C95,55 100,75 98,95 C96,115 90,140 80,155 C70,170 55,175 45,165 C35,155 30,135 32,115 C34,95 38,75 40,60Z"
          fill="none"
          stroke="#2EC4B6"
          strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px rgba(46,196,182,0.3))' }}
        />
        <path
          d="M40,60 C35,45 45,25 60,20 C75,15 85,25 90,40 C95,55 100,75 98,95 C96,115 90,140 80,155 C70,170 55,175 45,165 C35,155 30,135 32,115 C34,95 38,75 40,60Z"
          fill="rgba(46,196,182,0.06)"
        />
        {/* Grande-Terre (right wing) */}
        <path
          d="M105,35 C115,20 135,15 150,25 C165,35 170,55 165,75 C160,95 148,110 135,115 C122,120 110,112 105,100 C100,88 98,65 105,35Z"
          fill="none"
          stroke="#2EC4B6"
          strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px rgba(46,196,182,0.3))' }}
        />
        <path
          d="M105,35 C115,20 135,15 150,25 C165,35 170,55 165,75 C160,95 148,110 135,115 C122,120 110,112 105,100 C100,88 98,65 105,35Z"
          fill="rgba(46,196,182,0.06)"
        />
        {/* Canal — Rivière Salée */}
        <path
          d="M95,55 C98,48 102,45 105,48"
          fill="none"
          stroke="rgba(126,180,210,0.3)"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        {/* Label */}
        <text
          x="100"
          y="200"
          textAnchor="middle"
          fill="#C8A24D"
          fontSize="11"
          fontFamily="serif"
          opacity="0.5"
          letterSpacing="3"
        >
          GUADELOUPE
        </text>
      </svg>

      {/* SVG Martinique — left side */}
      <svg
        viewBox="0 0 140 280"
        style={{
          position: 'absolute',
          left: '8%',
          bottom: '10%',
          width: '180px',
          height: '340px',
          opacity: 0.12,
        }}
      >
        <path
          d="M55,20 C70,15 85,20 90,35 C95,50 88,65 82,80 C90,85 95,95 92,110 C89,125 80,135 75,150 C82,160 85,175 80,190 C75,205 65,220 55,230 C45,240 35,238 30,225 C25,212 28,195 35,180 C30,170 25,155 28,140 C31,125 40,115 45,105 C38,95 35,80 40,65 C45,50 50,35 55,20Z"
          fill="none"
          stroke="#C8A24D"
          strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px rgba(200,162,77,0.3))' }}
        />
        <path
          d="M55,20 C70,15 85,20 90,35 C95,50 88,65 82,80 C90,85 95,95 92,110 C89,125 80,135 75,150 C82,160 85,175 80,190 C75,205 65,220 55,230 C45,240 35,238 30,225 C25,212 28,195 35,180 C30,170 25,155 28,140 C31,125 40,115 45,105 C38,95 35,80 40,65 C45,50 50,35 55,20Z"
          fill="rgba(200,162,77,0.06)"
        />
        {/* Montagne Pelée marker */}
        <circle cx="65" cy="45" r="3" fill="none" stroke="#E07A5F" strokeWidth="1" opacity="0.4" />
        <text
          x="70"
          y="260"
          textAnchor="middle"
          fill="#C8A24D"
          fontSize="11"
          fontFamily="serif"
          opacity="0.5"
          letterSpacing="3"
        >
          MARTINIQUE
        </text>
      </svg>

      {/* Compass rose — top right */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '140px',
          height: '140px',
          opacity: 0.1,
        }}
      >
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#C8A24D" strokeWidth="1" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="#C8A24D" strokeWidth="0.5" />
        {/* Cardinal points — main star */}
        <polygon
          points="100,15 108,85 100,75 92,85"
          fill="#C8A24D"
          opacity="0.7"
        />
        <polygon
          points="100,185 108,115 100,125 92,115"
          fill="#C8A24D"
          opacity="0.4"
        />
        <polygon
          points="15,100 85,92 75,100 85,108"
          fill="#C8A24D"
          opacity="0.4"
        />
        <polygon
          points="185,100 115,92 125,100 115,108"
          fill="#C8A24D"
          opacity="0.4"
        />
        {/* Intercardinal points */}
        <polygon
          points="38,38 88,88 82,92 92,82"
          fill="#C8A24D"
          opacity="0.25"
        />
        <polygon
          points="162,38 112,88 118,92 108,82"
          fill="#C8A24D"
          opacity="0.25"
        />
        <polygon
          points="38,162 88,112 92,118 82,108"
          fill="#C8A24D"
          opacity="0.25"
        />
        <polygon
          points="162,162 112,112 108,118 118,108"
          fill="#C8A24D"
          opacity="0.25"
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill="#C8A24D" opacity="0.6" />
        {/* Cardinal letters */}
        <text x="100" y="12" textAnchor="middle" fill="#C8A24D" fontSize="12" fontFamily="serif" fontWeight="bold">N</text>
        <text x="100" y="198" textAnchor="middle" fill="#C8A24D" fontSize="12" fontFamily="serif">S</text>
        <text x="6" y="104" textAnchor="middle" fill="#C8A24D" fontSize="12" fontFamily="serif">O</text>
        <text x="194" y="104" textAnchor="middle" fill="#C8A24D" fontSize="12" fontFamily="serif">E</text>
      </svg>

      {/* Coordinate annotations */}
      <span
        style={{
          position: 'absolute',
          top: '12%',
          left: '4%',
          color: 'rgba(126,180,210,0.2)',
          fontSize: '10px',
          fontFamily: 'monospace',
          letterSpacing: '1px',
        }}
      >
        14°40&apos;N
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '4%',
          color: 'rgba(126,180,210,0.2)',
          fontSize: '10px',
          fontFamily: 'monospace',
          letterSpacing: '1px',
        }}
      >
        61°00&apos;W
      </span>

      {/* Modal — glassmorphism */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '480px',
          width: '100%',
          margin: '0 16px',
          padding: '40px 32px',
          background: 'rgba(10,22,40,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(46,196,182,0.2)',
          borderRadius: '12px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(46,196,182,0.1)',
          textAlign: 'center',
        }}
      >
        {/* Small anchor icon — subtle nod to original */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.15 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#C8A24D">
            <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm1 8.05V18l3 2h-8l3-2V10.05A7 7 0 0 0 5 17h2a5 5 0 0 1 10 0h2a7 7 0 0 0-6-6.95z" />
          </svg>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '28px',
            fontFamily: 'serif',
            color: '#C8A24D',
            marginBottom: '12px',
            fontWeight: 400,
            letterSpacing: '1px',
          }}
        >
          Vérification d&apos;âge
        </h2>

        {/* Decorative turquoise line */}
        <div
          style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #2EC4B6, transparent)',
            margin: '0 auto 28px',
          }}
        />

        {/* Message */}
        <p
          style={{
            color: '#F5E6C8',
            fontSize: '15px',
            lineHeight: 1.7,
            marginBottom: '8px',
          }}
        >
          Ce site propose la vente d&apos;alcool.
          <br />
          Vous devez avoir l&apos;âge légal pour continuer.
        </p>
        <p
          style={{
            fontFamily: 'serif',
            color: '#C8A24D',
            fontSize: '17px',
            marginBottom: '32px',
          }}
        >
          Avez-vous{' '}
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#2EC4B6' }}>18 ans</span>{' '}
          ou plus ?
        </p>

        {/* Warning */}
        {showWarning && (
          <div
            style={{
              marginBottom: '24px',
              background: 'rgba(224,122,95,0.15)',
              border: '1px solid rgba(224,122,95,0.4)',
              borderRadius: '8px',
              padding: '14px',
            }}
          >
            <p style={{ color: '#E07A5F', fontWeight: 600, fontSize: '13px', margin: 0 }}>
              Accès refusé. Redirection en cours...
            </p>
          </div>
        )}

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleAccept}
            disabled={showWarning}
            style={{
              padding: '14px 32px',
              background: showWarning
                ? 'rgba(46,196,182,0.3)'
                : 'linear-gradient(135deg, #2EC4B6, #E07A5F)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              border: 'none',
              borderRadius: '8px',
              cursor: showWarning ? 'not-allowed' : 'pointer',
              opacity: showWarning ? 0.5 : 1,
              transition: 'all 0.3s ease',
              boxShadow: showWarning ? 'none' : '0 4px 20px rgba(46,196,182,0.3)',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              if (!showWarning) {
                (e.target as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(46,196,182,0.45)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showWarning) {
                (e.target as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(46,196,182,0.3)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }
            }}
          >
            Oui, j&apos;ai 18 ans ou plus
          </button>
          <button
            onClick={handleDecline}
            disabled={showWarning}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              color: '#7BA7BC',
              fontWeight: 500,
              fontSize: '15px',
              border: '1px solid rgba(46,196,182,0.25)',
              borderRadius: '8px',
              cursor: showWarning ? 'not-allowed' : 'pointer',
              opacity: showWarning ? 0.5 : 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!showWarning) {
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(46,196,182,0.5)';
                (e.target as HTMLButtonElement).style.color = '#F5E6C8';
              }
            }}
            onMouseLeave={(e) => {
              if (!showWarning) {
                (e.target as HTMLButtonElement).style.borderColor = 'rgba(46,196,182,0.25)';
                (e.target as HTMLButtonElement).style.color = '#7BA7BC';
              }
            }}
          >
            Non, je suis mineur
          </button>
        </div>

        {/* Legal mention */}
        <p
          style={{
            marginTop: '28px',
            fontSize: '11px',
            color: '#7BA7BC',
            opacity: 0.6,
            lineHeight: 1.5,
          }}
        >
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </div>
    </div>
  );
}
