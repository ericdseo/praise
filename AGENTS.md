# 칭찬 스티커 (Praise Stickers)

A progressive web app for parents to reward children's good behavior with stickers.

## Tech Stack

- **HTML5** - Semantic structure, PWA-capable
- **Vanilla CSS** - Custom properties, glassmorphism, dark theme
- **Vanilla JavaScript** - No frameworks, localStorage for persistence
- **Fonts** - Noto Sans KR (Google Fonts)

## File Structure

```
/Users/dale/work/reward/
├── index.html          # Main HTML structure
├── styles.css          # All styling (1450+ lines)
├── app.js              # Application logic (~980 lines)
├── docs/               # Project documentation
│   ├── task.md
│   ├── walkthrough.md
│   └── v6_sticker_picker.md
└── AGENTS.md          # This file
```

## Core Features

### 1. Multilingual Support (v3.0)
- Korean (ko) and English (en)
- Language toggle via `�🇧 EN` / `🇰🇷 KO` button
- All UI text translates dynamically
- Available on both main screen and detail screen
- Preference saved in localStorage

### 2. Reward Status Management (v5.0)
- Three filter states: Active, Completed, All
- **Active rewards**: Currently in progress
- **Completed rewards**: Goals achieved, stickers preserved
- Read-only view for completed rewards
- One-click restart capability
- Completion timestamp tracking

### 3. Reward Management
- Create/edit/delete rewards
- Each reward has: emoji, name, target sticker count, status
- Emoji picker with 5 categories (food, play, gift, animal, special)
- 80+ built-in emojis
- Custom emoji support

### 4. Sticker Grid (Simplified)
- Clean grid layout (no day/week labels)
- Dynamic grid sizing based on target count
- Responsive grid: `repeat(auto-fill, minmax(70px, 1fr))`
- Click cells to place selected sticker
- Multi-row sticker palette with vertical scroll
- Visual feedback: pop animation, hover effects
- Clear all button (right-aligned above grid)

### 5. Emoji Picker Modal (v6.0)
- **Beautiful modal interface** instead of prompt input
- Category tabs: Food, Play, Gifts, Animals, Special
- Grid layout showing all available emojis
- Visual feedback for already-selected emojis
- Click ➕ button at end of sticker palette to open
- Smart duplicate prevention
- New emojis added to front of palette
- Maximum 70 visible stickers

### 6. Progress Tracking
- Real-time sticker count updates
- Animated progress bars
- Progress display above progress bar (consistent layout)
- Celebration confetti when goal achieved
- Claim reward flow with status update (preservation mode)

### 7. UX Improvements (v4.0, v6.0)
- Celebration overlay shown on detail screen
- Automatic return to main screen after claiming
- Clear All button repositioned above grid
- Language toggle always visible
- Consistent spacing and alignment

## Data Model

```javascript
// Reward object structure (v5.0)
{
  id: "reward_timestamp_random",
  emoji: "🎮",
  name: "게임 시간",
  target: 10,
  stickers: ["⭐", "🌟", "", "💫", ...], // Array of placed stickers
  status: "active",              // 'active' | 'completed'
  completedAt: 1703289600000,    // Timestamp or null
  createdAt: 1703289600000
}
```

**Storage Keys:**
- `praiseStickers_rewards_v3` - Array of rewards
- `praiseStickers_userStickers` - Array of available stickers
- `praiseStickers_lang` - Current language ('ko' | 'en')

## Design System

### CSS Variables
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--success-gradient: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--warning-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--bg-primary: #0f0f23;
--bg-card: rgba(30, 30, 50, 0.8);
--text-primary: #ffffff;
--border-glow: rgba(102, 126, 234, 0.5);
--radius-lg: 24px;
--radius-md: 16px;
--radius-sm: 12px;
--radius-full: 999px;
--transition-normal: 0.3s ease;
--transition-fast: 0.2s ease;
```

### Key Design Patterns
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient accents**: Primary for interactive elements, warning for progress, success for completion
- **Consistent spacing**: 20px padding for main containers
- **Micro-animations**: Scale transforms, smooth transitions
- **Visual hierarchy**: Clear distinction between active and completed states

### Animation Guidelines
- Use `@keyframes` for sticker placement (`stickerPop`)
- Smooth transitions on hover/focus states (0.2s ease)
- Confetti animation for celebrations
- Scale transforms (1.05-1.15) for interactive feedback
- Fade transitions for modals and overlays

### Responsive Breakpoints
- Mobile: `max-width: 600px`
- iPad: `min-width: 768px` and `max-width: 1024px`
- Desktop: Default styles

## Development Guidelines

### Code Style
1. **No dependencies** - Pure vanilla JS/CSS
2. **Descriptive names** - `renderStickerPalette()`, not `render()`
3. **Comments** - Section headers with `===========================`
4. **Event handling** - Mix of addEventListener and inline onclick for simplicity
5. **LocalStorage** - Always call `saveToStorage()` after mutations
6. **Data migration** - Include backward compatibility for schema changes

### Adding Features
1. Update language objects (`LANGUAGES.ko` and `LANGUAGES.en`)
2. Add HTML structure in `index.html`
3. Style in `styles.css` following existing patterns
4. Implement logic in `app.js`
5. Test both languages
6. Test mobile and desktop layouts
7. Test filter states (active/completed/all)

### Common Patterns

**Modal Management:**
```javascript
modal.classList.add('visible');    // Show
modal.classList.remove('visible'); // Hide
```

**Translation:**
```javascript
function t(key) {
  return LANGUAGES[currentLang][key] || key;
}
```

**Filter Rendering:**
```javascript
let filteredRewards = rewards;
if (currentFilter === 'active') {
  filteredRewards = rewards.filter(r => r.status !== 'completed');
}
```

**Date Formatting:**
```javascript
const date = new Date(reward.completedAt);
const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
```

## Version History

### v6.0 - Sticker Picker Modal (Current)
- Replaced prompt input with beautiful emoji picker modal
- Category-based emoji browsing
- Clear All button repositioned above grid
- Language toggle added to detail screen
- Progress display moved above progress bar
- Bug fix: Empty state only shows when no rewards exist

### v5.0 - Reward Status Management
- Added reward status tracking (active/completed)
- Filter system (Active/Completed/All)
- Read-only view for completed rewards
- Restart functionality
- Completion timestamps

### v4.0 - UX Flow Improvements
- Celebration overlay on detail screen
- Automatic navigation after claiming
- Removed main screen claim buttons

### v3.0 - Multilingual Support
- Korean and English language toggle
- Dynamic UI translation
- Custom emoji input

### v2.0 - Enhanced Stickers
- Expanded emoji picker
- Detail sticker screen

### v1.0 - Initial Release
- Basic reward CRUD
- Sticker placement
- Progress tracking

## Deployment

### Local Development
```bash
# Start dev server
npx -y serve . -l 3000

# Expose via ngrok (optional)
ngrok http 3000
```

### Production Build
No build step required - static files ready to deploy to:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

### PWA Installation
- Works offline via browser caching
- Add to home screen on iPad/mobile
- Meta tags configured for iOS

## Testing Checklist

- [ ] Language toggle (KO ↔ EN) on both screens
- [ ] Create/edit/delete rewards
- [ ] Emoji picker modal (all 5 categories)
- [ ] Emoji picker duplicate prevention
- [ ] Sticker placement/removal
- [ ] Progress bar updates
- [ ] Goal completion celebration
- [ ] Claim reward flow (status → completed)
- [ ] Clear all stickers
- [ ] Filter switching (Active/Completed/All)
- [ ] Completed reward read-only mode
- [ ] Restart reward functionality
- [ ] localStorage persistence
- [ ] Mobile/tablet responsive layout
- [ ] Empty state only shows when no rewards

## Known Limitations

1. **No backend** - All data in localStorage (per-device)
2. **No sync** - Can't sync across devices
3. **No authentication** - Anyone with access can modify
4. **Browser support** - Modern browsers only (ES6+)
5. **Emoji rendering** - Depends on device/OS emoji font

## Future Enhancements

- Cloud sync via Firebase/Supabase
- Multiple child profiles
- Sticker history/analytics
- Custom reward sounds/images
- Parent PIN protection
- Export/import data as JSON
- Dark/light theme toggle
- Reward templates library
- Notification reminders
- Badge/achievement system
