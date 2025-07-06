import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import './App.css';
import { SocketProvider } from './context/SocketContext';
import { GameProvider } from './context/GameContext';

const FRIEND_PASSWORD = 'monopoly2024'; // Change this to your secret password!

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('friendAccess') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === FRIEND_PASSWORD) {
      localStorage.setItem('friendAccess', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Wrong password! Ask your friend for the correct password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('friendAccess');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              🎮 Monopoly Deal
            </h1>
            <p className="text-white/70">Friends Only Access</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:border-white/50 focus:outline-none transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              🚀 Enter Game
            </button>
          </div>
          
          <div className="mt-6 text-center text-white/50 text-sm">
            <p>🔒 This game is private</p>
            <p>Ask your friend for the password</p>
          </div>
        </div>
      </div>
    );
  }

  // Debug log to see if we reach here
  console.log('User is authenticated, rendering game...');

  return (
    <SocketProvider>
      <GameProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            {/* Logout button for testing */}
            <button 
              onClick={handleLogout}
              className="fixed top-4 right-4 z-50 bg-red-500/20 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
            >
              🚪 Logout
            </button>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby/:lobbyId" element={<LobbyPage />} />
              <Route path="/game/:gameId" element={<GamePage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </SocketProvider>
  );
}

export default App; 