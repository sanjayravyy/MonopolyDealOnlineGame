const path = require('path');

// Import shared game logic (we'll use require with a workaround for ES modules)
let gameTypes, deck;
try {
  // Try to load the shared modules
  gameTypes = require('../shared/gameTypes.js');
  deck = require('../shared/deck.js');
} catch (error) {
  // Fallback constants if shared modules not available
  const CARD_TYPES = {
    PROPERTY: 'property',
    ACTION: 'action',
    MONEY: 'money'
  };
  
  const PROPERTY_COLORS = {
    BROWN: 'brown',
    LIGHT_BLUE: 'light_blue',
    PINK: 'pink',
    ORANGE: 'orange',
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
    DARK_BLUE: 'dark_blue',
    UTILITY: 'utility',
    RAILROAD: 'railroad'
  };
  
  gameTypes = { CARD_TYPES, PROPERTY_COLORS };
  deck = { createDeck: () => [] }; // Mock for now
}

class GameManager {
  constructor() {
    this.games = new Map();
  }

  initializeGame(players) {
    const gameId = players[0].lobbyId;
    
    // Create and shuffle deck
    const gameDeck = this.createMonopolyDealDeck();
    const shuffledDeck = this.shuffleDeck(gameDeck);
    
    // Initialize game state
    const gameState = {
      id: gameId,
      players: {},
      currentPlayerIndex: 0,
      currentPlayerActions: 0,
      maxActionsPerTurn: 3,
      deck: shuffledDeck,
      discardPile: [],
      phase: 'playing', // playing, waiting_for_response
      pendingAction: null,
      winner: null,
      turnHistory: []
    };

    // Initialize each player
    players.forEach((player, index) => {
      gameState.players[player.id] = {
        id: player.id,
        name: player.name,
        hand: [],
        properties: {}, // Organized by color
        bank: [],
        completeSets: 0,
        totalValue: 0
      };
    });

    // Deal initial hands
    this.dealInitialHands(gameState);
    
    this.games.set(gameId, gameState);
    return gameState;
  }

  createMonopolyDealDeck() {
    // Simplified deck for now - in production would import from shared/deck.js
    const cards = [];
    
    // Money cards
    for (let i = 0; i < 6; i++) cards.push({ type: 'money', value: 1, name: '$1M' });
    for (let i = 0; i < 5; i++) cards.push({ type: 'money', value: 2, name: '$2M' });
    for (let i = 0; i < 3; i++) cards.push({ type: 'money', value: 3, name: '$3M' });
    for (let i = 0; i < 3; i++) cards.push({ type: 'money', value: 4, name: '$4M' });
    for (let i = 0; i < 2; i++) cards.push({ type: 'money', value: 5, name: '$5M' });
    cards.push({ type: 'money', value: 10, name: '$10M' });

    // Property cards (simplified)
    const properties = [
      { color: 'brown', name: 'Mediterranean Avenue', value: 1, setSize: 2 },
      { color: 'brown', name: 'Baltic Avenue', value: 1, setSize: 2 },
      { color: 'light_blue', name: 'Oriental Avenue', value: 1, setSize: 3 },
      { color: 'light_blue', name: 'Vermont Avenue', value: 1, setSize: 3 },
      { color: 'light_blue', name: 'Connecticut Avenue', value: 1, setSize: 3 },
      { color: 'pink', name: 'St. Charles Place', value: 2, setSize: 3 },
      { color: 'pink', name: 'States Avenue', value: 2, setSize: 3 },
      { color: 'pink', name: 'Virginia Avenue', value: 2, setSize: 3 },
      { color: 'red', name: 'Kentucky Avenue', value: 3, setSize: 3 },
      { color: 'red', name: 'Indiana Avenue', value: 3, setSize: 3 },
      { color: 'red', name: 'Illinois Avenue', value: 3, setSize: 3 },
      { color: 'green', name: 'Pacific Avenue', value: 4, setSize: 3 },
      { color: 'green', name: 'North Carolina Avenue', value: 4, setSize: 3 },
      { color: 'green', name: 'Pennsylvania Avenue', value: 4, setSize: 3 },
      { color: 'dark_blue', name: 'Park Place', value: 4, setSize: 2 },
      { color: 'dark_blue', name: 'Boardwalk', value: 4, setSize: 2 }
    ];

    properties.forEach(prop => {
      for (let i = 0; i < 2; i++) {
        cards.push({ type: 'property', ...prop });
      }
    });

    // Action cards (simplified)
    for (let i = 0; i < 10; i++) cards.push({ type: 'action', action: 'pass_go', name: 'Pass Go', description: 'Draw 2 cards', value: 1 });
    for (let i = 0; i < 3; i++) cards.push({ type: 'action', action: 'rent', name: 'Rent', description: 'Charge rent for a property set', value: 1 });
    for (let i = 0; i < 2; i++) cards.push({ type: 'action', action: 'deal_breaker', name: 'Deal Breaker', description: 'Steal a complete property set', value: 5 });
    for (let i = 0; i < 3; i++) cards.push({ type: 'action', action: 'sly_deal', name: 'Sly Deal', description: 'Steal a property', value: 3 });
    for (let i = 0; i < 3; i++) cards.push({ type: 'action', action: 'just_say_no', name: 'Just Say No', description: 'Cancel any action against you', value: 4 });

    // Add unique IDs to cards
    return cards.map((card, index) => ({
      ...card,
      id: `card_${index}_${Date.now()}_${Math.random()}`
    }));
  }

  shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  dealInitialHands(gameState) {
    const playerIds = Object.keys(gameState.players);
    
    // Deal 5 cards to each player
    for (let i = 0; i < 5; i++) {
      playerIds.forEach(playerId => {
        if (gameState.deck.length > 0) {
          const card = gameState.deck.pop();
          gameState.players[playerId].hand.push(card);
        }
      });
    }
  }

  playCard(gameState, playerId, cardData) {
    const player = gameState.players[playerId];
    if (!player) {
      return { success: false, error: 'Player not found' };
    }

    // Check if it's the player's turn
    const currentPlayer = this.getCurrentPlayer(gameState);
    if (currentPlayer.id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }

    // Check if player has actions left
    if (gameState.currentPlayerActions >= gameState.maxActionsPerTurn) {
      return { success: false, error: 'No more actions this turn' };
    }

    // Find card in player's hand
    const cardIndex = player.hand.findIndex(card => card.id === cardData.cardId);
    if (cardIndex === -1) {
      return { success: false, error: 'Card not found in hand' };
    }

    const card = player.hand[cardIndex];
    
    // Handle different card types
    let result;
    switch (card.type) {
      case 'money':
        result = this.playMoneyCard(gameState, playerId, card, cardIndex);
        break;
      case 'property':
        result = this.playPropertyCard(gameState, playerId, card, cardIndex);
        break;
      case 'action':
        result = this.playActionCard(gameState, playerId, card, cardIndex, cardData);
        break;
      default:
        return { success: false, error: 'Invalid card type' };
    }

    if (result.success) {
      gameState.currentPlayerActions++;
      
      // Add to turn history
      gameState.turnHistory.push({
        playerId: playerId,
        playerName: player.name,
        action: 'play_card',
        card: card,
        timestamp: new Date()
      });

      // Check for win condition
      this.checkWinCondition(gameState);
    }

    return result;
  }

  playMoneyCard(gameState, playerId, card, cardIndex) {
    const player = gameState.players[playerId];
    
    // Remove card from hand and add to bank
    player.hand.splice(cardIndex, 1);
    player.bank.push(card);
    
    return {
      success: true,
      gameState: gameState,
      action: { type: 'money_played', card: card },
      updatedPlayers: [playerId]
    };
  }

  playPropertyCard(gameState, playerId, card, cardIndex) {
    const player = gameState.players[playerId];
    
    // Remove card from hand
    player.hand.splice(cardIndex, 1);
    
    // Add to properties
    if (!player.properties[card.color]) {
      player.properties[card.color] = [];
    }
    player.properties[card.color].push(card);
    
    // Update complete sets count
    this.updateCompleteSets(player);
    
    return {
      success: true,
      gameState: gameState,
      action: { type: 'property_played', card: card },
      updatedPlayers: [playerId]
    };
  }

  playActionCard(gameState, playerId, card, cardIndex, cardData) {
    const player = gameState.players[playerId];
    
    // Handle different action types
    switch (card.action) {
      case 'pass_go':
        return this.handlePassGo(gameState, playerId, card, cardIndex);
      case 'rent':
        return this.handleRent(gameState, playerId, card, cardIndex, cardData);
      case 'sly_deal':
        return this.handleSlyDeal(gameState, playerId, card, cardIndex, cardData);
      default:
        // For now, just discard unknown actions
        player.hand.splice(cardIndex, 1);
        gameState.discardPile.push(card);
        return {
          success: true,
          gameState: gameState,
          action: { type: 'action_played', card: card },
          updatedPlayers: [playerId]
        };
    }
  }

  handlePassGo(gameState, playerId, card, cardIndex) {
    const player = gameState.players[playerId];
    
    // Remove card from hand
    player.hand.splice(cardIndex, 1);
    gameState.discardPile.push(card);
    
    // Draw 2 cards
    for (let i = 0; i < 2; i++) {
      if (gameState.deck.length > 0) {
        const drawnCard = gameState.deck.pop();
        player.hand.push(drawnCard);
      }
    }
    
    return {
      success: true,
      gameState: gameState,
      action: { type: 'pass_go', card: card, cardsDrawn: 2 },
      updatedPlayers: [playerId]
    };
  }

  handleRent(gameState, playerId, card, cardIndex, cardData) {
    // Simplified rent implementation
    const player = gameState.players[playerId];
    player.hand.splice(cardIndex, 1);
    gameState.discardPile.push(card);
    
    return {
      success: true,
      gameState: gameState,
      action: { type: 'rent', card: card },
      updatedPlayers: [playerId]
    };
  }

  handleSlyDeal(gameState, playerId, card, cardIndex, cardData) {
    // Simplified sly deal implementation
    const player = gameState.players[playerId];
    player.hand.splice(cardIndex, 1);
    gameState.discardPile.push(card);
    
    return {
      success: true,
      gameState: gameState,
      action: { type: 'sly_deal', card: card },
      updatedPlayers: [playerId]
    };
  }

  endTurn(gameState, playerId) {
    const currentPlayer = this.getCurrentPlayer(gameState);
    if (currentPlayer.id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }

    // Draw 2 cards at end of turn
    const player = gameState.players[playerId];
    for (let i = 0; i < 2; i++) {
      if (gameState.deck.length > 0) {
        const drawnCard = gameState.deck.pop();
        player.hand.push(drawnCard);
      }
    }

    // Move to next player
    const playerIds = Object.keys(gameState.players);
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % playerIds.length;
    gameState.currentPlayerActions = 0;
    
    const nextPlayerId = playerIds[gameState.currentPlayerIndex];
    
    return {
      success: true,
      gameState: gameState,
      nextPlayer: nextPlayerId,
      updatedPlayers: [playerId, nextPlayerId]
    };
  }

  getCurrentPlayer(gameState) {
    const playerIds = Object.keys(gameState.players);
    const currentPlayerId = playerIds[gameState.currentPlayerIndex];
    return gameState.players[currentPlayerId];
  }

  updateCompleteSets(player) {
    let completeSets = 0;
    
    for (const [color, properties] of Object.entries(player.properties)) {
      const firstProperty = properties[0];
      if (firstProperty && properties.length >= firstProperty.setSize) {
        completeSets++;
      }
    }
    
    player.completeSets = completeSets;
  }

  checkWinCondition(gameState) {
    for (const player of Object.values(gameState.players)) {
      if (player.completeSets >= 3) {
        gameState.winner = player;
        break;
      }
    }
  }
}

module.exports = GameManager; 