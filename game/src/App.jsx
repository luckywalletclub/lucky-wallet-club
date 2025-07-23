import React, { useState } from 'react';
import { Home, Tasks, Bag, Market, Leaderboard } from './screens';
import { HomeIcon, BagIcon, TasksIcon, MarketIcon, TrophyIcon } from './icons';

const TABS = [
  { key: 'home', label: 'Home', icon: <HomeIcon /> },
  { key: 'tasks', label: 'Tasks', icon: <TasksIcon /> },
  { key: 'bag', label: 'Bag', icon: <BagIcon /> },
  { key: 'market', label: 'Market', icon: <MarketIcon /> },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Her back işlemi Home'a döndürsün
  const handleBack = () => {
    setShowLeaderboard(false);
    setTab('home');
  };

  return (
    <div className="app-bg">
      <div className="main-content">
        {showLeaderboard ? (
          <Leaderboard onBack={handleBack} />
        ) : tab === 'home' ? (
          <Home onLeaderboardClick={() => setShowLeaderboard(true)} />
        ) : tab === 'tasks' ? (
          <Tasks onBack={handleBack} />
        ) : tab === 'bag' ? (
          <Bag onBack={handleBack} />
        ) : tab === 'market' ? (
          <Market onBack={handleBack} />
        ) : null}
      </div>
      <nav className="tab-bar">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            className={`tab-btn${tab === key ? ' active' : ''}`}
            onClick={() => {
              setTab(key);
              setShowLeaderboard(false);
            }}
          >
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
} 