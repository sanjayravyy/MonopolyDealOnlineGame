Create a full-stack web app for an online version of the Monopoly Deal card game with the following requirements:

# OVERVIEW
Build a multiplayer Monopoly Deal game that users can play online via their browser. The site should allow a player to create a game lobby, share a link with friends (max 5 players), and play the game in real time.

# TECH STACK
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express + Socket.IO
- Hosting: Prepare structure to be easily deployed (e.g., Netlify for frontend, Render for backend)

# FEATURES

## 1. LOBBY SYSTEM
- A user can click "Create Game" and get a unique lobby code or URL (e.g., /lobby/abc123)
- Other users can join the game using the link (up to 5 total players)
- Display player list in the lobby
- Host can click "Start Game" when all players are ready

## 2. REAL-TIME MULTIPLAYER (Socket.IO)
- Use Socket.IO to broadcast real-time updates:
  - Player joins/leaves
  - Game state changes
  - Turn transitions
- Handle disconnects/reconnects gracefully

## 3. GAME LOGIC (Simplified Monopoly Deal)
- Card Deck: Implement Monopoly Deal deck with actions, properties, and money cards
- Turn System: Players take turns, can play up to 3 cards
- Bank, Property, and Hand Zones per player
- Implement these card types:
  - Property cards (colors, sets)
  - Action cards (e.g., Rent, Deal Breaker, Sly Deal, Just Say No)
  - Money cards
- Track each player's bank, property sets, hand
- Victory Condition: A player wins when they have 3 full property sets

## 4. UI/UX
- Player hand (cards only visible to them)
- Public display of all property sets and banks
- Turn indicator + action choices
- Simple, clean UI using Tailwind CSS
- Show game history (what moves were made)

## 5. FILE STRUCTURE SUGGESTION
- client/ → React frontend
- server/ → Node.js backend
  - socket logic
  - lobby and game state management
- shared/ → shared game logic/types (e.g., deck config, card data)

# BONUS (if time permits)
- Add simple chat inside the lobby/game
- Support "Just Say No" reaction system
- Auto shuffle & draw pile

# IMPORTANT BEHAVIOR NOTES
- The game must enforce valid moves only (e.g., can’t play 5 cards on a turn)
- Keep track of card interactions (e.g., Rent, Sly Deal, Debt Collection)
- Game logic should be centralized on the server to prevent cheating

# OUTPUT FORMAT
- Full codebase with client/server folders
- Each file should be complete and logically organized
- Include README with instructions on how to run both frontend and backend locally

# FIRST STEPS
Start by setting up the project structure with:
- Express backend with Socket.IO support
- React frontend with a "Create Lobby" and "Join Lobby" page
- Real-time communication working for lobby join events
