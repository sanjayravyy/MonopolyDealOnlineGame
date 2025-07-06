# 🐛 Bug Tracker - Monopoly Deal Online Game

This file tracks bugs, issues, and their fixes for the Monopoly Deal online game.

## 📋 How to Report a Bug

Copy this template and fill it out:

```markdown
### Bug Title: [Short description]
**Date**: [YYYY-MM-DD]
**Status**: Open | In Progress | Fixed | Closed
**Priority**: High | Medium | Low
**Reporter**: [Your name]

**Description**: 
[Detailed description of the bug]

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**: 
[What should happen]

**Actual Behavior**: 
[What actually happens]

**Environment**:
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/Mac/Linux]
- Frontend URL: [http://localhost:3000]
- Backend URL: [http://localhost:5000]

**Screenshots/Error Messages**: 
[If applicable, paste error messages or describe visual issues]

**Workaround**: 
[If you found a temporary solution]
```

---

## 🐛 Current Bugs

### Bug #001: Duplicate Player Entries in Lobby
**Date**: 2024-01-06
**Status**: ✅ Fixed
**Priority**: High
**Reporter**: User

**Description**: 
Same player was being added multiple times to the lobby, causing "Lobby is full" error.

**Steps to Reproduce**:
1. Join a lobby
2. Connection issues or multiple clicks
3. Player appears 5 times in the lobby

**Expected Behavior**: 
Player should only appear once in the lobby

**Actual Behavior**: 
Same player appears multiple times, filling the lobby

**Environment**:
- All browsers
- Backend server issue

**Fix Applied**: 
Added duplicate prevention checks in `server/server.js`:
- Check for existing socket ID
- Check for existing player name
- Prevent multiple join requests

---

### Bug #002: [Template for new bugs]
**Date**: 
**Status**: Open
**Priority**: 
**Reporter**: 

**Description**: 


**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**: 


**Actual Behavior**: 


**Environment**:
- Browser: 
- OS: 

**Screenshots/Error Messages**: 


---

## 🔧 Common Issues & Solutions

### Frontend Issues

**Issue**: "🔴 Disconnected" status
- **Cause**: Backend server not running
- **Fix**: Start backend with `cd server && npm run dev`

**Issue**: Blank/white page
- **Cause**: Frontend compilation errors
- **Fix**: Check console for errors, restart with `cd client && npm start`

**Issue**: Cards not displaying properly
- **Cause**: CSS/Tailwind issues
- **Fix**: Check if Tailwind is loading, refresh browser

### Backend Issues

**Issue**: "npm error ENOENT"
- **Cause**: Running npm from wrong directory
- **Fix**: Ensure you're in `server/` or `client/` directory

**Issue**: Port already in use
- **Cause**: Another process using port 3000 or 5000
- **Fix**: Kill the process or change ports

**Issue**: Socket connection fails
- **Cause**: CORS or firewall issues
- **Fix**: Check CORS settings in server.js

### Game Logic Issues

**Issue**: Cards not playing
- **Cause**: Turn validation or game state issues
- **Fix**: Check if it's your turn and you have actions remaining

**Issue**: Lobby stuck on "waiting"
- **Cause**: Not all players ready or minimum players not met
- **Fix**: Ensure all players click "Ready Up"

---

## 🚀 Bug Priority Levels

**High Priority** 🔴
- Game-breaking bugs
- Server crashes
- Unable to create/join games
- Connection issues

**Medium Priority** 🟡
- Feature doesn't work as expected
- UI/UX issues
- Performance problems
- Minor game logic errors

**Low Priority** 🟢
- Cosmetic issues
- Enhancement requests
- Documentation updates
- Code optimization

---

## 📝 Bug Report Examples

### Example: Good Bug Report
```markdown
### Bug Title: Cards disappear after playing action card
**Date**: 2024-01-06
**Status**: Open
**Priority**: Medium
**Reporter**: Player123

**Description**: 
When I play a "Sly Deal" action card, all my property cards disappear from the board.

**Steps to Reproduce**:
1. Have property cards on the board
2. Play a "Sly Deal" action card
3. Select target player and property
4. Confirm the action

**Expected Behavior**: 
Only the stolen property should move, other properties should remain

**Actual Behavior**: 
All my properties disappear from the board

**Environment**:
- Browser: Chrome 120
- OS: Windows 11
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Error Message**: 
Console shows: "Cannot read property 'properties' of undefined"
```

### Example: Bad Bug Report ❌
```markdown
### Bug Title: Game broken
**Status**: Open

**Description**: 
Game doesn't work
```

---

## 📊 Bug Statistics

- **Total Bugs Reported**: 1
- **Fixed**: 1
- **Open**: 0
- **In Progress**: 0

**Last Updated**: January 6, 2024 