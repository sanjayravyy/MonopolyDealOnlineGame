import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';

const ChatBox = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !socket) return;
    
    // Send message to server
    socket.emit('send_message', { message: newMessage.trim() });
    
    // Clear input and reset typing state
    setNewMessage('');
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💬</span>
          {messages.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {messages.length > 99 ? '99+' : messages.length}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-lg">💬</span>
          <h3 className="font-semibold">Lobby Chat</h3>
        </div>
        <button
          onClick={onToggle}
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          <span className="text-xl">✕</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <span className="text-4xl mb-2 block">🎮</span>
            <p className="text-sm">No messages yet!</p>
            <p className="text-xs text-gray-400 mt-1">Say hello to your friends!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.type === 'system' ? 'items-center' : 'items-start'
            }`}
          >
            {message.type === 'system' ? (
              <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full border border-blue-200">
                <span className="mr-1">ℹ️</span>
                {message.message}
              </div>
            ) : (
              <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-200 max-w-xs">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm text-gray-800">
                    {message.playerName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 break-words">
                  {message.message}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            maxLength={200}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            <span className="text-lg">🚀</span>
          </button>
        </div>
        
        {/* Character Counter */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <div>
            {isTyping && (
              <span className="text-blue-500 animate-pulse">✨ Typing...</span>
            )}
          </div>
          <div>
            {newMessage.length}/200
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBox; 