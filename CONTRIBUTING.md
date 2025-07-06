# 🤝 Contributing to Monopoly Deal Online Game

Thank you for your interest in contributing to the Monopoly Deal online game! This guide explains how to report bugs, request features, and contribute to the project.

## 📋 How to Contribute

### 🐛 Reporting Bugs

1. **Check existing bugs** in `BUGS.md` to avoid duplicates
2. **Use the bug template** provided in `BUGS.md`
3. **Be specific** - include steps to reproduce, expected vs actual behavior
4. **Include environment details** - browser, OS, error messages
5. **Add the bug** to the "Current Bugs" section in `BUGS.md`

**Example Bug Report:**
```markdown
### Bug Title: Cards not displaying on mobile Chrome
**Date**: 2024-01-06
**Status**: Open
**Priority**: High
**Reporter**: YourName

**Description**: 
Cards appear as white rectangles on mobile Chrome browser.

**Steps to Reproduce**:
1. Open game on mobile Chrome
2. Join a lobby and start a game
3. Observe card display in hand

**Expected Behavior**: 
Cards should display with proper images and text

**Actual Behavior**: 
Cards appear as white rectangles with no content

**Environment**:
- Browser: Chrome Mobile 120
- OS: Android 12
- Device: Samsung Galaxy S21
```

### 🚀 Requesting Features

1. **Check existing requests** in `FEATURE_REQUESTS.md` to avoid duplicates
2. **Use the feature template** provided in `FEATURE_REQUESTS.md`
3. **Write user stories** - explain who, what, and why
4. **Define acceptance criteria** - specific, testable requirements
5. **Add the feature** to the "Requested Features" section

**Example Feature Request:**
```markdown
### Feature Title: Dark Mode Theme
**Date**: 2024-01-06
**Status**: Requested
**Priority**: Medium
**Category**: UI/UX
**Requester**: YourName

**Description**: 
Add a dark mode theme option for better gameplay in low-light conditions.

**User Story**: 
As a player who plays at night, I want a dark mode theme so that the game is easier on my eyes.

**Acceptance Criteria**:
- [ ] Dark theme toggle in settings
- [ ] Dark colors for all UI elements
- [ ] Maintains card readability
- [ ] Preference saved between sessions
```

### 💻 Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow coding standards**:
   - Use meaningful variable names
   - Add comments for complex logic
   - Follow existing code style
   - Write clean, readable code
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to your branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

### 🧪 Testing Guidelines

**Before submitting code:**
- [ ] Test all game functionality still works
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test responsive design on mobile
- [ ] Check for console errors
- [ ] Verify multiplayer features work correctly
- [ ] Test edge cases and error handling

## 📝 Coding Standards

### Frontend (React)
- Use functional components with hooks
- Follow Tailwind CSS class conventions
- Use meaningful component names
- Implement proper error boundaries
- Use TypeScript-style prop validation

### Backend (Node.js)
- Use async/await instead of callbacks
- Implement proper error handling
- Add input validation for all endpoints
- Use meaningful function names
- Document complex game logic

### Shared Code
- Keep game constants in `shared/gameTypes.js`
- Document all game rules and mechanics
- Use clear, descriptive names for game entities

## 🏷️ Labels and Priorities

### Bug Priorities
- **High** 🔴: Game-breaking, security issues, crashes
- **Medium** 🟡: Feature not working, performance issues
- **Low** 🟢: Cosmetic issues, minor improvements

### Feature Priorities
- **High** 🔴: Essential for core experience
- **Medium** 🟡: Significantly improves experience
- **Low** 🟢: Nice-to-have enhancements

### Categories
- **Gameplay**: Core game mechanics and rules
- **UI/UX**: User interface and experience
- **Multiplayer**: Real-time features and communication
- **Performance**: Speed and optimization
- **Admin**: Moderation and management features

## 🔄 Development Workflow

### Setting Up Development Environment
1. Clone the repository
2. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. Start development servers:
   ```bash
   # Terminal 1: Backend
   cd server && npm run dev
   
   # Terminal 2: Frontend
   cd client && npm start
   ```

### Making Changes
1. Create a new branch for your feature/fix
2. Make your changes in small, logical commits
3. Test thoroughly on `http://localhost:3000`
4. Update documentation if needed
5. Update `BUGS.md` or `FEATURE_REQUESTS.md` as appropriate

### Pull Request Guidelines
- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Link to related** bugs or feature requests
- **Screenshots** for UI changes
- **Testing instructions** for reviewers

## 🎯 Current Development Priorities

### Immediate (Week 1-2)
1. Fix any critical bugs reported in `BUGS.md`
2. Mobile responsive design improvements
3. Enhanced error handling and user feedback

### Short Term (Month 1)
1. Chat system implementation
2. Game statistics tracking
3. Performance optimizations

### Long Term (Month 2+)
1. Spectator mode
2. Tournament system
3. AI players for practice

## 🤔 Questions?

- **Technical questions**: Create an issue with the `question` label
- **Feature discussions**: Add to `FEATURE_REQUESTS.md` for community discussion
- **Bug reports**: Follow the template in `BUGS.md`
- **General feedback**: Open a discussion in the repository

## 📜 Code of Conduct

- Be respectful and constructive in all interactions
- Focus on the issue, not the person
- Welcome newcomers and help them learn
- Keep discussions relevant to the project
- No spam, harassment, or inappropriate content

## 🙏 Recognition

Contributors will be recognized in:
- Project README acknowledgments
- Release notes for significant contributions
- Special thanks for major features or bug fixes

---

Thank you for helping make Monopoly Deal Online Game better for everyone! 🎮✨ 