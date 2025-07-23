import React, { useState, useRef } from 'react';
import walletImg from './assets/wallet.png';
import { TrophyIcon } from './icons';

function Confetti({ x, y, trigger }) {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    if (trigger) {
      setShow(false);
      setTimeout(() => setShow(true), 10);
      setTimeout(() => setShow(false), 500);
    }
  }, [trigger]);
  if (!show) return null;
  // 6 konfeti parçacığı
  const colors = ['#2563eb', '#ffb300', '#38bdf8', '#ffd166', '#fff', '#222'];
  return (
    <svg style={{ position: 'absolute', left: x - 12, top: y - 24, pointerEvents: 'none', zIndex: 10 }} width={48} height={48}>
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          cx={24 + Math.cos((i / 6) * 2 * Math.PI) * 12}
          cy={24 + Math.sin((i / 6) * 2 * Math.PI) * 12}
          r={3 + Math.random() * 2}
          fill={colors[i % colors.length]}
        >
          <animate
            attributeName="cy"
            from={24 + Math.sin((i / 6) * 2 * Math.PI) * 12}
            to={8 + Math.sin((i / 6) * 2 * Math.PI) * 24}
            dur="0.5s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="0.5s"
            fill="freeze"
          />
        </circle>
      ))}
    </svg>
  );
}

function ProgressBar({ value, max, triggerConfetti }) {
  const pct = Math.min(value / max, 1) * 100;
  // Barın ucunun x pozisyonu (240px genişlikte)
  const barX = 12 + (pct / 100) * (240 - 24);
  return (
    <div style={{ width: 240, margin: '0 auto', marginBottom: 16, position: 'relative' }}>
      <div style={{
        width: '100%',
        height: 18,
        background: '#f1f5f9',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div
          style={{
            width: pct + '%',
            height: '100%',
            background: 'linear-gradient(90deg, #2563eb 0%, #ffb300 100%)',
            borderRadius: 12,
            transition: 'width 0.4s cubic-bezier(.4,2,.6,1)',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        />
        <Confetti x={barX} y={9} trigger={triggerConfetti} />
      </div>
    </div>
  );
}

function BackButton({ onBack }) {
  return (
    <button className="back-btn" onClick={onBack}>&lt; Back</button>
  );
}

export function Home({ onLeaderboardClick }) {
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [walletClicked, setWalletClicked] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  const dailyLimit = 50;
  // Kullanıcı adını Telegram WebApp API'den al
  React.useEffect(() => {
    console.log('Telegram WebApp:', window.Telegram);
    if (
      window.Telegram &&
      window.Telegram.WebApp &&
      window.Telegram.WebApp.initDataUnsafe &&
      window.Telegram.WebApp.initDataUnsafe.user
    ) {
      setTelegramUsername(window.Telegram.WebApp.initDataUnsafe.user.username || '');
    }
  }, []);
  // Animasyon bitince class'ı kaldır
  React.useEffect(() => {
    if (walletClicked) {
      const t = setTimeout(() => setWalletClicked(false), 180);
      return () => clearTimeout(t);
    }
  }, [walletClicked]);
  return (
    <div className="screen home-screen">
      <div className="header" style={{ marginBottom: 24 }}>
        <h1 className="fancy-title">Wallet Points : <span style={{color:'#ffb300'}}>{points}</span></h1>
      </div>
      <img
        src={walletImg}
        alt="Wallet"
        className={`wallet-img${walletClicked ? ' clicked' : ''}`}
        style={{ width: 270, height: 202, margin: '32px 0 12px 0', zIndex: 2, position: 'relative' }}
      />
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="progress-number" style={{ fontSize: '2rem', fontWeight: 700, color: '#222', marginBottom: 8 }}>{clicks}/{dailyLimit}</div>
        <ProgressBar value={clicks} max={dailyLimit} triggerConfetti={confettiTrigger} />
        <button
          className="click-btn"
          onClick={() => {
            if (clicks < dailyLimit) {
              setPoints(points + 1);
              setClicks(clicks + 1);
              setConfettiTrigger(t => !t); // tetikleyici değişsin
              setWalletClicked(true); // animasyonu tetikle
            }
          }}
          disabled={clicks >= dailyLimit}
        >
          CLICK!
        </button>
        <div style={{ color: '#888', fontSize: '1.08rem', marginTop: 12, textAlign: 'center', fontWeight: 500 }}>
          {telegramUsername ? `@${telegramUsername}` : 'Telegram ile giriş yapınız'}
        </div>
      </div>
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