// LearnQuest - Gamified Learning Platform for Grade 10 CBSE

// Data Structure
const subjects = {
    mathematics: {
        name: 'Mathematics',
        icon: '📐',
        color: 'mathematics',
        chapters: 15,
        ncertLink: 'https://ncert.nic.in/textbook.php?jemh1=0-8',
        topics: [
            'Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables',
            'Quadratic Equations', 'Arithmetic Progressions', 'Triangles',
            'Coordinate Geometry', 'Introduction to Trigonometry', 'Applications of Trigonometry',
            'Circles', 'Constructions', 'Areas Related to Circles',
            'Surface Areas and Volumes', 'Statistics', 'Probability'
        ]
    },
    science: {
        name: 'Science',
        icon: '🔬',
        color: 'physics',
        chapters: 16,
        ncertLink: 'https://ncert.nic.in/textbook.php?jesc1=0-16',
        topics: [
            'Chemical Reactions and Equations', 'Acids, Bases and Salts', 'Metals and Non-metals',
            'Carbon and its Compounds', 'Periodic Classification of Elements',
            'Life Processes', 'Control and Coordination', 'How do Organisms Reproduce?',
            'Heredity and Evolution', 'Light - Reflection and Refraction',
            'Human Eye and Colourful World', 'Electricity', 'Magnetic Effects of Electric Current',
            'Sources of Energy', 'Our Environment', 'Sustainable Management of Natural Resources'
        ]
    },
    english: {
        name: 'English',
        icon: '📖',
        color: 'english',
        chapters: 22,
        ncertLink: 'https://ncert.nic.in/textbook.php?iefp1=0-15',
        topics: [
            'First Flight: A Letter to God', 'Nelson Mandela: Long Walk to Freedom',
            'Two Stories about Flying', 'From the Diary of Anne Frank',
            'The Hundred Dresses', 'Glimpses of India', 'Mijbil the Otter',
            'Madam Rides the Bus', 'The Sermon at Benares', 'The Proposal',
            'Footprints without Feet: A Triumph of Surgery', 'The Thief\'s Story',
            'The Midnight Visitor', 'A Question of Trust', 'Footprints without Feet',
            'The Making of a Scientist', 'The Necklace', 'The Hack Driver',
            'Bholi', 'The Book That Saved the Earth'
        ]
    },
    hindi: {
        name: 'Hindi',
        icon: '🇮🇳',
        color: 'hindi',
        chapters: 17,
        ncertLink: 'https://ncert.nic.in/textbook.php?jhks1=0-15',
        topics: [
            'स्पर्श भाग-2', 'संचयन भाग-2', 'कृतिका भाग-2',
            'सूरदास के पद', 'तुलसीदास के पद', 'देव', 'जयशंकर प्रसाद',
            'सूर्यकांत त्रिपाठी निराला', 'नागार्जुन', 'गिरिजा कुमार माथुर',
            'ऋतुराज', 'मंगलेश डबराल', 'स्वयं प्रकाश', 'रामवृक्ष बेनीपुरी',
            'यशपाल', 'भदंत आनंद कौसल्यायन', 'यतींद्र मिश्र'
        ]
    },
    socialScience: {
        name: 'Social Science',
        icon: '🌍',
        color: 'social',
        chapters: 24,
        ncertLink: 'https://ncert.nic.in/textbook.php?jess1=0-8',
        topics: [
            'History: The Rise of Nationalism in Europe', 'Nationalism in India',
            'The Making of a Global World', 'The Age of Industrialisation',
            'Print Culture and the Modern World',
            'Geography: Resources and Development', 'Forest and Wildlife Resources',
            'Water Resources', 'Agriculture', 'Minerals and Energy Resources',
            'Manufacturing Industries', 'Lifelines of National Economy',
            'Political Science: Power Sharing', 'Federalism', 'Democracy and Diversity',
            'Gender, Religion and Caste', 'Popular Struggles and Movements',
            'Political Parties', 'Outcomes of Democracy',
            'Economics: Development', 'Sectors of Indian Economy', 'Money and Credit',
            'Globalisation and the Indian Economy', 'Consumer Rights'
        ]
    }
};

// User Progress Data (stored in localStorage)
let userData = {
    name: 'Saqib',
    level: 1,
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    chaptersCompleted: 0,
    studyHours: 0,
    achievements: [],
    subjectProgress: {},
    goals: [],
    dailyGoalProgress: 0
};

const achievements = [
    { id: 'first_chapter', name: 'First Steps', desc: 'Complete your first chapter', icon: '🎯', xp: 50 },
    { id: 'five_chapters', name: 'Getting Started', desc: 'Complete 5 chapters', icon: '📚', xp: 100 },
    { id: 'ten_chapters', name: 'Momentum', desc: 'Complete 10 chapters', icon: '🚀', xp: 200 },
    { id: 'first_subject', name: 'Subject Master', desc: 'Complete all chapters in one subject', icon: '🏆', xp: 500 },
    { id: 'week_streak', name: 'Dedicated', desc: 'Study for 7 days straight', icon: '🔥', xp: 150 },
    { id: 'month_streak', name: 'Unstoppable', desc: 'Study for 30 days straight', icon: '⚡', xp: 1000 },
    { id: 'early_bird', name: 'Early Bird', desc: 'Study before 7 AM', icon: '🌅', xp: 75 },
    { id: 'night_owl', name: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', xp: 75 },
    { id: 'speed_reader', name: 'Speed Reader', desc: 'Complete 3 chapters in one day', icon: '💨', xp: 200 },
    { id: 'perfect_week', name: 'Perfect Week', desc: 'Complete all daily goals for a week', icon: '✨', xp: 300 },
    { id: 'quiz_master', name: 'Quiz Master', desc: 'Score 100% on a quiz', icon: '🎓', xp: 150 },
    { id: 'all_subjects', name: 'Renaissance Person', desc: 'Study all subjects', icon: '🌟', xp: 500 },
    { id: 'level_5', name: 'Rising Star', desc: 'Reach Level 5', icon: '⭐', xp: 250 },
    { id: 'level_10', name: 'Expert', desc: 'Reach Level 10', icon: '👑', xp: 500 },
    { id: 'hundred_hours', name: 'Century', desc: 'Study for 100 hours', icon: '⏱️', xp: 1000 },
    { id: 'half_done', name: 'Halfway There', desc: 'Complete 50% of all chapters', icon: '🎯', xp: 750 },
    { id: 'three_quarters', name: 'Almost Done', desc: 'Complete 75% of all chapters', icon: '🎊', xp: 1000 },
    { id: 'complete_all', name: 'Legend', desc: 'Complete all chapters', icon: '🏅', xp: 2000 },
    { id: 'help_friend', name: 'Helper', desc: 'Share a study resource', icon: '🤝', xp: 100 },
    { id: 'note_taker', name: 'Note Taker', desc: 'Take notes in 10 chapters', icon: '📝', xp: 200 },
    { id: 'revision_king', name: 'Revision King', desc: 'Revise 20 chapters', icon: '🔄', xp: 300 },
    { id: 'exam_ready', name: 'Exam Ready', desc: 'Complete practice tests for all subjects', icon: '📋', xp: 500 },
    { id: 'consistent', name: 'Consistent', desc: 'Study at the same time for 10 days', icon: '⏰', xp: 200 },
    { id: 'overachiever', name: 'Overachiever', desc: 'Reach Level 20', icon: '💎', xp: 2000 }
];

const motivationalQuotes = [
    "Keep pushing forward! Every chapter you complete brings you closer to your goals.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner. Keep going!",
    "Your future is created by what you do today, not tomorrow.",
    "Education is the passport to the future. Keep studying!",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going!",
    "You're doing amazing! Keep up the great work!",
    "Every accomplishment starts with the decision to try."
];

// Initialize app
function init() {
    loadUserData();
    updateUI();
    renderSubjects();
    renderAchievements();
    renderLeaderboard();
    updateStreak();
    showDailyQuote();
}

// Load user data from localStorage
function loadUserData() {
    const saved = localStorage.getItem('learnquest_user');
    if (saved) {
        userData = JSON.parse(saved);
    } else {
        // Initialize subject progress
        for (let key in subjects) {
            userData.subjectProgress[key] = {
                completed: [],
                inProgress: null,
                timeSpent: 0
            };
        }
        saveUserData();
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('learnquest_user', JSON.stringify(userData));
}

// Update UI elements
function updateUI() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userInitial').textContent = userData.name[0];
    document.getElementById('userLevel').textContent = `Level ${userData.level}`;
    document.getElementById('totalXP').textContent = `${userData.xp} XP`;
    document.getElementById('streakDays').textContent = userData.streak;
    document.getElementById('chaptersCompleted').textContent = userData.chaptersCompleted;
    document.getElementById('studyHours').textContent = Math.round(userData.studyHours);
    document.getElementById('dailyProgress').textContent = userData.dailyGoalProgress;
    document.getElementById('achievementCount').textContent = userData.achievements.length;

    renderGoals();
    renderRecentAchievements();
    renderSubjectsCompact();
    updateWeeklyChallenge();
}

// Show random motivational quote
function showDailyQuote() {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('dailyQuote').textContent = quote;
}

// Render subjects in compact view
function renderSubjectsCompact() {
    const container = document.getElementById('subjectsCompact');
    container.innerHTML = '';

    for (let key in subjects) {
        const subject = subjects[key];
        const progress = userData.subjectProgress[key];
        const completedCount = progress.completed.length;
        const percentage = Math.round((completedCount / subject.chapters) * 100);

        const card = document.createElement('div');
        card.className = 'subject-compact-card';
        card.onclick = () => openSubject(key);

        card.innerHTML = `
            <div class="subject-compact-header">
                <span class="subject-compact-icon">${subject.icon}</span>
                <span class="subject-compact-title">${subject.name}</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill subject" style="width: ${percentage}%;"></div>
            </div>
            <div class="progress-text">${completedCount}/${subject.chapters} chapters • ${percentage}%</div>
        `;

        container.appendChild(card);
    }
}

// Render subjects in detailed view
function renderSubjects() {
    const container = document.getElementById('subjectsDetailed');
    container.innerHTML = '';

    for (let key in subjects) {
        const subject = subjects[key];
        const progress = userData.subjectProgress[key];
        const completedCount = progress.completed.length;
        const percentage = Math.round((completedCount / subject.chapters) * 100);

        const card = document.createElement('div');
        card.className = 'subject-detailed-card';

        card.innerHTML = `
            <div class="subject-header ${subject.color}">
                <div class="subject-header-icon">${subject.icon}</div>
                <h3>${subject.name}</h3>
            </div>
            <div class="subject-body">
                <div class="chapter-count">${subject.chapters} chapters</div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill subject" style="width: ${percentage}%;"></div>
                </div>
                <div class="progress-text">${completedCount} completed • ${percentage}%</div>
                <div class="subject-actions">
                    <button class="subject-btn primary" onclick="startStudySubject('${key}')">Study</button>
                    <button class="subject-btn secondary" onclick="openNCERT('${key}')">NCERT Book</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    }
}

// Open NCERT official website
function openNCERT(subjectKey) {
    const subject = subjects[subjectKey];
    window.open(subject.ncertLink, '_blank');
    addXP(10);
}

// Start study session
function startStudySession() {
    const modal = document.getElementById('studyModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <p style="margin-bottom: 20px;">Select a subject to begin your study session:</p>
        <select id="subjectSelect" class="subject-select" onchange="loadChapters()">
            <option value="">Choose a subject...</option>
            ${Object.keys(subjects).map(key =>
                `<option value="${key}">${subjects[key].name}</option>`
            ).join('')}
        </select>
        <div id="chapterList"></div>
    `;

    modal.classList.add('show');
}

// Load chapters for selected subject
function loadChapters() {
    const select = document.getElementById('subjectSelect');
    const subjectKey = select.value;
    const chapterList = document.getElementById('chapterList');

    if (!subjectKey) {
        chapterList.innerHTML = '';
        return;
    }

    const subject = subjects[subjectKey];
    const progress = userData.subjectProgress[subjectKey];

    chapterList.innerHTML = '<div class="chapter-list">' +
        subject.topics.map((topic, index) => {
            const chapterNum = index + 1;
            const isCompleted = progress.completed.includes(chapterNum);
            return `
                <div class="chapter-item" onclick="startChapter('${subjectKey}', ${chapterNum})">
                    ${isCompleted ? '✅' : '📖'} Chapter ${chapterNum}: ${topic}
                </div>
            `;
        }).join('') +
        '</div>';
}

// Start studying a chapter
function startChapter(subjectKey, chapterNum) {
    const subject = subjects[subjectKey];
    const progress = userData.subjectProgress[subjectKey];

    if (progress.completed.includes(chapterNum)) {
        alert('You\'ve already completed this chapter! Review it or try another one.');
        return;
    }

    // Mark chapter as completed
    progress.completed.push(chapterNum);
    userData.chaptersCompleted++;
    userData.studyHours += 1; // Simulate 1 hour of study

    // Add XP
    const xpEarned = 50;
    addXP(xpEarned);

    // Check for achievements
    checkAchievements();

    // Save and update
    saveUserData();
    updateUI();
    closeModal();

    // Show success message
    showNotification(`✅ Completed Chapter ${chapterNum} of ${subject.name}! +${xpEarned} XP`);
}

// Start study for specific subject
function startStudySubject(subjectKey) {
    document.getElementById('subjectSelect').value = subjectKey;
    startStudySession();
    loadChapters();
}

// Open subject details
function openSubject(subjectKey) {
    showSection('subjects');
    // Scroll to subject if needed
}

// Add XP and check for level up
function addXP(amount) {
    userData.xp += amount;
    const newLevel = Math.floor(userData.xp / 1000) + 1;

    if (newLevel > userData.level) {
        userData.level = newLevel;
        showNotification(`🎉 Level Up! You're now Level ${userData.level}!`);
        checkAchievements();
    }
}

// Check and unlock achievements
function checkAchievements() {
    const toUnlock = [];

    // Check each achievement
    if (!userData.achievements.includes('first_chapter') && userData.chaptersCompleted >= 1) {
        toUnlock.push('first_chapter');
    }
    if (!userData.achievements.includes('five_chapters') && userData.chaptersCompleted >= 5) {
        toUnlock.push('five_chapters');
    }
    if (!userData.achievements.includes('ten_chapters') && userData.chaptersCompleted >= 10) {
        toUnlock.push('ten_chapters');
    }
    if (!userData.achievements.includes('week_streak') && userData.streak >= 7) {
        toUnlock.push('week_streak');
    }
    if (!userData.achievements.includes('level_5') && userData.level >= 5) {
        toUnlock.push('level_5');
    }
    if (!userData.achievements.includes('level_10') && userData.level >= 10) {
        toUnlock.push('level_10');
    }

    // Unlock achievements
    toUnlock.forEach(id => {
        const achievement = achievements.find(a => a.id === id);
        userData.achievements.push(id);
        addXP(achievement.xp);
        showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${achievement.xp} XP`);
    });
}

// Render achievements grid
function renderAchievements() {
    const container = document.getElementById('achievementsGrid');
    container.innerHTML = '';

    achievements.forEach(achievement => {
        const isUnlocked = userData.achievements.includes(achievement.id);
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? '' : 'locked'}`;

        card.innerHTML = `
            <div class="achievement-card-icon">${achievement.icon}</div>
            <h3>${achievement.name}</h3>
            <p>${achievement.desc}</p>
            <p style="color: #667eea; font-weight: 600; margin-top: 10px;">${achievement.xp} XP</p>
        `;

        container.appendChild(card);
    });
}

// Render recent achievements
function renderRecentAchievements() {
    const container = document.getElementById('recentAchievements');
    const recent = userData.achievements.slice(-3).reverse();

    if (recent.length === 0) {
        container.innerHTML = '<p style="color: #999; font-size: 14px;">Complete chapters to unlock achievements!</p>';
        return;
    }

    container.innerHTML = recent.map(id => {
        const achievement = achievements.find(a => a.id === id);
        return `
            <div class="achievement-mini">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>+${achievement.xp} XP</p>
                </div>
            </div>
        `;
    }).join('');
}

// Goals management
function renderGoals() {
    const container = document.getElementById('todayGoals');

    if (userData.goals.length === 0) {
        container.innerHTML = '<p style="color: #999; font-size: 14px;">No goals yet. Add one to get started!</p>';
        return;
    }

    container.innerHTML = userData.goals.map((goal, index) => `
        <div class="goal-item">
            <input type="checkbox" class="goal-checkbox"
                   ${goal.completed ? 'checked' : ''}
                   onchange="toggleGoal(${index})">
            <span class="goal-text ${goal.completed ? 'completed' : ''}">${goal.text}</span>
        </div>
    `).join('');

    // Update daily goal progress
    const completed = userData.goals.filter(g => g.completed).length;
    userData.dailyGoalProgress = userData.goals.length > 0
        ? Math.round((completed / userData.goals.length) * 100)
        : 0;
}

function addGoal() {
    const goalText = prompt('Enter your study goal for today:');
    if (goalText && goalText.trim()) {
        userData.goals.push({
            text: goalText.trim(),
            completed: false,
            date: new Date().toISOString()
        });
        saveUserData();
        updateUI();
    }
}

function toggleGoal(index) {
    userData.goals[index].completed = !userData.goals[index].completed;
    if (userData.goals[index].completed) {
        addXP(20);
    }
    saveUserData();
    updateUI();
}

// Update streak
function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = userData.lastStudyDate ? new Date(userData.lastStudyDate).toDateString() : null;

    if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === yesterdayStr) {
            // Continuing streak
            userData.streak++;
        } else if (!lastDate) {
            // First day
            userData.streak = 1;
        } else {
            // Streak broken
            userData.streak = 1;
        }

        userData.lastStudyDate = new Date().toISOString();
        saveUserData();
    }
}

// Update weekly challenge
function updateWeeklyChallenge() {
    const progress = Math.min((userData.chaptersCompleted % 10) * 10, 100);
    document.getElementById('weeklyChallenge').style.width = progress + '%';
}

// Render leaderboard
function renderLeaderboard() {
    const container = document.getElementById('leaderboardTable');

    // Generate simulated leaderboard data
    const leaderboard = [
        { rank: 1, name: 'Priya Sharma', xp: userData.xp + 500, chapters: userData.chaptersCompleted + 15 },
        { rank: 2, name: 'Rahul Verma', xp: userData.xp + 200, chapters: userData.chaptersCompleted + 8 },
        { rank: 3, name: userData.name, xp: userData.xp, chapters: userData.chaptersCompleted, current: true },
        { rank: 4, name: 'Ananya Singh', xp: userData.xp - 100, chapters: userData.chaptersCompleted - 3 },
        { rank: 5, name: 'Arjun Patel', xp: userData.xp - 250, chapters: userData.chaptersCompleted - 7 }
    ];

    container.innerHTML = `
        <div class="leaderboard-row header">
            <div>Rank</div>
            <div>Name</div>
            <div>XP</div>
            <div>Chapters</div>
        </div>
        ${leaderboard.map(user => `
            <div class="leaderboard-row ${user.current ? 'current-user' : ''}">
                <div class="rank ${user.rank === 1 ? 'first' : user.rank === 2 ? 'second' : user.rank === 3 ? 'third' : ''}">#${user.rank}</div>
                <div>${user.name}${user.current ? ' (You)' : ''}</div>
                <div>${user.xp} XP</div>
                <div>${user.chapters}</div>
            </div>
        `).join('')}
    `;
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName + '-section').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Modal management
function closeModal() {
    document.getElementById('studyModal').classList.remove('show');
}

// Quiz functionality
function takeQuiz() {
    alert('Quiz feature coming soon! This will test your knowledge on completed chapters.');
}

// Review progress
function reviewProgress() {
    showSection('achievements');
}

// Show notification
function showNotification(message) {
    // Simple alert for now - can be upgraded to toast notifications
    alert(message);
}

// Toggle profile menu
function toggleProfile() {
    alert('Profile settings coming soon!');
}

// Initialize on load
window.onload = init;

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('studyModal');
    if (event.target === modal) {
        closeModal();
    }
}
