// Quiz System Extension for LearnQuest
// This file contains all quiz-related functionality

// Quiz state
let currentQuiz = {
    subject: null,
    chapter: null,
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
    score: 0,
    startTime: null,
    endTime: null
};

const PASSING_SCORE = 80; // Minimum 80% to pass
const MIN_QUESTIONS = 5; // Minimum questions per quiz

// Start a quiz for a chapter
async function startQuiz(subjectKey, chapterNum) {
    const subject = subjects[subjectKey];

    // Load questions
    const questions = await getQuestionsForChapter(subjectKey, chapterNum);

    if (!questions || questions.length < MIN_QUESTIONS) {
        alert('Not enough questions available for this chapter yet. Please check back later or study from NCERT textbook.');
        return;
    }

    // Initialize quiz state
    currentQuiz = {
        subject: subjectKey,
        chapter: chapterNum,
        questions: shuffleArray([...questions]), // Randomize questions
        currentQuestion: 0,
        userAnswers: new Array(questions.length).fill(null),
        score: 0,
        startTime: new Date(),
        endTime: null
    };

    // Show quiz modal
    showQuizModal();
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Show quiz modal
function showQuizModal() {
    const modal = document.getElementById('studyModal');
    const modalBody = document.getElementById('modalBody');
    const subject = subjects[currentQuiz.subject];
    const chapterName = subject.topics[currentQuiz.chapter - 1];

    modalBody.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>${subject.name} - Chapter ${currentQuiz.chapter}</h3>
                <p>${chapterName}</p>
                <div class="quiz-progress">
                    <span>Question <span id="currentQ">${currentQuiz.currentQuestion + 1}</span> of ${currentQuiz.questions.length}</span>
                    <span class="quiz-timer" id="quizTimer">00:00</span>
                </div>
            </div>
            <div class="quiz-body" id="quizBody"></div>
            <div class="quiz-navigation">
                <button class="quiz-btn secondary" onclick="previousQuestion()" id="prevBtn">Previous</button>
                <button class="quiz-btn primary" onclick="nextQuestion()" id="nextBtn">Next</button>
                <button class="quiz-btn success" onclick="submitQuiz()" id="submitBtn" style="display: none;">Submit Quiz</button>
            </div>
        </div>
    `;

    modal.classList.add('show');
    renderQuestion();
    startQuizTimer();
}

// Render current question
function renderQuestion() {
    const quizBody = document.getElementById('quizBody');
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const questionNum = currentQuiz.currentQuestion;

    quizBody.innerHTML = `
        <div class="question-card">
            <h4 class="question-text">Q${questionNum + 1}. ${question.question}</h4>
            <div class="options-list">
                ${question.options.map((option, index) => `
                    <div class="option-item ${currentQuiz.userAnswers[questionNum] === index ? 'selected' : ''}"
                         onclick="selectAnswer(${index})">
                        <div class="option-radio ${currentQuiz.userAnswers[questionNum] === index ? 'checked' : ''}"></div>
                        <span class="option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update navigation buttons
    document.getElementById('prevBtn').style.display = questionNum === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = questionNum === currentQuiz.questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = questionNum === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('currentQ').textContent = questionNum + 1;
}

// Select an answer
function selectAnswer(optionIndex) {
    currentQuiz.userAnswers[currentQuiz.currentQuestion] = optionIndex;
    renderQuestion();
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuiz.currentQuestion > 0) {
        currentQuiz.currentQuestion--;
        renderQuestion();
    }
}

// Navigate to next question
function nextQuestion() {
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestion++;
        renderQuestion();
    }
}

// Quiz timer
let quizTimerInterval;
function startQuizTimer() {
    quizTimerInterval = setInterval(() => {
        const elapsed = Math.floor((new Date() - currentQuiz.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('quizTimer').textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopQuizTimer() {
    if (quizTimerInterval) {
        clearInterval(quizTimerInterval);
    }
}

// Submit quiz and calculate score
function submitQuiz() {
    // Check if all questions are answered
    const unanswered = currentQuiz.userAnswers.filter(a => a === null).length;

    if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
            return;
        }
    }

    stopQuizTimer();
    currentQuiz.endTime = new Date();

    // Calculate score
    let correct = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (currentQuiz.userAnswers[index] === question.correct) {
            correct++;
        }
    });

    currentQuiz.score = Math.round((correct / currentQuiz.questions.length) * 100);

    // Show results
    showQuizResults(correct);
}

// Show quiz results
function showQuizResults(correctCount) {
    const modalBody = document.getElementById('modalBody');
    const subject = subjects[currentQuiz.subject];
    const chapterName = subject.topics[currentQuiz.chapter - 1];
    const passed = currentQuiz.score >= PASSING_SCORE;
    const timeTaken = Math.floor((currentQuiz.endTime - currentQuiz.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    modalBody.innerHTML = `
        <div class="quiz-results">
            <div class="result-icon ${passed ? 'pass' : 'fail'}">
                ${passed ? '🎉' : '😔'}
            </div>
            <h2>${passed ? 'Congratulations!' : 'Keep Trying!'}</h2>
            <p class="result-message">
                ${passed
                    ? 'You passed the quiz! Chapter completed.'
                    : `You need ${PASSING_SCORE}% to pass. Try again after revising.`}
            </p>

            <div class="score-display">
                <div class="score-circle ${passed ? 'pass' : 'fail'}">
                    <span class="score-number">${currentQuiz.score}%</span>
                </div>
            </div>

            <div class="result-stats">
                <div class="stat-item">
                    <span class="stat-label">Correct Answers</span>
                    <span class="stat-value">${correctCount} / ${currentQuiz.questions.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Time Taken</span>
                    <span class="stat-value">${minutes}m ${seconds}s</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Passing Score</span>
                    <span class="stat-value">${PASSING_SCORE}%</span>
                </div>
            </div>

            <div class="result-actions">
                ${passed ? `
                    <button class="quiz-btn success" onclick="completeChapter()">
                        Complete Chapter & Earn XP
                    </button>
                ` : `
                    <button class="quiz-btn primary" onclick="retakeQuiz()">
                        Retry Quiz
                    </button>
                `}
                <button class="quiz-btn secondary" onclick="reviewAnswers()">
                    Review Answers
                </button>
                <button class="quiz-btn tertiary" onclick="closeModal()">
                    Close
                </button>
            </div>
        </div>
    `;
}

// Review answers with explanations
function reviewAnswers() {
    const modalBody = document.getElementById('modalBody');
    const subject = subjects[currentQuiz.subject];

    let html = `
        <div class="answer-review">
            <h3>Answer Review</h3>
            <div class="review-list">
    `;

    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = currentQuiz.userAnswers[index];
        const isCorrect = userAnswer === question.correct;

        html += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-header">
                    <span class="review-number">Q${index + 1}</span>
                    <span class="review-status">${isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>
                </div>
                <p class="review-question">${question.question}</p>

                <div class="review-answers">
                    ${question.options.map((option, optIndex) => {
                        let className = '';
                        if (optIndex === question.correct) {
                            className = 'correct-answer';
                        } else if (optIndex === userAnswer && !isCorrect) {
                            className = 'wrong-answer';
                        }
                        return `
                            <div class="review-option ${className}">
                                ${option}
                                ${optIndex === question.correct ? ' ✓' : ''}
                                ${optIndex === userAnswer && !isCorrect ? ' ✗' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                ${question.explanation ? `
                    <div class="review-explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += `
            </div>
            <button class="quiz-btn primary" onclick="closeModal()">Close</button>
        </div>
    `;

    modalBody.innerHTML = html;
}

// Retake quiz
function retakeQuiz() {
    startQuiz(currentQuiz.subject, currentQuiz.chapter);
}

// Complete chapter after passing quiz
async function completeChapter() {
    const subject = subjects[currentQuiz.subject];
    const progress = userData.subjectProgress[currentQuiz.subject];
    const chapterNum = currentQuiz.chapter;

    if (progress.completed.includes(chapterNum)) {
        alert('You\'ve already completed this chapter!');
        closeModal();
        return;
    }

    // Mark chapter as completed
    progress.completed.push(chapterNum);
    userData.chaptersCompleted++;
    userData.studyHours += 1;

    // Calculate XP based on performance
    const baseXP = 50;
    const bonusXP = currentQuiz.score === 100 ? 25 : currentQuiz.score >= 90 ? 15 : 0;
    const totalXP = baseXP + bonusXP;

    addXP(totalXP);

    // Save quiz result
    if (!userData.quizResults) {
        userData.quizResults = {};
    }
    if (!userData.quizResults[currentQuiz.subject]) {
        userData.quizResults[currentQuiz.subject] = {};
    }
    userData.quizResults[currentQuiz.subject][chapterNum] = {
        score: currentQuiz.score,
        attempts: (userData.quizResults[currentQuiz.subject][chapterNum]?.attempts || 0) + 1,
        date: new Date().toISOString()
    };

    // Save quiz result to backend
    const timeTaken = Math.floor((currentQuiz.endTime - currentQuiz.startTime) / 1000);
    await dataService.saveQuizResult(currentQuiz.subject, chapterNum, currentQuiz.score, timeTaken);

    // Check achievements
    checkAchievements();

    // Save and update
    await saveUserData();
    updateUI();
    closeModal();

    // Show success notification
    showNotification(`🎉 Chapter completed! Earned ${totalXP} XP${bonusXP > 0 ? ` (+ ${bonusXP} bonus!)` : ''}`);
}

// Update the chapter start function to show quiz option
function startChapter(subjectKey, chapterNum) {
    const subject = subjects[subjectKey];
    const progress = userData.subjectProgress[subjectKey];
    const chapterName = subject.topics[chapterNum - 1];

    if (progress.completed.includes(chapterNum)) {
        // Already completed, offer to retake quiz
        if (confirm(`You've already completed this chapter. Would you like to retake the quiz?`)) {
            startQuiz(subjectKey, chapterNum);
        }
        return;
    }

    // Show study options
    const modal = document.getElementById('studyModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="chapter-study">
            <h3>${subject.name}</h3>
            <h4>Chapter ${chapterNum}: ${chapterName}</h4>

            <div class="study-options">
                <div class="study-option-card">
                    <div class="option-icon">📖</div>
                    <h4>Read NCERT</h4>
                    <p>Study from the official NCERT textbook</p>
                    <button class="quiz-btn primary" onclick="openNCERT('${subjectKey}'); closeModal();">
                        Open Textbook
                    </button>
                </div>

                <div class="study-option-card">
                    <div class="option-icon">📝</div>
                    <h4>Take Quiz</h4>
                    <p>Test your knowledge and complete the chapter</p>
                    <button class="quiz-btn success" onclick="startQuiz('${subjectKey}', ${chapterNum})">
                        Start Quiz
                    </button>
                </div>
            </div>

            <div class="study-info">
                <p><strong>Note:</strong> You need to score at least ${PASSING_SCORE}% in the quiz to complete this chapter and earn XP!</p>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

// Quick quiz button functionality
function takeQuiz() {
    const modal = document.getElementById('studyModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <p style="margin-bottom: 20px;">Select a subject and chapter for your quiz:</p>
        <select id="subjectSelect" class="subject-select" onchange="loadChaptersForQuiz()">
            <option value="">Choose a subject...</option>
            ${Object.keys(subjects).map(key =>
                `<option value="${key}">${subjects[key].name}</option>`
            ).join('')}
        </select>
        <div id="chapterList"></div>
    `;

    modal.classList.add('show');
}

// Load chapters for quiz
function loadChaptersForQuiz() {
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
            const quizResult = userData.quizResults?.[subjectKey]?.[chapterNum];

            return `
                <div class="chapter-item quiz-item" onclick="startChapter('${subjectKey}', ${chapterNum})">
                    <div>
                        ${isCompleted ? '✅' : '📝'} Chapter ${chapterNum}: ${topic}
                        ${quizResult ? `<br><small style="color: #667eea;">Best Score: ${quizResult.score}%</small>` : ''}
                    </div>
                </div>
            `;
        }).join('') +
        '</div>';
}
