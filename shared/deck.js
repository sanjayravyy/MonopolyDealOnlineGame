import { CARD_TYPES, PROPERTY_COLORS, ACTION_TYPES } from './gameTypes.js';

// Complete Monopoly Deal deck configuration
export const DECK = [
  // Money Cards
  { id: 'money_1_1', type: CARD_TYPES.MONEY, value: 1, count: 6 },
  { id: 'money_2_1', type: CARD_TYPES.MONEY, value: 2, count: 5 },
  { id: 'money_3_1', type: CARD_TYPES.MONEY, value: 3, count: 3 },
  { id: 'money_4_1', type: CARD_TYPES.MONEY, value: 4, count: 3 },
  { id: 'money_5_1', type: CARD_TYPES.MONEY, value: 5, count: 2 },
  { id: 'money_10_1', type: CARD_TYPES.MONEY, value: 10, count: 1 },

  // Property Cards
  // Brown Properties
  { id: 'prop_brown_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.BROWN, name: 'Mediterranean Avenue', value: 1, count: 2 },
  { id: 'prop_brown_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.BROWN, name: 'Baltic Avenue', value: 1, count: 2 },

  // Light Blue Properties
  { id: 'prop_light_blue_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.LIGHT_BLUE, name: 'Oriental Avenue', value: 1, count: 2 },
  { id: 'prop_light_blue_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.LIGHT_BLUE, name: 'Vermont Avenue', value: 1, count: 2 },
  { id: 'prop_light_blue_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.LIGHT_BLUE, name: 'Connecticut Avenue', value: 1, count: 2 },

  // Pink Properties
  { id: 'prop_pink_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.PINK, name: 'St. Charles Place', value: 2, count: 2 },
  { id: 'prop_pink_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.PINK, name: 'States Avenue', value: 2, count: 2 },
  { id: 'prop_pink_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.PINK, name: 'Virginia Avenue', value: 2, count: 2 },

  // Orange Properties
  { id: 'prop_orange_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.ORANGE, name: 'St. James Place', value: 2, count: 2 },
  { id: 'prop_orange_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.ORANGE, name: 'Tennessee Avenue', value: 2, count: 2 },
  { id: 'prop_orange_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.ORANGE, name: 'New York Avenue', value: 2, count: 2 },

  // Red Properties
  { id: 'prop_red_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RED, name: 'Kentucky Avenue', value: 3, count: 2 },
  { id: 'prop_red_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RED, name: 'Indiana Avenue', value: 3, count: 2 },
  { id: 'prop_red_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RED, name: 'Illinois Avenue', value: 3, count: 2 },

  // Yellow Properties
  { id: 'prop_yellow_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.YELLOW, name: 'Atlantic Avenue', value: 3, count: 2 },
  { id: 'prop_yellow_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.YELLOW, name: 'Ventnor Avenue', value: 3, count: 2 },
  { id: 'prop_yellow_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.YELLOW, name: 'Marvin Gardens', value: 3, count: 2 },

  // Green Properties
  { id: 'prop_green_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.GREEN, name: 'Pacific Avenue', value: 4, count: 2 },
  { id: 'prop_green_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.GREEN, name: 'North Carolina Avenue', value: 4, count: 2 },
  { id: 'prop_green_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.GREEN, name: 'Pennsylvania Avenue', value: 4, count: 2 },

  // Dark Blue Properties
  { id: 'prop_dark_blue_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.DARK_BLUE, name: 'Park Place', value: 4, count: 2 },
  { id: 'prop_dark_blue_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.DARK_BLUE, name: 'Boardwalk', value: 4, count: 2 },

  // Utilities
  { id: 'prop_utility_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.UTILITY, name: 'Electric Company', value: 2, count: 2 },
  { id: 'prop_utility_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.UTILITY, name: 'Water Works', value: 2, count: 2 },

  // Railroads
  { id: 'prop_railroad_1', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RAILROAD, name: 'Reading Railroad', value: 2, count: 2 },
  { id: 'prop_railroad_2', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RAILROAD, name: 'Pennsylvania Railroad', value: 2, count: 2 },
  { id: 'prop_railroad_3', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RAILROAD, name: 'B. & O. Railroad', value: 2, count: 2 },
  { id: 'prop_railroad_4', type: CARD_TYPES.PROPERTY, color: PROPERTY_COLORS.RAILROAD, name: 'Short Line', value: 2, count: 2 },

  // Action Cards
  { id: 'action_rent_1', type: CARD_TYPES.ACTION, action: ACTION_TYPES.RENT, name: 'Rent', description: 'Charge rent for a property set', value: 1, count: 3 },
  { id: 'action_deal_breaker', type: CARD_TYPES.ACTION, action: ACTION_TYPES.DEAL_BREAKER, name: 'Deal Breaker', description: 'Steal a complete property set', value: 5, count: 2 },
  { id: 'action_sly_deal', type: CARD_TYPES.ACTION, action: ACTION_TYPES.SLY_DEAL, name: 'Sly Deal', description: 'Steal a property', value: 3, count: 3 },
  { id: 'action_forced_deal', type: CARD_TYPES.ACTION, action: ACTION_TYPES.FORCED_DEAL, name: 'Forced Deal', description: 'Swap properties with another player', value: 3, count: 3 },
  { id: 'action_debt_collector', type: CARD_TYPES.ACTION, action: ACTION_TYPES.DEBT_COLLECTOR, name: 'Debt Collector', description: 'Force a player to pay you 5M', value: 3, count: 3 },
  { id: 'action_birthday', type: CARD_TYPES.ACTION, action: ACTION_TYPES.ITS_MY_BIRTHDAY, name: "It's My Birthday", description: 'All players pay you 2M', value: 2, count: 3 },
  { id: 'action_just_say_no', type: CARD_TYPES.ACTION, action: ACTION_TYPES.JUST_SAY_NO, name: 'Just Say No', description: 'Cancel any action against you', value: 4, count: 3 },
  { id: 'action_pass_go', type: CARD_TYPES.ACTION, action: ACTION_TYPES.PASS_GO, name: 'Pass Go', description: 'Draw 2 cards', value: 1, count: 10 },
  { id: 'action_house', type: CARD_TYPES.ACTION, action: ACTION_TYPES.HOUSE, name: 'House', description: 'Add to a complete property set for extra rent', value: 3, count: 3 },
  { id: 'action_hotel', type: CARD_TYPES.ACTION, action: ACTION_TYPES.HOTEL, name: 'Hotel', description: 'Add to a complete property set for extra rent', value: 4, count: 2 }
];

// Function to create a shuffled deck
export function createDeck() {
  const deck = [];
  
  DECK.forEach(cardTemplate => {
    for (let i = 0; i < cardTemplate.count; i++) {
      deck.push({
        ...cardTemplate,
        id: `${cardTemplate.id}_${i}`,
        uniqueId: `${cardTemplate.id}_${i}_${Date.now()}_${Math.random()}`
      });
    }
  });
  
  return shuffleDeck(deck);
}

// Fisher-Yates shuffle algorithm
export function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
} 