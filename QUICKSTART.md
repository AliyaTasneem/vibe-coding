# LearnQuest AWS Migration - Quick Start

## 🎉 Frontend Implementation Complete!

All frontend code has been implemented. The app is ready to connect to AWS backend.

---

## ✅ What's Been Done

1. **Frontend Files Created:**
   - `data-service.js` - Handles localStorage and AWS backend
   - `amplify-config.js` - AWS configuration (placeholder)
   - `graphql-queries.js` - All GraphQL operations
   - `auth-styles.css` - Authentication UI styles

2. **Files Modified:**
   - `index.html` - Added auth modal
   - `app.js` - Added async/await and authentication
   - `app-quiz.js` - Integrated backend for quizzes
   - `quiz-styles.css` - Added animations

3. **Backend Files Ready:**
   - `schema.graphql` - Database schema
   - `updateLeaderboard-lambda.js` - Leaderboard Lambda
   - `getLeaderboard-lambda.js` - Query Lambda

4. **Documentation:**
   - `AMPLIFY_SETUP_GUIDE.md` - Detailed setup instructions
   - `IMPLEMENTATION_STATUS.md` - Full progress tracking
   - `.gitignore` - Protects sensitive files

---

## 🚀 Next Steps (Do These In Order)

### Step 1: Install AWS CLI (5 minutes)

**Windows:**
```bash
# Download from: https://aws.amazon.com/cli/
# Or use Chocolatey:
choco install awscli
```

Verify:
```bash
aws --version
```

### Step 2: Configure AWS Account (10 minutes)

```bash
amplify configure
```

This will:
1. Open AWS Console
2. Create an IAM user
3. Save credentials locally

### Step 3: Initialize Amplify (5 minutes)

```bash
cd /c/Users/atasneem/vibe-coding
amplify init
```

Choose:
- Project name: `learnquest`
- Environment: `dev`
- Editor: `Visual Studio Code`
- Type: `javascript`
- Framework: `none`

### Step 4: Add Authentication (2 minutes)

```bash
amplify add auth
```

Choose:
- Default configuration
- Sign in: Email
- No advanced settings

### Step 5: Add GraphQL API (5 minutes)

```bash
amplify add api
```

Choose:
- Service: `GraphQL`
- Continue with defaults
- Schema: Copy from `schema.graphql` to `amplify/backend/api/learnquest/schema.graphql`

### Step 6: Add Lambda Functions (10 minutes)

**Function 1:**
```bash
amplify add function
# Name: updateLeaderboard
# Runtime: NodeJS
# Template: Hello World
# Access resources: Yes (api, storage)
```
Copy code from `updateLeaderboard-lambda.js` to `amplify/backend/function/updateLeaderboard/src/index.js`

**Function 2:**
```bash
amplify add function
# Name: getLeaderboard
# Runtime: NodeJS
# Template: Hello World
# Access resources: Yes (storage)
```
Copy code from `getLeaderboard-lambda.js` to `amplify/backend/function/getLeaderboard/src/index.js`

### Step 7: Deploy Backend (10-15 minutes)

```bash
amplify push
```

Choose:
- Continue: Yes
- Generate code: Yes
- Language: javascript
- Generate all operations: Yes

**☕ Take a coffee break - this takes 10-15 minutes!**

### Step 8: Update Frontend Config (3 minutes)

After `amplify push` completes:

1. Open `src/aws-exports.js` (generated file)
2. Copy the configuration values
3. Update `amplify-config.js`:

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
            endpoint: 'https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
            region: 'us-east-1',
            defaultAuthMode: 'AMAZON_COGNITO_USER_POOLS'
        }
    }
};
```

4. In `data-service.js`, line 5, change:
   ```javascript
   this.useBackend = false;
   ```
   to:
   ```javascript
   this.useBackend = true;
   ```

### Step 9: Configure DynamoDB Stream (5 minutes)

**In AWS Console:**

1. Go to DynamoDB → Tables
2. Find `QuizResult-xxx-dev` table
3. "Exports and streams" tab → Enable DynamoDB stream
4. Go to Lambda → `updateLeaderboard` function
5. Add trigger → DynamoDB → Select QuizResult stream
6. Batch size: 1, Starting position: Latest
7. Save

### Step 10: Test Locally (10 minutes)

1. Open `index.html` in browser
2. You should see login/signup modal
3. Create test account
4. Verify email (check inbox)
5. Login and test features:
   - ✅ Complete a chapter
   - ✅ Take a quiz
   - ✅ View leaderboard
   - ✅ Logout and login again
   - ✅ Data persists

### Step 11: Deploy to Amplify Hosting (15 minutes)

**Option A: Amplify Console (Recommended)**

1. Go to AWS Amplify Console
2. "New app" → "Host web app"
3. Choose "GitHub"
4. Authorize and select `AliyaTasneem/vibe-coding`
5. Branch: `main`
6. Build settings: (copy default)
7. "Save and deploy"
8. Wait 5-10 minutes
9. Get live URL: `https://main.xxxxxx.amplifyapp.com`

**Option B: CLI**

```bash
amplify add hosting
# Choose: Amplify Console
# Type: Manual deployment

amplify publish
```

### Step 12: Set Up Monitoring (5 minutes)

**Billing Alerts:**
1. AWS Console → Billing → Budgets
2. Create budget: $5, $10, $20
3. Add email alerts

**CloudWatch Alerts:**
- Lambda errors
- API Gateway 5xx
- DynamoDB throttling

---

## 📝 Checklist

Before starting:
- [ ] AWS account created
- [ ] Credit card added to AWS account
- [ ] Git repository is clean (no uncommitted changes)

Phase 1 - Backend Setup:
- [ ] AWS CLI installed
- [ ] Amplify configured
- [ ] Amplify initialized
- [ ] Authentication added
- [ ] GraphQL API added
- [ ] Lambda functions added
- [ ] Backend deployed (`amplify push`)

Phase 2 - Configuration:
- [ ] Frontend config updated (`amplify-config.js`)
- [ ] Backend enabled (`useBackend = true`)
- [ ] DynamoDB stream connected

Phase 3 - Testing:
- [ ] Local testing passed
- [ ] No console errors
- [ ] Authentication works
- [ ] Data syncs correctly
- [ ] Leaderboard updates

Phase 4 - Deployment:
- [ ] Connected to Amplify Hosting
- [ ] GitHub branch protection enabled
- [ ] Production deployed
- [ ] Billing alerts set up
- [ ] Monitoring configured

---

## ⏱️ Time Estimate

| Task | Time |
|------|------|
| AWS CLI installation | 5 min |
| AWS configuration | 10 min |
| Amplify initialization | 5 min |
| Add auth & API | 10 min |
| Add Lambda functions | 10 min |
| Deploy backend | 15 min |
| Update config | 5 min |
| Configure streams | 5 min |
| Local testing | 10 min |
| Deploy to hosting | 15 min |
| Set up monitoring | 5 min |
| **Total** | **~1.5 hours** |

---

## 💰 Expected Costs

| Service | Free Tier | Expected Cost |
|---------|-----------|---------------|
| Cognito | First 50K users | $0 |
| AppSync | 250K queries | $0-2 |
| DynamoDB | 25 GB, 200M requests | $0-1 |
| Lambda | 1M requests | $0 |
| Amplify Hosting | 1000 build minutes | $0-2 |
| **Total** | | **$0-5/month** |

Should stay in free tier for first few months with <100 users.

---

## 🆘 Troubleshooting

### "Amplify CLI not found"
```bash
npm install -g @aws-amplify/cli
# Close and reopen terminal
amplify --version
```

### "AWS credentials not configured"
```bash
amplify configure
# Follow prompts
```

### "Schema validation failed"
- Check `schema.graphql` for syntax errors
- Ensure all `@` directives are correct

### "Authentication not working"
- Verify `amplify-config.js` has correct values
- Check `useBackend = true` in `data-service.js`
- Check browser console for errors

### "Leaderboard not updating"
- Verify DynamoDB stream is enabled
- Check Lambda logs in CloudWatch
- Ensure Lambda has DynamoDB permissions

---

## 📚 Helpful Resources

- **Amplify CLI Docs:** https://docs.amplify.aws/cli/
- **AppSync Docs:** https://docs.aws.amazon.com/appsync/
- **Cognito Docs:** https://docs.aws.amazon.com/cognito/
- **Detailed Setup Guide:** See `AMPLIFY_SETUP_GUIDE.md`
- **Implementation Status:** See `IMPLEMENTATION_STATUS.md`

---

## 🎯 Success Criteria

Your migration is complete when:

✅ Users can create accounts and login
✅ Progress saves to cloud automatically
✅ Leaderboards show real rankings
✅ Data syncs across devices
✅ App is live on Amplify URL
✅ Costs stay under $5/month

---

## 🚨 Important Reminders

1. **Never commit** `aws-exports.js` or AWS credentials to Git
2. **Set up billing alerts** before deploying
3. **Test thoroughly** before sharing with users
4. **Monitor costs** daily in first week
5. **Keep Amplify CLI updated** regularly

---

## ✨ What Happens After Setup

Once backend is deployed:

1. **Users see login screen** when opening app
2. **Sign up process** includes email verification
3. **Progress saves automatically** after each action
4. **Leaderboards update** in real-time
5. **Works across devices** seamlessly

---

## 🎉 You're Ready!

Start with Step 1 and follow in order. Each step takes 5-15 minutes.

**Total time: ~1.5 hours**

Good luck! 🚀

---

**Questions?** Check `AMPLIFY_SETUP_GUIDE.md` for detailed instructions.
