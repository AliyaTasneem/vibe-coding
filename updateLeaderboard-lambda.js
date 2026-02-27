// Lambda Function: Update Chapter Leaderboard
// Triggered by DynamoDB Stream on QuizResult table
// Updates the ChapterLeaderboard table with new rankings

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Environment variables (set by Amplify)
const USER_TABLE = process.env.API_LEARNQUEST_USERTABLE_NAME;
const LEADERBOARD_TABLE = process.env.API_LEARNQUEST_CHAPTERLEADERBOARDTABLE_NAME;

exports.handler = async (event) => {
    console.log('DynamoDB Stream Event:', JSON.stringify(event, null, 2));

    try {
        for (const record of event.Records) {
            // Only process INSERT and MODIFY events
            if (record.eventName === 'INSERT' || record.eventName === 'MODIFY') {
                const newImage = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

                // Extract quiz result data
                const { userId, subject, chapterNum, score, date } = newImage;

                console.log(`Processing quiz result: ${subject} Ch${chapterNum} - User ${userId} - Score ${score}%`);

                // Get user details
                const user = await getUserDetails(userId);
                if (!user) {
                    console.error(`User not found: ${userId}`);
                    continue;
                }

                // Upsert leaderboard entry
                await upsertLeaderboardEntry({
                    subjectChapter: `${subject}#${chapterNum}`,
                    userId,
                    userName: user.name,
                    level: user.level,
                    score,
                    completedAt: date
                });

                // Recalculate rankings for this chapter
                await recalculateRankings(subject, chapterNum);
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Leaderboard updated successfully' })
        };

    } catch (error) {
        console.error('Error updating leaderboard:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

// Get user details from User table
async function getUserDetails(userId) {
    try {
        const params = {
            TableName: USER_TABLE,
            Key: { userId }
        };

        const result = await dynamodb.get(params).promise();
        return result.Item;

    } catch (error) {
        console.error('Error getting user details:', error);
        return null;
    }
}

// Upsert (create or update) leaderboard entry
async function upsertLeaderboardEntry(entry) {
    try {
        const { subjectChapter, userId, userName, level, score, completedAt } = entry;

        // Check if entry already exists
        const queryParams = {
            TableName: LEADERBOARD_TABLE,
            IndexName: 'bySubjectChapter',
            KeyConditionExpression: 'subjectChapter = :sc',
            FilterExpression: 'userId = :uid',
            ExpressionAttributeValues: {
                ':sc': subjectChapter,
                ':uid': userId
            }
        };

        const existing = await dynamodb.query(queryParams).promise();

        if (existing.Items && existing.Items.length > 0) {
            // Update existing entry if new score is higher
            const existingEntry = existing.Items[0];
            if (score > existingEntry.score) {
                const updateParams = {
                    TableName: LEADERBOARD_TABLE,
                    Key: { id: existingEntry.id },
                    UpdateExpression: 'SET score = :score, #level = :level, completedAt = :completedAt, userName = :userName',
                    ExpressionAttributeNames: {
                        '#level': 'level'
                    },
                    ExpressionAttributeValues: {
                        ':score': score,
                        ':level': level,
                        ':completedAt': completedAt,
                        ':userName': userName
                    }
                };

                await dynamodb.update(updateParams).promise();
                console.log(`Updated leaderboard entry for ${userName} with higher score: ${score}%`);
            }
        } else {
            // Create new entry
            const createParams = {
                TableName: LEADERBOARD_TABLE,
                Item: {
                    id: `${userId}#${subjectChapter}`,
                    subjectChapter,
                    userId,
                    userName,
                    level,
                    score,
                    rank: 0, // Will be updated by recalculateRankings
                    completedAt,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            };

            await dynamodb.put(createParams).promise();
            console.log(`Created new leaderboard entry for ${userName} - Score: ${score}%`);
        }

    } catch (error) {
        console.error('Error upserting leaderboard entry:', error);
        throw error;
    }
}

// Recalculate rankings for a specific chapter
async function recalculateRankings(subject, chapterNum) {
    try {
        const subjectChapter = `${subject}#${chapterNum}`;

        // Query all entries for this chapter, sorted by score (descending)
        const queryParams = {
            TableName: LEADERBOARD_TABLE,
            IndexName: 'bySubjectChapter',
            KeyConditionExpression: 'subjectChapter = :sc',
            ExpressionAttributeValues: {
                ':sc': subjectChapter
            }
        };

        const result = await dynamodb.query(queryParams).promise();
        const entries = result.Items || [];

        // Sort by score (descending), then by completedAt (ascending for ties)
        entries.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return new Date(a.completedAt) - new Date(b.completedAt);
        });

        // Update ranks
        const updatePromises = entries.map((entry, index) => {
            const newRank = index + 1;
            if (entry.rank !== newRank) {
                return dynamodb.update({
                    TableName: LEADERBOARD_TABLE,
                    Key: { id: entry.id },
                    UpdateExpression: 'SET #rank = :rank, updatedAt = :updatedAt',
                    ExpressionAttributeNames: {
                        '#rank': 'rank'
                    },
                    ExpressionAttributeValues: {
                        ':rank': newRank,
                        ':updatedAt': new Date().toISOString()
                    }
                }).promise();
            }
            return Promise.resolve();
        });

        await Promise.all(updatePromises);
        console.log(`Recalculated rankings for ${subjectChapter} - ${entries.length} entries`);

    } catch (error) {
        console.error('Error recalculating rankings:', error);
        throw error;
    }
}
