import React, { useState } from 'react';
import walletImg from './assets/wallet.png';

function ProgressRing({ value, max, size = 240, stroke = 18, color = '#2563eb', bg = '#f1f5f9' }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={bg}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(.4,2,.6,1)' }}
      />
      <image
        href={walletImg}
        x={size / 2 - 60}
        y={size / 2 - 45}
        width="120"
        height="90"
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  );
}

function BackButton({ onBack }) {
  return (
    <button className="back-btn" onClick={onBack}>&lt; Back</button>
  );
}

export function Home() {
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState(0);
  const dailyLimit = 500;
  return (
    <div className="screen home-screen">
      <div className="header">
        <h1>Wallet Clicker</h1>
      </div>
      <div style={{ margin: '24px 0 8px 0' }}>
        <ProgressRing value={clicks} max={dailyLimit} />
      </div>
      <img src={walletImg} alt="Wallet" className="wallet-img" style={{ width: 120, height: 90, marginTop: '-180px', marginBottom: '12px', zIndex: 2, position: 'relative' }} />
      <div className="progress-number" style={{ fontSize: '2rem', fontWeight: 700, color: '#222', marginBottom: 8 }}>{clicks}/{dailyLimit}</div>
      <button
        className="click-btn"
        onClick={() => {
          if (clicks < dailyLimit) {
            setPoints(points + 1);
            setClicks(clicks + 1);
          }
        }}
        disabled={clicks >= dailyLimit}
      >
        CLICK!
      </button>
      <div className="points">Points: <b>{points}</b></div>
      <div className="clicks-left">Clicks left: {dailyLimit - clicks}</div>
    </div>
  );
}

export function Tasks({ onBack }) {
  return (
    <div className="screen tasks-screen">
      <div className="header">
        <BackButton onBack={onBack} />
        <h1>Tasks</h1>
      </div>
      <div className="placeholder">Tasks screen (coming soon)</div>
    </div>
  );
}

export function Bag({ onBack }) {
  return (
    <div className="screen bag-screen">
      <div className="header">
        <BackButton onBack={onBack} />
        <h1>Bag</h1>
      </div>
      <div className="placeholder">Bag screen (coming soon)</div>
    </div>
  );
}

export function Market({ onBack }) {
  return (
    <div className="screen market-screen">
      <div className="header">
        <BackButton onBack={onBack} />
        <h1>Market</h1>
      </div>
      <div className="placeholder">Market screen (coming soon)</div>
    </div>
  );
}

export function Leaderboard({ onBack }) {
  return (
    <div className="screen leaderboard-screen">
      <div className="header">
        <BackButton onBack={onBack} />
        <h1>Leaderboard</h1>
      </div>
      <div className="placeholder">Leaderboard screen (coming soon)</div>
    </div>
  );
} 