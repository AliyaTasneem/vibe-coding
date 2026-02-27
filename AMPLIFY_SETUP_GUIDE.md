# AWS Amplify Setup Guide for LearnQuest

This guide will walk you through setting up the AWS Amplify backend for LearnQuest.

## Prerequisites

- ✅ Node.js and npm installed
- ✅ Amplify CLI installed (`npm install -g @aws-amplify/cli`)
- ⏳ AWS CLI needs to be installed
- ⏳ AWS account with credentials configured

## Step 1: Install AWS CLI

### For Windows:
1. Download AWS CLI installer from: https://aws.amazon.com/cli/
2. Run the MSI installer
3. Verify installation: Open Git Bash and run `aws --version`

### Alternative (using Chocolatey):
```bash
choco install awscli
```

## Step 2: Configure AWS Credentials

Run the following command and follow the prompts:

```bash
amplify configure
```

This will:
1. Open AWS Console in your browser
2. Ask you to create an IAM user
3. Provide you with Access Key ID and Secret Access Key
4. Save these credentials locally

**Important**: Keep your AWS credentials secure and never commit them to Git!

## Step 3: Initialize Amplify Project

Navigate to your project directory and run:

```bash
cd /c/Users/atasneem/vibe-coding
amplify init
```

Answer the prompts as follows:
```
? Enter a name for the project: learnquest
? Initialize the project with the above configuration? No
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building: javascript
? What javascript framework are you using: none
? Source Directory Path: .
? Distribution Directory Path: .
? Build Command: npm run-script build
? Start Command: npm run-script start
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default
```

This will create:
- `amplify/` directory with backend configuration
- `.amplifyrc` file with project settings
- `aws-exports.js` file (don't commit this!)

## Step 4: Add Authentication (Cognito)

```bash
amplify add auth
```

Answer the prompts:
```
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Email
? Do you want to configure advanced settings? No, I am done.
```

## Step 5: Add GraphQL API (AppSync)

```bash
amplify add api
```

Answer the prompts:
```
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue: Continue
? Choose a schema template: Blank Schema
? Do you want to edit the schema now? Yes
```

When the schema file opens:
1. Copy the contents from `schema.graphql` (in project root)
2. Paste into `amplify/backend/api/learnquest/schema.graphql`
3. Save and close the file

## Step 6: Add Lambda Functions

### Function 1: Update Leaderboard (DynamoDB Stream Trigger)

```bash
amplify add function
```

Answer the prompts:
```
? Select which capability you want to add: Lambda function
? Provide an AWS Lambda function name: updateLeaderboard
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to configure advanced settings? Yes
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the categories you want this function to have access to: api, storage
? Select the operations you want to permit on learnquest: Query, Mutation
? Do you want to invoke this function on a recurring schedule? No
? Do you want to enable Lambda layers for this function? No
? Do you want to configure environment variables for this function? No
? Do you want to configure secret values this function can access? No
```

After creation:
1. Copy contents from `updateLeaderboard-lambda.js` (in project root)
2. Paste into `amplify/backend/function/updateLeaderboard/src/index.js`
3. Add DynamoDB Stream trigger manually in `amplify/backend/function/updateLeaderboard/function-parameters.json`

### Function 2: Get Leaderboard (Custom Query Resolver)

```bash
amplify add function
```

Answer the prompts:
```
? Select which capability you want to add: Lambda function
? Provide an AWS Lambda function name: getLeaderboard
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to configure advanced settings? Yes
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the categories you want this function to have access to: storage
? Do you want to invoke this function on a recurring schedule? No
? Do you want to enable Lambda layers for this function? No
? Do you want to configure environment variables for this function? No
? Do you want to configure secret values this function can access? No
```

After creation:
1. Copy contents from `getLeaderboard-lambda.js` (in project root)
2. Paste into `amplify/backend/function/getLeaderboard/src/index.js`

## Step 7: Deploy Backend

This will create all resources in AWS (takes 10-15 minutes):

```bash
amplify push
```

Review the changes:
```
? Are you sure you want to continue? Yes
? Do you want to generate code for your newly created GraphQL API? Yes
? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations? Yes
? Enter maximum statement depth: 2
```

Wait for deployment to complete. You'll see output like:
```
✔ All resources are updated in the cloud

GraphQL endpoint: https://xxxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
GraphQL API KEY: da2-xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 8: Update Frontend Configuration

After `amplify push` completes:

1. Open the generated `src/aws-exports.js` file
2. Copy the configuration values
3. Update `amplify-config.js` with these values:

```javascript
const amplifyConfig = {
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_XXXXXXXXX', // From aws-exports.js
        userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx', // From aws-exports.js
        mandatorySignIn: true,
        authenticationFlowType: 'USER_SRP_AUTH'
    },
    API: {
        GraphQL: {
            endpoint: 'https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql', // From aws-exports.js
            region: 'us-east-1',
            defaultAuthMode: 'AMAZON_COGNITO_USER_POOLS'
        }
    }
};
```

## Step 9: Enable Backend in Frontend

In `data-service.js`, change line 5 from:
```javascript
this.useBackend = false;
```
to:
```javascript
this.useBackend = true;
```

## Step 10: Configure DynamoDB Stream for Leaderboard Updates

### Manual Step in AWS Console:

1. Go to AWS Console → DynamoDB
2. Find the `QuizResult` table (name will be like `QuizResult-xxx-dev`)
3. Click on the table → "Exports and streams" tab
4. Enable "DynamoDB stream" with "New and old images"
5. Go to AWS Lambda Console
6. Find the `updateLeaderboard` function
7. Add trigger → DynamoDB → Select QuizResult table stream
8. Set "Batch size" to 1, "Starting position" to "Latest"
9. Save

## Step 11: Test Locally

1. Open `index.html` in your browser
2. You should see the login/signup modal
3. Create a test account
4. Verify email (check inbox)
5. Login and test the app

## Step 12: Deploy to Amplify Hosting

### Option A: Using Amplify Console (Recommended)

1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Choose "GitHub" as source
4. Authorize and select repository: `AliyaTasneem/vibe-coding`
5. Branch: `main`
6. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - echo "No build required - static HTML/JS"
     artifacts:
       baseDirectory: /
       files:
         - '**/*'
   ```
7. Click "Save and deploy"
8. Wait 5-10 minutes for deployment
9. Your app will be live at: `https://main.xxxxxx.amplifyapp.com`

### Option B: Using Amplify CLI

```bash
amplify add hosting
```

Choose:
```
? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual deployment
```

Then deploy:
```bash
amplify publish
```

## Troubleshooting

### Error: "Amplify CLI not found"
- Run: `npm install -g @aws-amplify/cli`
- Close and reopen terminal

### Error: "AWS credentials not configured"
- Run: `amplify configure`
- Follow the prompts to set up IAM user

### Error: "GraphQL schema validation failed"
- Check schema.graphql for syntax errors
- Ensure all field types are valid
- Make sure @model, @auth directives are correct

### Authentication not working
- Check amplify-config.js has correct values
- Verify Cognito User Pool is created in AWS Console
- Check browser console for errors

### Leaderboard not updating
- Verify DynamoDB Stream is enabled on QuizResult table
- Check Lambda function logs in CloudWatch
- Ensure Lambda has correct IAM permissions

## Useful Commands

```bash
# Check Amplify status
amplify status

# View backend details
amplify console

# Pull backend config (for new machines)
amplify pull

# Delete all resources (WARNING: This is permanent!)
amplify delete

# Add new environment
amplify env add

# Switch environment
amplify env checkout <env-name>
```

## Cost Monitoring

### Set up billing alerts:
1. Go to AWS Console → Billing
2. Click "Budgets"
3. Create budget: $5, $10, $20 thresholds
4. Add email alerts

### Expected costs:
- First month: $0-5 (should stay in free tier)
- 100-500 users: $5-15/month
- Monitor daily in first week

## Next Steps

1. ✅ Frontend integration complete
2. ⏳ Set up AWS backend (follow this guide)
3. ⏳ Test authentication and data sync
4. ⏳ Test real-time leaderboards
5. ⏳ Deploy to production
6. ⏳ Set up monitoring and backups

## Support

If you encounter issues:
1. Check Amplify CLI docs: https://docs.amplify.aws/cli/
2. Check AppSync docs: https://docs.aws.amazon.com/appsync/
3. Check CloudWatch logs for Lambda errors
4. Review this guide's troubleshooting section

---

**Remember**: Keep your AWS credentials secure and never commit `aws-exports.js` or `.amplifyrc` to public repositories!
