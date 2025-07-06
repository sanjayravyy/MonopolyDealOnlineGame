# Monopoly Deal Online Game

A full-stack web application for playing Monopoly Deal online with friends. Built with React, Node.js, Express, and Socket.IO for real-time multiplayer gameplay.

## Features

- **Real-time Multiplayer**: Up to 5 players can join a game lobby
- **Complete Game Logic**: Full Monopoly Deal rules implementation
- **Responsive Design**: Works on desktop and mobile devices
- **Live Updates**: Real-time game state synchronization
- **Property Management**: Visual property sets and bank management
- **Turn-based Gameplay**: Enforced turn system with action limits

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Socket.IO Client
- React Router

### Backend
- Node.js
- Express
- Socket.IO
- UUID for lobby generation

### Shared
- Common game logic and constants

## Project Structure

```
MonopolyDealOnlineGame/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── server.js          # Main server file
│   ├── gameManager.js     # Game logic manager
│   └── package.json
├── shared/                 # Shared game logic
│   ├── gameTypes.js       # Game constants
│   └── deck.js            # Card deck configuration
├── BUGS.md                 # Bug tracking and fixes
├── FEATURE_REQUESTS.md     # Feature requests and roadmap
├── CONTRIBUTING.md         # How to contribute and report issues
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MonopolyDealOnlineGame
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   The client will start on `http://localhost:3000`

#### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd server
   npm start
   ```

## How to Play

### Game Setup
1. Go to the home page
2. Enter your name
3. Either:
   - Click "Create New Game" to start a lobby
   - Click "Join Existing Game" and enter a lobby code

### Lobby
1. Share the lobby code or link with friends
2. Wait for 2-5 players to join
3. All players must click "Ready Up"
4. The host can start the game when everyone is ready

### Gameplay
1. **Objective**: Be the first to collect 3 complete property sets
2. **Turn Structure**:
   - Play up to 3 cards from your hand
   - Cards can be played as:
     - **Money**: Add to your bank
     - **Property**: Add to your property collections
     - **Action**: Use special effects (rent, steal, etc.)
   - Draw 2 cards at the end of your turn
3. **Winning**: Complete 3 full property sets to win

### Card Types
- **Property Cards**: Build sets to win the game
- **Money Cards**: Use to pay rent and fees
- **Action Cards**: Special effects like stealing properties or charging rent
- **Rent Cards**: Force other players to pay you

## Game Rules

### Property Sets
- **Brown**: 2 properties
- **Light Blue**: 3 properties  
- **Pink**: 3 properties
- **Orange**: 3 properties
- **Red**: 3 properties
- **Yellow**: 3 properties
- **Green**: 3 properties
- **Dark Blue**: 2 properties
- **Utilities**: 2 properties
- **Railroads**: 4 properties

### Actions per Turn
- Maximum 3 actions per turn
- Playing any card counts as 1 action
- Must draw 2 cards at end of turn

## Deployment

### Frontend (Netlify)
1. Build the project: `cd client && npm run build`
2. Deploy the `build` folder to Netlify
3. Set environment variable: `REACT_APP_SERVER_URL=<your-backend-url>`

### Backend (Render/Heroku)
1. Deploy the `server` folder
2. Set environment variable: `CLIENT_URL=<your-frontend-url>`
3. Ensure the port is set correctly: `process.env.PORT || 5000`

### Environment Variables

#### Client (.env)
```
REACT_APP_SERVER_URL=http://localhost:5000
```

#### Server (.env)
```
PORT=5000
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### REST API
- `POST /api/lobby/create` - Create a new game lobby
- `GET /api/lobby/:lobbyId` - Get lobby information
- `GET /health` - Health check

### Socket.IO Events

#### Client to Server
- `join_lobby` - Join a game lobby
- `player_ready` - Toggle player ready status
- `start_game` - Start the game (host only)
- `play_card` - Play a card
- `end_turn` - End current turn

#### Server to Client
- `player_joined` - Player joined the lobby
- `player_left` - Player left the lobby
- `player_status_changed` - Player ready status changed
- `game_started` - Game has started
- `game_state_updated` - Game state updated
- `hand_updated` - Player's hand updated
- `turn_ended` - Turn ended
- `game_ended` - Game finished
- `error` - Error message

## Development

### Adding New Features
1. Update shared game logic in `shared/`
2. Implement backend logic in `server/gameManager.js`
3. Add socket events in `server/server.js`
4. Update frontend context in `client/src/context/`
5. Create/update UI components

### Testing
```bash
# Backend
cd server
npm test

# Frontend  
cd client
npm test
```

## Contributing

Please read `CONTRIBUTING.md` for detailed guidelines on:
- How to report bugs using `BUGS.md`
- How to request features using `FEATURE_REQUESTS.md`
- Code style and testing requirements
- Development workflow and pull request process

Quick start:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Monopoly Deal is a trademark of Hasbro.

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Ensure both frontend and backend are running
   - Check that ports 3000 and 5000 are not blocked
   - Verify WebSocket connections are allowed

2. **Game State Issues**
   - Refresh the page to reconnect
   - Check browser console for errors
   - Ensure all players have stable internet connections

3. **Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility
   - Verify all required environment variables are set

### Support

For issues and questions:
- **Report Bugs**: Add to `BUGS.md` using the provided template
- **Request Features**: Add to `FEATURE_REQUESTS.md` using the provided template
- **General Support**: Check existing documentation or create an issue 