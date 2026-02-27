// Data Service - Abstraction layer for localStorage and AWS backend
// This service provides a unified interface for data operations

class DataService {
    constructor() {
        // Toggle between localStorage and backend (set to true after backend is deployed)
        this.useBackend = false;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        if (this.useBackend && typeof Amplify !== 'undefined') {
            try {
                // Configure Amplify with the exported config
                Amplify.configure(amplifyConfig);
                this.isInitialized = true;
                console.log('DataService initialized with AWS backend');
            } catch (error) {
                console.error('Failed to initialize Amplify:', error);
                this.useBackend = false;
            }
        }

        this.isInitialized = true;
    }

    // Load user data
    async loadUserData() {
        if (this.useBackend) {
            return await this.loadFromBackend();
        } else {
            return this.loadFromLocalStorage();
        }
    }

    // Load from localStorage (existing method)
    loadFromLocalStorage() {
        const saved = localStorage.getItem('learnquest_user');
        if (saved) {
            return JSON.parse(saved);
        }
        return null;
    }

    // Load from AWS backend
    async loadFromBackend() {
        try {
            const { Auth, API } = Amplify;

            // Get current user
            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;

            // Query user data
            const userData = await API.graphql({
                query: queries.getUser,
                variables: { userId }
            });

            if (!userData.data.getUser) {
                // User doesn't exist in backend yet, return default structure
                return this.getDefaultUserData(user.attributes.name || 'Student');
            }

            // Transform backend data to frontend format
            return this.transformBackendToFrontend(userData.data.getUser);

        } catch (error) {
            console.error('Error loading from backend:', error);
            // Fall back to localStorage
            return this.loadFromLocalStorage();
        }
    }

    // Save user data
    async saveUserData(userData) {
        // Always save to localStorage for offline support
        this.saveToLocalStorage(userData);

        // Also save to backend if enabled
        if (this.useBackend) {
            await this.saveToBackend(userData);
        }
    }

    // Save to localStorage (existing method)
    saveToLocalStorage(userData) {
        localStorage.setItem('learnquest_user', JSON.stringify(userData));
    }

    // Save to AWS backend
    async saveToBackend(userData) {
        try {
            const { Auth, API } = Amplify;

            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;

            // Transform frontend data to backend format
            const backendData = this.transformFrontendToBackend(userData, userId);

            // Update user data
            await API.graphql({
                query: mutations.updateUser,
                variables: { input: backendData.user }
            });

            // Update progress for each subject
            for (const [subjectKey, progress] of Object.entries(userData.subjectProgress)) {
                await API.graphql({
                    query: mutations.updateUserProgress,
                    variables: {
                        input: {
                            userId,
                            subject: subjectKey,
                            completed: progress.completed,
                            timeSpent: progress.timeSpent,
                            updatedAt: new Date().toISOString()
                        }
                    }
                });
            }

            console.log('Data saved to backend successfully');

        } catch (error) {
            console.error('Error saving to backend:', error);
            // Don't throw - localStorage save already succeeded
        }
    }

    // Save quiz result
    async saveQuizResult(subjectKey, chapterNum, score, timeTaken) {
        if (!this.useBackend) return;

        try {
            const { Auth, API } = Amplify;

            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;

            const quizId = `${subjectKey}#${chapterNum}#${Date.now()}`;

            await API.graphql({
                query: mutations.createQuizResult,
                variables: {
                    input: {
                        userId,
                        quizId,
                        subject: subjectKey,
                        chapterNum,
                        score,
                        timeTaken,
                        date: new Date().toISOString()
                    }
                }
            });

            console.log('Quiz result saved to backend');

        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    }

    // Migrate localStorage data to backend
    async migrateLocalDataToBackend() {
        try {
            const localData = this.loadFromLocalStorage();
            if (!localData) {
                throw new Error('No local data found to migrate');
            }

            const { Auth, API } = Amplify;
            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;

            // Check if backend data already exists
            const existingData = await API.graphql({
                query: queries.getUser,
                variables: { userId }
            });

            if (existingData.data.getUser && existingData.data.getUser.chaptersCompleted > 0) {
                const overwrite = confirm(
                    'You already have data in the cloud. Do you want to overwrite it with your local data? ' +
                    'This action cannot be undone.'
                );
                if (!overwrite) return false;
            }

            // Upload all local data
            await this.saveToBackend(localData);

            // Backup localStorage data
            const backup = JSON.stringify(localData, null, 2);
            const blob = new Blob([backup], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `learnquest-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            return true;

        } catch (error) {
            console.error('Error migrating data:', error);
            throw error;
        }
    }

    // Transform backend data to frontend format
    transformBackendToFrontend(backendUser) {
        return {
            name: backendUser.name,
            level: backendUser.level,
            xp: backendUser.xp,
            streak: backendUser.streak,
            lastStudyDate: backendUser.lastStudyDate,
            chaptersCompleted: backendUser.chaptersCompleted,
            studyHours: backendUser.studyHours,
            achievements: backendUser.achievements || [],
            subjectProgress: this.transformBackendProgress(backendUser.progress),
            goals: backendUser.goals || [],
            dailyGoalProgress: this.calculateDailyGoalProgress(backendUser.goals || []),
            quizResults: backendUser.quizResults || {}
        };
    }

    // Transform backend progress to frontend format
    transformBackendProgress(backendProgress) {
        const progress = {};

        if (!backendProgress || !backendProgress.items) {
            // Initialize empty progress for all subjects
            const subjects = ['mathematics', 'science', 'english', 'hindi', 'socialScience'];
            subjects.forEach(subject => {
                progress[subject] = {
                    completed: [],
                    inProgress: null,
                    timeSpent: 0
                };
            });
            return progress;
        }

        backendProgress.items.forEach(item => {
            progress[item.subject] = {
                completed: item.completed || [],
                inProgress: null,
                timeSpent: item.timeSpent || 0
            };
        });

        return progress;
    }

    // Transform frontend data to backend format
    transformFrontendToBackend(userData, userId) {
        return {
            user: {
                userId,
                email: userData.email || '',
                name: userData.name,
                level: userData.level,
                xp: userData.xp,
                streak: userData.streak,
                lastStudyDate: userData.lastStudyDate,
                chaptersCompleted: userData.chaptersCompleted,
                studyHours: userData.studyHours,
                achievements: userData.achievements,
                goals: userData.goals,
                updatedAt: new Date().toISOString()
            }
        };
    }

    // Calculate daily goal progress
    calculateDailyGoalProgress(goals) {
        if (goals.length === 0) return 0;
        const completed = goals.filter(g => g.completed).length;
        return Math.round((completed / goals.length) * 100);
    }

    // Get default user data structure
    getDefaultUserData(name) {
        return {
            name,
            level: 1,
            xp: 0,
            streak: 0,
            lastStudyDate: null,
            chaptersCompleted: 0,
            studyHours: 0,
            achievements: [],
            subjectProgress: {
                mathematics: { completed: [], inProgress: null, timeSpent: 0 },
                science: { completed: [], inProgress: null, timeSpent: 0 },
                english: { completed: [], inProgress: null, timeSpent: 0 },
                hindi: { completed: [], inProgress: null, timeSpent: 0 },
                socialScience: { completed: [], inProgress: null, timeSpent: 0 }
            },
            goals: [],
            dailyGoalProgress: 0,
            quizResults: {}
        };
    }

    // Get leaderboard for a specific chapter
    async getLeaderboard(subject, chapter) {
        if (!this.useBackend) {
            // Return simulated leaderboard for localStorage mode
            return this.getSimulatedLeaderboard();
        }

        try {
            const { API } = Amplify;

            const result = await API.graphql({
                query: queries.getLeaderboardForChapter,
                variables: { subject, chapter: parseInt(chapter) }
            });

            return result.data.getLeaderboardForChapter || [];

        } catch (error) {
            console.error('Error loading leaderboard:', error);
            return this.getSimulatedLeaderboard();
        }
    }

    // Generate simulated leaderboard
    getSimulatedLeaderboard() {
        // This is used in localStorage mode
        return [
            { rank: 1, name: 'Priya Sharma', xp: 2500, chapters: 25, level: 3 },
            { rank: 2, name: 'Rahul Verma', xp: 2200, chapters: 20, level: 3 },
            { rank: 3, name: 'Ananya Singh', xp: 1800, chapters: 18, level: 2 },
            { rank: 4, name: 'Arjun Patel', xp: 1500, chapters: 15, level: 2 },
            { rank: 5, name: 'Sneha Kumar', xp: 1200, chapters: 12, level: 2 }
        ];
    }

    // Subscribe to leaderboard updates
    subscribeToLeaderboard(subject, chapter, callback) {
        if (!this.useBackend) return null;

        try {
            const { API } = Amplify;

            const subscription = API.graphql({
                query: subscriptions.onLeaderboardUpdate,
                variables: { subjectChapter: `${subject}#${chapter}` }
            }).subscribe({
                next: (data) => {
                    const update = data.value.data.onLeaderboardUpdate;
                    callback(update);
                },
                error: (error) => {
                    console.error('Subscription error:', error);
                }
            });

            // Auto-unsubscribe after 5 minutes to save costs
            setTimeout(() => {
                subscription.unsubscribe();
                console.log('Leaderboard subscription ended after 5 minutes');
            }, 300000);

            return subscription;

        } catch (error) {
            console.error('Error subscribing to leaderboard:', error);
            return null;
        }
    }
}

// Create singleton instance
const dataService = new DataService();
