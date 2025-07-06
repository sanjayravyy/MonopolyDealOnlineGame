import React from 'react';

const Card = ({ card, onClick, isSelected = false, isPlayable = true, size = 'normal' }) => {
  const getCardTypeClass = () => {
    switch (card.type) {
      case 'money':
        return 'money-card';
      case 'property':
        return `property-card property-${card.color || 'default'}`;
      case 'action':
        return 'action-card';
      default:
        return 'game-card';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-24 text-xs p-1';
      case 'large':
        return 'w-32 h-48 text-sm p-3';
      default:
        return 'w-24 h-36 text-xs p-2';
    }
  };

  const getCardIcon = () => {
    switch (card.type) {
      case 'money':
        return '💰';
      case 'property':
        return '🏠';
      case 'action':
        return '⚡';
      default:
        return '🃏';
    }
  };

  return (
    <div
      className={`
        ${getCardTypeClass()} 
        ${getSizeClass()}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${!isPlayable ? 'opacity-50 cursor-not-allowed' : ''}
        flex flex-col justify-between
        relative
      `}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Card Header */}
      <div className="text-center">
        <div className="text-lg mb-1">{getCardIcon()}</div>
        <div className="font-bold text-xs leading-tight">
          {card.name || `$${card.value}M`}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex items-center justify-center">
        {card.type === 'property' && card.color && (
          <div className={`w-6 h-6 rounded border-2 property-${card.color}`}></div>
        )}
        {card.type === 'action' && card.description && (
          <div className="text-center text-xs text-gray-600 leading-tight">
            {card.description}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="text-center">
        <div className="font-bold text-xs">
          {card.value}M
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          ✓
        </div>
      )}
    </div>
  );
};

export default Card; 