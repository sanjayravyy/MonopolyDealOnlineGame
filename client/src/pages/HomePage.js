import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';

const FloatingCard = ({ delay = 0, children, className = "" }) => {
  return (
    <div 
      className={`absolute opacity-20 pointer-events-none ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s`,
        transform: 'rotate(-15deg)'
      }}
    >
      <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white text-lg font-bold">
        {children}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [playerName, setPlayerName] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { createLobby, isLoading, error } = useGame();
  const { connected } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Add floating animation keyframes to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(-15deg); }
        50% { transform: translateY(-20px) rotate(-10deg); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slideIn { animation: slideIn 0.6s ease-out; }
      .animate-glow { animation: glow 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleCreateLobby = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const lobbyId = await createLobby();
    if (lobbyId) {
      navigate(`/lobby/${lobbyId}?name=${encodeURIComponent(playerName)}`);
    }
  };

  const handleJoinLobby = () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!lobbyCode.trim()) {
      alert('Please enter a lobby code');
      return;
    }

    navigate(`/lobby/${lobbyCode.toUpperCase()}?name=${encodeURIComponent(playerName)}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Cards Background */}
      <FloatingCard delay={0} className="top-20 left-10">💰</FloatingCard>
      <FloatingCard delay={1} className="top-32 right-20">🏠</FloatingCard>
      <FloatingCard delay={2} className="bottom-32 left-20">⚡</FloatingCard>
      <FloatingCard delay={3} className="top-1/2 right-10">🎯</FloatingCard>
      <FloatingCard delay={4} className="bottom-20 right-1/3">💎</FloatingCard>
      <FloatingCard delay={5} className="top-40 left-1/3">🎮</FloatingCard>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-slideIn">
            <div className="inline-block mb-6">
              <div className="relative">
                <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                  Monopoly Deal
                </h1>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl text-white font-semibold mb-4 opacity-90">
              The Ultimate Online Card Game Experience
            </h2>
            
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
              Challenge friends, build property empires, and become the ultimate deal-maker in this fast-paced multiplayer card game!
            </p>

            {/* Connection Status */}
            <div className="mt-8">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                connected 
                  ? 'bg-green-500 text-white animate-glow' 
                  : 'bg-red-500 text-white animate-pulse'
              }`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${connected ? 'bg-green-200' : 'bg-red-200'}`}></div>
                {connected ? 'Connected & Ready!' : 'Connecting...'}
              </div>
            </div>
          </div>

          {/* Game Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Main Game Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-slideIn">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🎮
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Start Playing</h3>
                <p className="text-indigo-200">Create or join a game instantly</p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
                  {error}
                </div>
              )}

              {/* Player Name Input */}
              <div className="mb-6">
                <label htmlFor="playerName" className="block text-sm font-medium text-indigo-200 mb-3">
                  👤 Your Player Name
                </label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                    setIsTyping(true);
                    setTimeout(() => setIsTyping(false), 1000);
                  }}
                  placeholder="Enter your awesome name..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  maxLength={20}
                />
                {isTyping && (
                  <div className="text-xs text-yellow-400 mt-1 animate-pulse">✨ Looking good!</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleCreateLobby}
                  disabled={isLoading || !connected}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Magic...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🚀</span>
                      Create New Game
                    </div>
                  )}
                </button>

                <div className="text-center text-indigo-300 font-semibold">
                  ━━━━━━ or ━━━━━━
                </div>

                {!showJoinForm ? (
                  <button
                    onClick={() => setShowJoinForm(true)}
                    disabled={!connected}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🎯</span>
                      Join Existing Game
                    </div>
                  </button>
                ) : (
                  <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/20">
                    <input
                      type="text"
                      value={lobbyCode}
                      onChange={(e) => setLobbyCode(e.target.value.toUpperCase())}
                      placeholder="Enter lobby code (e.g., ABC123)"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-center text-lg font-mono tracking-wider"
                      maxLength={8}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleJoinLobby}
                        disabled={isLoading || !connected}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Join! 🎊
                      </button>
                      <button
                        onClick={() => {
                          setShowJoinForm(false);
                          setLobbyCode('');
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Game Info Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-slideIn">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  📚
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">How to Master the Game</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">🎯</div>
                  <div>
                    <h4 className="text-white font-semibold">Objective</h4>
                    <p className="text-indigo-200 text-sm">Collect 3 complete property sets to win!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">⚡</div>
                  <div>
                    <h4 className="text-white font-semibold">Fast Gameplay</h4>
                    <p className="text-indigo-200 text-sm">Play up to 3 cards per turn, games last 15-30 minutes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">👥</div>
                  <div>
                    <h4 className="text-white font-semibold">Multiplayer Fun</h4>
                    <p className="text-indigo-200 text-sm">2-5 players, steal properties, charge rent!</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">🃏</div>
                  <div>
                    <h4 className="text-white font-semibold">Strategy Cards</h4>
                    <p className="text-indigo-200 text-sm">Use action cards to disrupt opponents and win!</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">2-5</div>
                    <div className="text-xs text-indigo-200">Players</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">15-30</div>
                    <div className="text-xs text-indigo-200">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">3</div>
                    <div className="text-xs text-indigo-200">Sets to Win</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '🚀', title: 'Instant Play', desc: 'No downloads required' },
              { icon: '🌍', title: 'Global Lobbies', desc: 'Play with anyone' },
              { icon: '📱', title: 'Cross-Platform', desc: 'Works everywhere' },
              { icon: '⚡', title: 'Real-Time', desc: 'Live game updates' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                <p className="text-indigo-200 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-indigo-200 text-lg mb-4">
              Ready to become the ultimate deal maker? 🏆
            </p>
            <div className="inline-flex items-center space-x-2 text-yellow-400 animate-pulse">
              <span>⬆️</span>
              <span className="font-semibold">Enter your name above to start!</span>
              <span>⬆️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 