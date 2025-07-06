import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSocket } from './SocketContext';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const initialState = {
  lobby: null,
  gameState: null,
  currentPlayer: null,
  hand: [],
  error: null,
  isLoading: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_LOBBY':
      return { ...state, lobby: action.payload, error: null };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload, error: null };
    case 'SET_CURRENT_PLAYER':
      return { ...state, currentPlayer: action.payload };
    case 'SET_HAND':
      return { ...state, hand: action.payload };
    case 'UPDATE_PLAYER_STATUS':
      if (!state.lobby) return state;
      const updatedPlayers = state.lobby.players.map(player =>
        player.id === action.payload.playerId
          ? { ...player, isReady: action.payload.isReady }
          : player
      );
      return {
        ...state,
        lobby: { ...state.lobby, players: updatedPlayers }
      };
    case 'PLAYER_JOINED':
      if (!state.lobby) return state;
      return {
        ...state,
        lobby: action.payload.lobby
      };
    case 'PLAYER_LEFT':
      if (!state.lobby) return state;
      return {
        ...state,
        lobby: action.payload.lobby
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Socket event listeners
    socket.on('player_joined', (data) => {
      dispatch({ type: 'PLAYER_JOINED', payload: data });
    });

    socket.on('player_left', (data) => {
      dispatch({ type: 'PLAYER_LEFT', payload: data });
    });

    socket.on('player_status_changed', (data) => {
      dispatch({ type: 'UPDATE_PLAYER_STATUS', payload: data });
    });

    socket.on('game_started', (data) => {
      dispatch({ type: 'SET_GAME_STATE', payload: data.gameState });
    });

    socket.on('game_state_updated', (data) => {
      dispatch({ type: 'SET_GAME_STATE', payload: data.gameState });
    });

    socket.on('hand_updated', (data) => {
      dispatch({ type: 'SET_HAND', payload: data.hand });
    });

    socket.on('turn_ended', (data) => {
      dispatch({ type: 'SET_GAME_STATE', payload: data.gameState });
    });

    socket.on('game_ended', (data) => {
      dispatch({ type: 'SET_GAME_STATE', payload: data.gameState });
    });

    socket.on('error', (data) => {
      dispatch({ type: 'SET_ERROR', payload: data.message });
    });

    return () => {
      socket.off('player_joined');
      socket.off('player_left');
      socket.off('player_status_changed');
      socket.off('game_started');
      socket.off('game_state_updated');
      socket.off('hand_updated');
      socket.off('turn_ended');
      socket.off('game_ended');
      socket.off('error');
    };
  }, [socket]);

  // Actions
  const createLobby = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:5000'}/api/lobby/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: 'SET_LOBBY', payload: data.lobby });
      dispatch({ type: 'SET_LOADING', payload: false });
      return data.lobbyId;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create lobby' });
      return null;
    }
  };

  const joinLobby = (lobbyId, playerName) => {
    if (!socket) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    socket.emit('join_lobby', { lobbyId, playerName });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const setPlayerReady = (isReady) => {
    if (!socket) return;
    socket.emit('player_ready', { isReady });
  };

  const startGame = () => {
    if (!socket) return;
    socket.emit('start_game');
  };

  const playCard = (cardId, additionalData = {}) => {
    if (!socket) return;
    socket.emit('play_card', { cardId, ...additionalData });
  };

  const endTurn = () => {
    if (!socket) return;
    socket.emit('end_turn');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    createLobby,
    joinLobby,
    setPlayerReady,
    startGame,
    playCard,
    endTurn,
    clearError
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 