import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import { SocketProvider } from './context/SocketContext';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <SocketProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lobby/:lobbyId" element={<LobbyPage />} />
              <Route path="/game/:lobbyId" element={<GamePage />} />
            </Routes>
          </Router>
        </GameProvider>
      </SocketProvider>
    </div>
  );
}

export default App; 