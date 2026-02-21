# LearnQuest - Gamified Learning Platform for Grade 10 CBSE

A production-ready web application designed to make studying fun and track progress for Grade 10 CBSE students.

## Features

### 🎮 Gamification Elements
- **XP System**: Earn experience points for completing chapters
- **Level System**: Progress through levels as you study more
- **Achievements**: Unlock 24 different achievements
- **Streak Tracking**: Build study streaks for bonus rewards
- **Leaderboard**: Compare progress with peers (simulated)
- **Weekly Challenges**: Complete special challenges for bonus XP

### 📚 Subject Coverage (Grade 10 CBSE)
- Mathematics (15 chapters)
- Science (16 chapters)
- English (22 chapters)
- Hindi (17 chapters)
- Social Science (24 chapters)

### 📊 Progress Tracking
- Chapter completion tracking
- Study time monitoring
- Subject-wise progress visualization
- Daily goal setting and tracking
- Overall progress percentage

### 🎯 Study Features
- Interactive chapter selection
- Direct links to official NCERT textbooks
- Study session tracking
- Progress persistence (localStorage)
- Motivational quotes

## How to Use

1. **Open the app**: Simply open `index.html` in any modern web browser
2. **Start studying**: Click "Start Study Session" and select a subject and chapter
3. **Track progress**: Complete chapters to earn XP and unlock achievements
4. **Set goals**: Add daily goals to stay motivated
5. **View NCERT books**: Click on any subject's "NCERT Book" button to access official content

## File Structure

```
├── index.html       # Main HTML structure
├── styles.css       # All styling and responsive design
├── app.js           # Complete application logic
└── README.md        # This file
```

## Data Storage

All progress is saved automatically to your browser's localStorage, so your data persists between sessions. No server or database required!

## Customization

To change the student name:
- Edit line in `app.js`: `name: 'Saqib'` to your desired name
- Or wait for the profile settings feature

## Achievement List

- 🎯 First Steps - Complete first chapter (50 XP)
- 📚 Getting Started - Complete 5 chapters (100 XP)
- 🚀 Momentum - Complete 10 chapters (200 XP)
- 🏆 Subject Master - Complete all chapters in one subject (500 XP)
- 🔥 Dedicated - Study for 7 days straight (150 XP)
- ⚡ Unstoppable - Study for 30 days straight (1000 XP)
- And 18 more achievements to unlock!

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features for future versions:
- Quiz system with questions
- Note-taking functionality
- PDF annotations
- Timer for Pomodoro technique
- Parent dashboard
- Mobile app version
- Offline mode
- Study reminders

## Credits

Built with vanilla JavaScript - no frameworks required!
Designed for Grade 10 CBSE students following the NCERT curriculum.

---

**Note**: This app links to official NCERT resources rather than reproducing copyrighted content. All textbook content should be accessed through official NCERT channels.
