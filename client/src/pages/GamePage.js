import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useSocket } from '../context/SocketContext';
import Card from '../components/Card';
import ChatBox from '../components/ChatBox';

const GamePage = () => {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState([]);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    gameState,
    hand,
    playCard,
    endTurn,
    error,
    clearError
  } = useGame();
  const { connected } = useSocket();

  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">Loading game...</div>
        </div>
      </div>
    );
  }

  const currentPlayerId = Object.keys(gameState.players)[gameState.currentPlayerIndex];
  const isMyTurn = gameState.players[currentPlayerId] && hand.length > 0;
  const actionsRemaining = gameState.maxActionsPerTurn - gameState.currentPlayerActions;

  const handleCardClick = (card) => {
    if (!isMyTurn || actionsRemaining <= 0) return;

    if (selectedCards.includes(card.id)) {
      setSelectedCards(selectedCards.filter(id => id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card.id]);
    }
  };

  const handlePlayCards = () => {
    if (selectedCards.length === 0) return;

    // For now, play one card at a time
    const cardId = selectedCards[0];
    playCard(cardId);
    setSelectedCards([]);
  };

  const handleEndTurn = () => {
    endTurn();
    setSelectedCards([]);
  };

  const getPlayerProperties = (player) => {
    const properties = {};
    for (const [color, cards] of Object.entries(player.properties || {})) {
      properties[color] = cards;
    }
    return properties;
  };

  const getPropertySetProgress = (properties, color) => {
    const cards = properties[color] || [];
    const setSize = cards[0]?.setSize || 2;
    return { current: cards.length, total: setSize, isComplete: cards.length >= setSize };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Monopoly Deal</h1>
            <p className="text-sm text-gray-600">Lobby: {lobbyId}</p>
          </div>
          
          {/* Turn Info */}
          <div className="text-center">
            <div className="text-lg font-semibold">
              {isMyTurn ? "Your Turn" : `${gameState.players[currentPlayerId]?.name}'s Turn`}
            </div>
            <div className="text-sm text-gray-600">
              Actions: {actionsRemaining}/3
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`btn-secondary text-sm ${isChatOpen ? 'bg-blue-500 text-white' : ''}`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-sm"
            >
              Leave Game
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Game Winner */}
      {gameState.winner && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
            🎉 {gameState.winner.name} wins the game! 🎉
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4">
        {/* Other Players */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.values(gameState.players).map(player => {
            if (hand.length > 0 && player.hand) return null; // Skip current player
            
            const properties = getPlayerProperties(player);
            
            return (
              <div key={player.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{player.name}</h3>
                  <div className="text-sm text-gray-600">
                    Sets: {player.completeSets}/3
                  </div>
                </div>

                {/* Properties */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">Properties:</h4>
                  <div className="space-y-2">
                    {Object.entries(properties).map(([color, cards]) => {
                      const progress = getPropertySetProgress(properties, color);
                      return (
                        <div key={color} className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded property-${color}`}></div>
                          <span className="text-sm">
                            {color}: {progress.current}/{progress.total}
                            {progress.isComplete && " ✓"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bank */}
                <div className="flex justify-between text-sm">
                  <span>Bank: ${(player.bank || []).reduce((sum, card) => sum + card.value, 0)}M</span>
                  <span>Hand: {(player.hand || []).length} cards</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Player Area */}
        {hand.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Cards</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handlePlayCards}
                  disabled={selectedCards.length === 0 || !isMyTurn || actionsRemaining <= 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Play Selected ({selectedCards.length})
                </button>
                <button
                  onClick={handleEndTurn}
                  disabled={!isMyTurn}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  End Turn
                </button>
              </div>
            </div>

            {/* Hand */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Hand ({hand.length} cards):</h3>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {hand.map(card => (
                  <Card
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card)}
                    isSelected={selectedCards.includes(card.id)}
                    isPlayable={isMyTurn && actionsRemaining > 0}
                    size="normal"
                  />
                ))}
              </div>
            </div>

            {/* Current Player Properties and Bank */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Properties */}
              <div>
                <h3 className="text-lg font-medium mb-3">Your Properties:</h3>
                <div className="space-y-3">
                  {Object.entries(getPlayerProperties(gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)] || {})).map(([color, cards]) => {
                    const progress = getPropertySetProgress({ [color]: cards }, color);
                    return (
                      <div key={color} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded property-${color}`}></div>
                            <span className="font-medium capitalize">{color.replace('_', ' ')}</span>
                          </div>
                          <span className={`text-sm ${progress.isComplete ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
                            {progress.current}/{progress.total} {progress.isComplete && "✓ Complete"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cards.map((card, index) => (
                            <Card
                              key={`${card.id}-${index}`}
                              card={card}
                              isPlayable={false}
                              size="small"
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(getPlayerProperties(gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)] || {})).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No properties yet</p>
                  )}
                </div>
              </div>

              {/* Bank */}
              <div>
                <h3 className="text-lg font-medium mb-3">Your Bank:</h3>
                <div className="border rounded-lg p-3">
                  <div className="mb-2">
                    <span className="font-medium">
                      Total: ${(gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)]?.bank || []).reduce((sum, card) => sum + card.value, 0)}M
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)]?.bank || []).map((card, index) => (
                      <Card
                        key={`bank-${card.id}-${index}`}
                        card={card}
                        isPlayable={false}
                        size="small"
                      />
                    ))}
                  </div>
                  {(!gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)]?.bank || gameState.players[Object.keys(gameState.players).find(id => gameState.players[id].hand)].bank.length === 0) && (
                    <p className="text-gray-500 text-center py-2">No money in bank</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Info */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h3 className="font-semibold mb-2">Game Status:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Deck:</span>
              <span className="font-medium ml-2">{gameState.deck?.length || 0} cards</span>
            </div>
            <div>
              <span className="text-gray-600">Discard:</span>
              <span className="font-medium ml-2">{gameState.discardPile?.length || 0} cards</span>
            </div>
            <div>
              <span className="text-gray-600">Turn:</span>
              <span className="font-medium ml-2">{gameState.currentPlayerIndex + 1}</span>
            </div>
            <div>
              <span className="text-gray-600">Phase:</span>
              <span className="font-medium ml-2">{gameState.phase}</span>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <ChatBox 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)} 
        />
      </div>
    </div>
  );
};

export default GamePage; 