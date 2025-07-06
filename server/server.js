const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Game state storage (in production, use Redis or database)
const lobbies = new Map();
const players = new Map();

// Import game logic
const GameManager = require('./gameManager');
const gameManager = new GameManager();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.post('/api/lobby/create', (req, res) => {
  const lobbyId = uuidv4().substring(0, 8).toUpperCase();
  const lobby = {
    id: lobbyId,
    players: [],
    gameState: 'lobby',
    createdAt: new Date(),
    maxPlayers: 5
  };
  
  lobbies.set(lobbyId, lobby);
  res.json({ lobbyId, lobby });
});

app.get('/api/lobby/:lobbyId', (req, res) => {
  const { lobbyId } = req.params;
  const lobby = lobbies.get(lobbyId);
  
  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }
  
  res.json({ lobby });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join lobby
  socket.on('join_lobby', (data) => {
    const { lobbyId, playerName } = data;
    const lobby = lobbies.get(lobbyId);
    
    if (!lobby) {
      socket.emit('error', { message: 'Lobby not found' });
      return;
    }
    
    // Check if this socket is already in the lobby (prevent duplicates)
    const existingPlayer = lobby.players.find(p => p.id === socket.id);
    if (existingPlayer) {
      // Player already in lobby, just send current state
      socket.emit('player_joined', {
        player: existingPlayer,
        lobby: lobby
      });
      return;
    }
    
    // Check if a player with this name already exists in the lobby
    const existingPlayerByName = lobby.players.find(p => p.name === playerName);
    if (existingPlayerByName) {
      socket.emit('error', { message: 'A player with this name is already in the lobby' });
      return;
    }
    
    if (lobby.players.length >= lobby.maxPlayers) {
      socket.emit('error', { message: 'Lobby is full' });
      return;
    }
    
    if (lobby.gameState !== 'lobby') {
      socket.emit('error', { message: 'Game already in progress' });
      return;
    }
    
    // Create player
    const player = {
      id: socket.id,
      name: playerName,
      lobbyId: lobbyId,
      isHost: lobby.players.length === 0,
      hand: [],
      properties: [],
      bank: [],
      isReady: false
    };
    
    // Add player to lobby and storage
    lobby.players.push(player);
    players.set(socket.id, player);
    
    // Join socket room
    socket.join(lobbyId);
    
    // Notify all players in lobby
    io.to(lobbyId).emit('player_joined', {
      player: player,
      lobby: lobby
    });
    
    // Send welcome message to chat
    const welcomeMessage = {
      id: Date.now() + Math.random(),
      playerId: 'system',
      playerName: 'System',
      message: `${playerName} joined the lobby! 👋`,
      timestamp: new Date(),
      type: 'system'
    };
    
    io.to(lobbyId).emit('new_message', welcomeMessage);
    
    console.log(`Player ${playerName} joined lobby ${lobbyId}`);
  });

  // Player ready/unready
  socket.on('player_ready', (data) => {
    const player = players.get(socket.id);
    if (!player) return;
    
    const lobby = lobbies.get(player.lobbyId);
    if (!lobby) return;
    
    player.isReady = data.isReady;
    
    io.to(player.lobbyId).emit('player_status_changed', {
      playerId: player.id,
      isReady: player.isReady,
      lobby: lobby
    });
  });

  // Start game
  socket.on('start_game', () => {
    const player = players.get(socket.id);
    if (!player || !player.isHost) return;
    
    const lobby = lobbies.get(player.lobbyId);
    if (!lobby || lobby.gameState !== 'lobby') return;
    
    // Check if all players are ready and minimum players met
    const allReady = lobby.players.every(p => p.isReady);
    if (!allReady || lobby.players.length < 2) {
      socket.emit('error', { message: 'Not all players are ready or minimum players not met' });
      return;
    }
    
    // Initialize game
    const gameState = gameManager.initializeGame(lobby.players);
    lobby.gameState = 'playing';
    lobby.game = gameState;
    
    // Notify all players
    io.to(player.lobbyId).emit('game_started', {
      gameState: gameState,
      lobby: lobby
    });
    
    // Send private hand data to each player
    lobby.players.forEach(p => {
      io.to(p.id).emit('hand_updated', {
        hand: gameState.players[p.id].hand
      });
    });
    
    console.log(`Game started in lobby ${player.lobbyId}`);
  });

  // Play card
  socket.on('play_card', (data) => {
    const player = players.get(socket.id);
    if (!player) return;
    
    const lobby = lobbies.get(player.lobbyId);
    if (!lobby || lobby.gameState !== 'playing') return;
    
    const result = gameManager.playCard(lobby.game, player.id, data);
    
    if (result.success) {
      // Update lobby game state
      lobby.game = result.gameState;
      
      // Broadcast game state update
      io.to(player.lobbyId).emit('game_state_updated', {
        gameState: result.gameState,
        action: result.action
      });
      
      // Send updated hands to affected players
      if (result.updatedPlayers) {
        result.updatedPlayers.forEach(playerId => {
          io.to(playerId).emit('hand_updated', {
            hand: result.gameState.players[playerId].hand
          });
        });
      }
      
      // Check for game end
      if (result.gameState.winner) {
        lobby.gameState = 'finished';
        io.to(player.lobbyId).emit('game_ended', {
          winner: result.gameState.winner,
          gameState: result.gameState
        });
      }
    } else {
      socket.emit('error', { message: result.error });
    }
  });

  // End turn
  socket.on('end_turn', () => {
    const player = players.get(socket.id);
    if (!player) return;
    
    const lobby = lobbies.get(player.lobbyId);
    if (!lobby || lobby.gameState !== 'playing') return;
    
    const result = gameManager.endTurn(lobby.game, player.id);
    
    if (result.success) {
      lobby.game = result.gameState;
      
      io.to(player.lobbyId).emit('turn_ended', {
        gameState: result.gameState,
        nextPlayer: result.nextPlayer
      });
      
      // Send updated hand to new active player
      if (result.nextPlayer) {
        io.to(result.nextPlayer).emit('hand_updated', {
          hand: result.gameState.players[result.nextPlayer].hand
        });
      }
    } else {
      socket.emit('error', { message: result.error });
    }
  });

  // Chat message
  socket.on('send_message', (data) => {
    const player = players.get(socket.id);
    if (!player) return;
    
    const { message } = data;
    
    // Basic validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return;
    }
    
    // Limit message length
    const cleanMessage = message.trim().substring(0, 200);
    
    // Create message object
    const chatMessage = {
      id: Date.now() + Math.random(),
      playerId: player.id,
      playerName: player.name,
      message: cleanMessage,
      timestamp: new Date(),
      type: 'user'
    };
    
    // Broadcast message to all players in the lobby
    io.to(player.lobbyId).emit('new_message', chatMessage);
    
    console.log(`[Chat] ${player.name}: ${cleanMessage}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    const player = players.get(socket.id);
    if (player) {
      const lobby = lobbies.get(player.lobbyId);
      if (lobby) {
        // Send disconnect message to chat
        const disconnectMessage = {
          id: Date.now() + Math.random(),
          playerId: 'system',
          playerName: 'System',
          message: `${player.name} left the lobby`,
          timestamp: new Date(),
          type: 'system'
        };
        
        io.to(player.lobbyId).emit('new_message', disconnectMessage);
        
        // Remove player from lobby
        lobby.players = lobby.players.filter(p => p.id !== socket.id);
        
        // If no players left, delete lobby
        if (lobby.players.length === 0) {
          lobbies.delete(player.lobbyId);
        } else {
          // If host left, make next player host
          if (player.isHost && lobby.players.length > 0) {
            lobby.players[0].isHost = true;
          }
          
          // Notify remaining players
          io.to(player.lobbyId).emit('player_left', {
            playerId: socket.id,
            playerName: player.name,
            lobby: lobby
          });
        }
      }
      
      players.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 