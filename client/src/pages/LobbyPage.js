import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import ChatBox from '../components/ChatBox';

const LobbyPage = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get('name');
  const [copied, setCopied] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const { 
    lobby, 
    gameState,
    joinLobby, 
    setPlayerReady, 
    startGame, 
    error, 
    isLoading 
  } = useGame();
  const { connected } = useSocket();

  useEffect(() => {
    if (!playerName) {
      navigate('/');
      return;
    }

    if (connected && lobbyId) {
      joinLobby(lobbyId, playerName);
    }
  }, [connected, lobbyId, playerName, joinLobby, navigate]);

  // Navigate to game when it starts
  useEffect(() => {
    if (gameState && lobby?.gameState === 'playing') {
      navigate(`/game/${lobbyId}`);
    }
  }, [gameState, lobby, lobbyId, navigate]);

  const currentPlayer = lobby?.players?.find(p => p.name === playerName);
  const isHost = currentPlayer?.isHost;
  const allPlayersReady = lobby?.players?.every(p => p.isReady) && lobby?.players?.length >= 2;

  const handleReadyToggle = () => {
    setPlayerReady(!currentPlayer?.isReady);
  };

  const handleStartGame = () => {
    if (allPlayersReady) {
      startGame();
    }
  };

  const copyLobbyLink = () => {
    const link = `${window.location.origin}/lobby/${lobbyId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-600 mb-4">🔴 Disconnected from server</div>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-monopoly-blue mx-auto mb-4"></div>
            <p>Joining lobby...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-600 mb-4">❌ {error}</div>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!lobby) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">Loading lobby...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Game Lobby</h1>
              <p className="text-gray-600">Lobby Code: <span className="font-mono font-bold text-monopoly-blue">{lobbyId}</span></p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`btn-secondary text-sm ${isChatOpen ? 'bg-blue-500 text-white' : ''}`}
              >
                💬 Chat
              </button>
              <button
                onClick={copyLobbyLink}
                className="btn-secondary text-sm"
              >
                {copied ? '✓ Copied!' : '📋 Copy Link'}
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary text-sm"
              >
                Leave Lobby
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Players List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Players ({lobby.players.length}/5)
            </h2>
            <div className="space-y-3">
              {lobby.players.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    player.isReady 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      player.isReady ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="font-medium">
                      {player.name}
                      {player.isHost && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          HOST
                        </span>
                      )}
                      {player.name === playerName && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          YOU
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-sm">
                    {player.isReady ? (
                      <span className="text-green-600 font-medium">Ready</span>
                    ) : (
                      <span className="text-gray-500">Not Ready</span>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 5 - lobby.players.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex items-center p-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                >
                  <span className="text-gray-400">Waiting for player...</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game Info & Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Min Players:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Players:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Win Condition:</span>
                <span className="font-medium">3 Complete Sets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Actions per Turn:</span>
                <span className="font-medium">3</span>
              </div>
            </div>

            {/* Player Controls */}
            <div className="space-y-4">
              <button
                onClick={handleReadyToggle}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  currentPlayer?.isReady
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {currentPlayer?.isReady ? 'Not Ready' : 'Ready Up'}
              </button>

              {isHost && (
                <button
                  onClick={handleStartGame}
                  disabled={!allPlayersReady}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    allPlayersReady
                      ? 'bg-monopoly-blue hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {allPlayersReady ? 'Start Game' : 'Waiting for all players to be ready'}
                </button>
              )}
            </div>

            {/* Status Messages */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {lobby.players.length < 2 && (
                <p>Waiting for at least 2 players to join...</p>
              )}
              {lobby.players.length >= 2 && !allPlayersReady && (
                <p>Waiting for all players to be ready...</p>
              )}
              {allPlayersReady && !isHost && (
                <p>Waiting for host to start the game...</p>
              )}
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">How to Play Monopoly Deal</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Objective:</h3>
              <p className="text-gray-600 mb-4">Be the first player to collect 3 complete property sets.</p>
              
              <h3 className="font-semibold mb-2">Turn Structure:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Play up to 3 cards from your hand</li>
                <li>• Draw 2 cards at the end of your turn</li>
                <li>• Cards can be played as money, properties, or actions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Card Types:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• <strong>Property Cards:</strong> Build sets to win</li>
                <li>• <strong>Money Cards:</strong> Pay rent and fees</li>
                <li>• <strong>Action Cards:</strong> Special effects like stealing properties</li>
                <li>• <strong>Rent Cards:</strong> Charge other players rent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <ChatBox 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  );
};

export default LobbyPage; 