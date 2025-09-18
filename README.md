# King's Choice - Royal Strategy Game

A visual novel strategy game where your choices shape your kingdom's destiny. Built as a Progressive Web App (PWA) with React and Redux.

## 🎮 Game Features

### Core Systems
- **Narrative System**: Branching storylines with meaningful choices
- **Resource Management**: Gold, soldiers, influence, and prestige
- **Character System**: Recruit companions and build relationships
- **Combat System**: Strategic battles with turn-based mechanics
- **Building System**: Upgrade your kingdom's infrastructure
- **PWA Support**: Install and play offline

### Game Mechanics
- **Choices Matter**: Every decision affects your kingdom's future
- **Resource Strategy**: Balance income, expenses, and growth
- **Character Relationships**: Build loyalty and romance with companions
- **Kingdom Building**: Construct and upgrade buildings
- **Combat Challenges**: Face enemies in strategic battles

## 🚀 Quick Start

### Option 1: Run in Background (Recommended for SSH)
```bash
# Start the server in background (survives SSH disconnection)
./run-server.sh

# Check server status
./status-server.sh

# Stop the server
./stop-server.sh
```

### Option 2: Interactive Mode
```bash
# Install dependencies and start server
./install-and-start.sh
```

### Option 3: Manual Setup
```bash
# Install dependencies
npm install

# Start development server on port 6000
npm start
```

## 🌐 Access the Game

Once running, open your browser and navigate to:
- **Local**: http://localhost:6000
- **Network**: http://[your-ip]:6000

## 📱 PWA Installation

The game can be installed as a Progressive Web App:
1. Open the game in Chrome/Edge
2. Click the install button in the address bar
3. Or use the browser menu: "Install King's Choice"

## 🎯 Game Screens

- **Main Menu**: Start new game, continue, settings
- **Game Screen**: Overview of your kingdom and quick actions
- **Narrative**: Story progression with choices
- **Characters**: Manage companions and relationships
- **Resources**: Kingdom management and building upgrades
- **Combat**: Strategic battle system
- **Settings**: Audio, gameplay, and control options

## 🛠️ Development

### Project Structure
```
src/
├── components/          # React components
│   ├── game/           # Main game screens
│   ├── narrative/      # Story/dialogue components
│   └── ui/             # Reusable UI components
├── store/              # Redux store and slices
│   └── slices/         # Individual state slices
├── systems/            # Game logic systems
├── assets/             # Images, sounds, data
└── styles/             # CSS stylesheets
```

### Key Technologies
- **React 18**: UI framework
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **PWA**: Service worker and manifest

### Adding New Features

1. **New Game Screen**: Add component in `src/components/game/`
2. **New System**: Create slice in `src/store/slices/`
3. **New UI Component**: Add to `src/components/ui/`
4. **New Route**: Update `src/App.js`

## 🎨 Customization

### Themes
Modify colors in `src/styles/index.css`:
- Primary: `#8B4513` (Saddle Brown)
- Gold: `#FFD700`
- Background: `#2F1B14` to `#D2691E`

### Game Data
- Story content: `src/store/slices/narrativeSlice.js`
- Character data: `src/store/slices/characterSlice.js`
- Resource config: `src/store/slices/resourceSlice.js`

## 🔧 Server Management

### Background Server Scripts
- `./run-server.sh`: Start server in background
- `./stop-server.sh`: Stop background server
- `./status-server.sh`: Check server status
- `./install-and-start.sh`: Interactive setup

### Port Configuration
Default port: 6000
To change: Modify `PORT=6000` in `package.json` scripts

## 📊 Game Statistics

Track your progress with built-in statistics:
- Play time
- Choices made
- Characters met
- Battles won
- Resources earned

## 🎵 Audio & Visual

- **Fonts**: Cinzel (headings), Crimson Text (body)
- **Colors**: Royal theme with gold and brown
- **Animations**: Smooth transitions and effects
- **Responsive**: Works on desktop and mobile

## 🐛 Troubleshooting

### Server Won't Start
1. Check if port 6000 is available: `lsof -i :6000`
2. Kill existing processes: `./stop-server.sh`
3. Check logs: `tail -f server.log`

### Game Won't Load
1. Clear browser cache
2. Check console for errors
3. Verify all dependencies installed

### PWA Issues
1. Ensure HTTPS (or localhost)
2. Check manifest.json
3. Verify service worker registration

## 📝 License

This project is for educational and personal use.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy ruling your kingdom! 👑**