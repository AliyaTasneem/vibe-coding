// GraphQL Queries, Mutations, and Subscriptions
// These are used by the data-service.js to communicate with AWS AppSync

const queries = {
    // Get user data
    getUser: `
        query GetUser($userId: ID!) {
            getUser(userId: $userId) {
                userId
                email
                name
                level
                xp
                streak
                lastStudyDate
                chaptersCompleted
                studyHours
                achievements
                goals
                createdAt
                updatedAt
                progress {
                    items {
                        userId
                        subject
                        completed
                        timeSpent
                        updatedAt
                    }
                }
            }
        }
    `,

    // Get leaderboard for a specific chapter
    getLeaderboardForChapter: `
        query GetLeaderboardForChapter($subject: String!, $chapter: Int!) {
            getLeaderboardForChapter(subject: $subject, chapter: $chapter) {
                subjectChapter
                rank
                userId
                userName
                level
                score
                completedAt
            }
        }
    `,

    // List user's quiz results
    listQuizResults: `
        query ListQuizResults($userId: ID!) {
            listQuizResults(userId: $userId) {
                items {
                    userId
                    quizId
                    subject
                    chapterNum
                    score
                    attempts
                    date
                    timeTaken
                }
            }
        }
    `,

    // Get user achievements
    listAchievements: `
        query ListAchievements($userId: ID!) {
            listAchievements(userId: $userId) {
                items {
                    userId
                    achievementId
                    unlockedAt
                    xpEarned
                }
            }
        }
    `
};

const mutations = {
    // Create or update user
    createUser: `
        mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
                userId
                email
                name
                level
                xp
                streak
                chaptersCompleted
                studyHours
                createdAt
                updatedAt
            }
        }
    `,

    updateUser: `
        mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
                userId
                email
                name
                level
                xp
                streak
                lastStudyDate
                chaptersCompleted
                studyHours
                achievements
                goals
                updatedAt
            }
        }
    `,

    // Create or update user progress
    createUserProgress: `
        mutation CreateUserProgress($input: CreateUserProgressInput!) {
            createUserProgress(input: $input) {
                userId
                subject
                completed
                timeSpent
                updatedAt
            }
        }
    `,

    updateUserProgress: `
        mutation UpdateUserProgress($input: UpdateUserProgressInput!) {
            updateUserProgress(input: $input) {
                userId
                subject
                completed
                timeSpent
                updatedAt
            }
        }
    `,

    // Create quiz result
    createQuizResult: `
        mutation CreateQuizResult($input: CreateQuizResultInput!) {
            createQuizResult(input: $input) {
                userId
                quizId
                subject
                chapterNum
                score
                attempts
                date
                timeTaken
            }
        }
    `,

    // Create achievement
    createAchievement: `
        mutation CreateAchievement($input: CreateAchievementInput!) {
            createAchievement(input: $input) {
                userId
                achievementId
                unlockedAt
                xpEarned
            }
        }
    `,

    // Create goal
    createGoal: `
        mutation CreateGoal($input: CreateGoalInput!) {
            createGoal(input: $input) {
                userId
                goalId
                text
                completed
                date
                createdAt
            }
        }
    `,

    updateGoal: `
        mutation UpdateGoal($input: UpdateGoalInput!) {
            updateGoal(input: $input) {
                userId
                goalId
                text
                completed
                date
            }
        }
    `,

    // Update chapter leaderboard (called by Lambda)
    updateChapterLeaderboard: `
        mutation UpdateChapterLeaderboard($input: UpdateChapterLeaderboardInput!) {
            updateChapterLeaderboard(input: $input) {
                subjectChapter
                rank
                userId
                userName
                level
                score
                completedAt
            }
        }
    `
};

const subscriptions = {
    // Subscribe to leaderboard updates for a specific chapter
    onLeaderboardUpdate: `
        subscription OnLeaderboardUpdate($subjectChapter: String!) {
            onLeaderboardUpdate(subjectChapter: $subjectChapter) {
                subjectChapter
                rank
                userId
                userName
                level
                score
                completedAt
            }
        }
    `,

    // Subscribe to user updates (for real-time sync across devices)
    onUpdateUser: `
        subscription OnUpdateUser($userId: ID!) {
            onUpdateUser(userId: $userId) {
                userId
                level
                xp
                streak
                chaptersCompleted
                studyHours
                achievements
                updatedAt
            }
        }
    `
};
