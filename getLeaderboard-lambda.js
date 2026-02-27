// Lambda Function: Get Leaderboard for Chapter
// Custom resolver for getLeaderboardForChapter query
// Returns sorted leaderboard entries for a specific subject and chapter

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Environment variables (set by Amplify)
const LEADERBOARD_TABLE = process.env.API_LEARNQUEST_CHAPTERLEADERBOARDTABLE_NAME;

exports.handler = async (event) => {
    console.log('Get Leaderboard Event:', JSON.stringify(event, null, 2));

    try {
        const { subject, chapter } = event.arguments;
        const subjectChapter = `${subject}#${chapter}`;

        console.log(`Fetching leaderboard for: ${subjectChapter}`);

        // Query leaderboard entries for this chapter
        const queryParams = {
            TableName: LEADERBOARD_TABLE,
            IndexName: 'bySubjectChapter',
            KeyConditionExpression: 'subjectChapter = :sc',
            ExpressionAttributeValues: {
                ':sc': subjectChapter
            },
            Limit: 100 // Limit to top 100 entries
        };

        const result = await dynamodb.query(queryParams).promise();
        const entries = result.Items || [];

        // Sort by rank (should already be sorted, but ensure it)
        entries.sort((a, b) => a.rank - b.rank);

        // Take top 50 entries for performance
        const topEntries = entries.slice(0, 50);

        console.log(`Found ${topEntries.length} leaderboard entries for ${subjectChapter}`);

        return topEntries;

    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};
