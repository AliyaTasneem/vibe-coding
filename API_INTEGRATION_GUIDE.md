

# API Integration Guide for LearnQuest Quiz System

## Overview

LearnQuest now includes a complete quiz system with automatic grading. The platform supports both local question banks and external API integration for fetching CBSE questions.

## Current Status

### ✅ Implemented Features:
1. **Complete Quiz System**
   - Multiple choice questions
   - Automatic grading
   - 80% minimum passing score
   - Question randomization
   - Answer review with explanations
   - Timer tracking
   - Score history

2. **Sample Questions**
   - Mathematics: Chapters 1, 2, 4 (15 questions)
   - Science: Chapters 1, 6, 12 (15 questions)
   - English: Chapters 1, 3 (10 questions)
   - Social Science: Chapters 1, 13 (10 questions)

3. **Gamification**
   - Base XP: 50 per completed chapter
   - Bonus XP: +25 for 100% score, +15 for 90%+
   - Achievements unlock based on quiz performance
   - Can only complete chapters by passing quizzes

## API Integration

### How to Enable API

Edit `questions.js` file:

```javascript
const API_CONFIG = {
    enabled: true, // Change to true
    endpoint: 'YOUR_API_ENDPOINT',
    apiKey: 'YOUR_API_KEY'
};
```

### API Requirements

Your API should return questions in this format:

```json
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correct": 2,
      "explanation": "Paris is the capital and largest city of France."
    }
  ]
}
```

### API Endpoint Structure

```
GET /cbse-questions?subject={subject}&chapter={chapter}

Parameters:
- subject: mathematics|science|english|hindi|socialScience
- chapter: 1-24 (depends on subject)

Headers:
- Authorization: Bearer {API_KEY}
- Content-Type: application/json
```

## Recommended CBSE Question APIs

### 1. **DIKSHA Platform API** (Official NCERT)
- Website: https://diksha.gov.in/
- Provides official NCERT content
- May require partnership/authorization

### 2. **OpenStax**
- Website: https://openstax.org/
- Free educational resources
- API: https://openstax.org/api/

### 3. **Khan Academy** (Limited)
- Website: https://www.khanacademy.org/
- Some content available via API
- Focus on math and science

### 4. **Custom Solutions**

If no public API exists, consider:

#### Option A: Build Your Own Question Bank
- Use the existing `questions.js` structure
- Manually add questions from NCERT textbooks
- Community contribution model

#### Option B: Web Scraping (Legal Considerations)
- Scrape from educational websites
- Ensure copyright compliance
- Use only for personal/educational use

#### Option C: AI-Generated Questions
- Use ChatGPT/Claude API to generate questions
- Based on NCERT chapter summaries
- Requires validation by educators

## Adding Questions Manually

### Step 1: Open `questions.js`

### Step 2: Add to the question bank

```javascript
const questionBank = {
    mathematics: {
        5: [ // Chapter 5 - Arithmetic Progressions
            {
                question: "What is an arithmetic progression?",
                options: [
                    "A sequence with constant difference",
                    "A geometric sequence",
                    "A random sequence",
                    "None of the above"
                ],
                correct: 0,
                explanation: "An AP has constant difference between terms."
            }
            // Add 4-9 more questions...
        ]
    }
};
```

### Minimum Requirements
- **At least 5 questions per chapter** to enable quiz
- Each question must have:
  - `question`: The question text
  - `options`: Array of 4 options
  - `correct`: Index of correct answer (0-3)
  - `explanation`: Why the answer is correct

## Testing the Quiz System

### Local Testing
1. Open `index.html` in browser
2. Click "Start Study Session" or "Take Quiz"
3. Select a subject and chapter
4. Take the quiz
5. Score must be ≥80% to complete chapter

### API Testing
```javascript
// Test in browser console
async function testAPI() {
    const questions = await getQuestionsForChapter('mathematics', 1);
    console.log(questions);
}
testAPI();
```

## Question Quality Guidelines

### Good Questions:
✅ Clear and unambiguous
✅ Based directly on NCERT content
✅ Age-appropriate language
✅ One clearly correct answer
✅ Plausible distractors
✅ Include explanation

### Avoid:
❌ Trick questions
❌ Opinion-based questions
❌ Overly complex language
❌ Multiple correct answers
❌ Questions beyond NCERT scope

## Scoring System

| Score | Result | XP Earned |
|-------|--------|-----------|
| 100% | Perfect! | 75 XP |
| 90-99% | Excellent | 65 XP |
| 80-89% | Good | 50 XP |
| 70-79% | Failed | 0 XP |
| <70% | Failed | 0 XP |

**Passing Score:** 80%
**Retake Policy:** Unlimited attempts allowed

## Future Enhancements

### Planned Features:
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Timed quizzes (optional)
- [ ] Question categories (Understanding, Application, Analysis)
- [ ] Peer question submission
- [ ] Teacher dashboard for adding questions
- [ ] Image support in questions
- [ ] Math equation rendering (LaTeX)
- [ ] Detailed analytics per topic

### API Enhancements:
- [ ] Caching system for offline use
- [ ] Question quality rating
- [ ] Report incorrect questions
- [ ] Community-contributed questions
- [ ] Multi-language support

## Parent Monitoring

### View Progress:
```javascript
// Open browser console on LearnQuest page
console.log(userData.quizResults);
```

This shows:
- All quiz attempts
- Scores achieved
- Date completed
- Number of attempts per chapter

## Support & Contribution

### Adding Questions
To contribute questions:
1. Follow the format in `questions.js`
2. Test thoroughly
3. Ensure NCERT alignment
4. Submit via pull request (if using Git)

### Reporting Issues
- Incorrect answers
- Typos
- Technical bugs
- Feature requests

## License & Copyright

**Important:**
- NCERT content is copyrighted
- Questions must be original or properly sourced
- Educational fair use applies
- Commercial use may require licensing
- Always credit sources

---

## Quick Start Checklist

- [x] Quiz system installed
- [x] Sample questions loaded
- [ ] API configured (optional)
- [ ] All chapters have questions
- [ ] Tested on target device
- [ ] Parent access configured
- [ ] Backup system in place

---

**Last Updated:** February 21, 2026
**Version:** 2.0 (Quiz System)
