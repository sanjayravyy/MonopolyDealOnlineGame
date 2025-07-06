// Game constants and types shared between client and server

export const CARD_TYPES = {
  PROPERTY: 'property',
  ACTION: 'action',
  MONEY: 'money'
};

export const PROPERTY_COLORS = {
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

export const ACTION_TYPES = {
  RENT: 'rent',
  DEAL_BREAKER: 'deal_breaker',
  SLY_DEAL: 'sly_deal',
  FORCED_DEAL: 'forced_deal',
  DEBT_COLLECTOR: 'debt_collector',
  ITS_MY_BIRTHDAY: 'its_my_birthday',
  JUST_SAY_NO: 'just_say_no',
  PASS_GO: 'pass_go',
  HOUSE: 'house',
  HOTEL: 'hotel'
};

export const GAME_STATES = {
  LOBBY: 'lobby',
  PLAYING: 'playing',
  FINISHED: 'finished'
};

export const PLAYER_ACTIONS = {
  PLAY_CARD: 'play_card',
  END_TURN: 'end_turn',
  PAY_RENT: 'pay_rent',
  USE_JUST_SAY_NO: 'use_just_say_no'
};

export const MAX_PLAYERS = 5;
export const MIN_PLAYERS = 2;
export const CARDS_PER_TURN = 3;
export const INITIAL_HAND_SIZE = 5;
export const WINNING_SETS = 3;

// Property set requirements
export const PROPERTY_SET_SIZES = {
  [PROPERTY_COLORS.BROWN]: 2,
  [PROPERTY_COLORS.LIGHT_BLUE]: 3,
  [PROPERTY_COLORS.PINK]: 3,
  [PROPERTY_COLORS.ORANGE]: 3,
  [PROPERTY_COLORS.RED]: 3,
  [PROPERTY_COLORS.YELLOW]: 3,
  [PROPERTY_COLORS.GREEN]: 3,
  [PROPERTY_COLORS.DARK_BLUE]: 2,
  [PROPERTY_COLORS.UTILITY]: 2,
  [PROPERTY_COLORS.RAILROAD]: 4
};

export const PROPERTY_SET_VALUES = {
  [PROPERTY_COLORS.BROWN]: 1,
  [PROPERTY_COLORS.LIGHT_BLUE]: 1,
  [PROPERTY_COLORS.PINK]: 2,
  [PROPERTY_COLORS.ORANGE]: 2,
  [PROPERTY_COLORS.RED]: 3,
  [PROPERTY_COLORS.YELLOW]: 3,
  [PROPERTY_COLORS.GREEN]: 4,
  [PROPERTY_COLORS.DARK_BLUE]: 4,
  [PROPERTY_COLORS.UTILITY]: 2,
  [PROPERTY_COLORS.RAILROAD]: 2
}; 