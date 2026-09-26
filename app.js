// ======================================================
// MHT-CET 2027 PRACTICE PORTAL
// Exam-style PCM Mock Test Engine
// ======================================================

let currentTest = null;
let currentSection = "physics";
let currentPhase = "pc"; // pc = Physics + Chemistry, math = Mathematics
let currentQuestionIndex = {
    physics: 0,
    chemistry: 0,
    mathematics: 0
};

let timerInterval = null;
let remainingSeconds = 90 * 60;

// ------------------------------------------------------
// BASIC HELPERS
// ------------------------------------------------------

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function getQuestionsBySubject(subject) {
    return questionBank.filter(q => q.subject === subject);
}

function getMixedQuestions(subject, count) {
    const all = getQuestionsBySubject(subject);

    const easy = shuffle(all.filter(q => q.difficulty === "Easy"));
    const medium = shuffle(all.filter(q => q.difficulty === "Medium"));
    const hard = shuffle(all.filter(q => q.difficulty === "Hard"));

    const selected = [
        ...easy.slice(0, Math.ceil(count / 3)),
        ...medium.slice(0, Math.ceil(count / 3)),
        ...hard.slice(0, Math.floor(count / 3))
    ];

    return shuffle(selected).slice(0, count);
}

// ------------------------------------------------------
// DASHBOARD
// ------------------------------------------------------

function showDashboard() {
    stopTimer();

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="dashboard">
            <h1>MHT-CET 2027 Practice Portal</h1>

            <div class="dashboard-grid">

                <button onclick="showSubjects()">
                    📚 Chapter Practice
                </button>

                <button onclick="showMockTests()">
                    📝 Full Mock Tests
                </button>

                <button onclick="showPYQTests()">
                    📄 PYQ Tests
                </button>

                <button onclick="showPerformance()">
                    📊 Performance
                </button>

            </div>
        </div>
    `;
}

// ------------------------------------------------------
// SUBJECTS
// ------------------------------------------------------

function showSubjects() {
    stopTimer();

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="page">

            <button onclick="showDashboard()">← Back</button>

            <h1>Chapter Practice</h1>

            <div class="subject-buttons">
                <button onclick="showChapters('Physics')">
                    Physics
                </button>

                <button onclick="showChapters('Chemistry')">
                    Chemistry
                </button>

                <button onclick="showChapters('Mathematics')">
                    Mathematics
                </button>
            </div>

        </div>
    `;
}

// ------------------------------------------------------
// CHAPTERS
// ------------------------------------------------------

function showChapters(subject) {
    const app = document.getElementById("app");

    const chapters = chapterCatalog.filter(
        c => c.subject === subject
    );

    app.innerHTML = `
        <div class="page">

            <button onclick="showSubjects()">← Back</button>

            <h1>${subject}</h1>

            <div class="chapter-grid">

                ${chapters.map(chapter => `
                    <button
                        onclick="startChapterPractice('${subject}', '${chapter.name.replace(/'/g, "\\'")}')"
                    >
                        ${chapter.name}
                        <small>30 Questions</small>
                    </button>
                `).join("")}

            </div>

        </div>
    `;
}

// ------------------------------------------------------
// CHAPTER PRACTICE
// ------------------------------------------------------

function startChapterPractice(subject, chapter) {

    const questions = questionBank.filter(
        q =>
            q.subject === subject &&
            q.chapter === chapter
    );

    if (!questions.length) {
        alert("No questions available for this chapter yet.");
        return;
    }

    let index = 0;
    let answers = {};

    function render() {

        const q = questions[index];

        document.getElementById("app").innerHTML = `
            <div class="practice-page">

                <div class="top-bar">
                    <button onclick="showChapters('${subject}')">
                        ← Back
                    </button>

                    <span>
                        ${index + 1} / ${questions.length}
                    </span>
                </div>

                <h2>${chapter}</h2>

                <div class="question-card">

                    <p class="question-number">
                        Question ${index + 1}
                    </p>

                    <h3>${q.question}</h3>

                    <div class="options">

                        ${q.options.map((option, i) => `
                            <button
                                class="${answers[q.id] === i ? "selected" : ""}"
                                onclick="selectPracticeAnswer(${i})"
                            >
                                ${String.fromCharCode(65 + i)}.
                                ${option}
                            </button>
                        `).join("")}

                    </div>

                    <div class="navigation">

                        <button
                            onclick="previousPractice()"
                            ${index === 0 ? "disabled" : ""}
                        >
                            Previous
                        </button>

                        <button onclick="nextPractice()">
                            ${index === questions.length - 1
                                ? "Finish"
                                : "Next"}
                        </button>

                    </div>

                </div>
            </div>
        `;

        window.selectPracticeAnswer = function(i) {
            answers[q.id] = i;
            render();
        };

        window.previousPractice = function() {
            if (index > 0) {
                index--;
                render();
            }
        };

        window.nextPractice = function() {

            if (index < questions.length - 1) {
                index++;
                render();
            } else {
                showPracticeResult(
                    questions,
                    answers,
                    subject,
                    chapter
                );
            }
        };
    }

    render();
}

// ------------------------------------------------------
// PRACTICE RESULT
// ------------------------------------------------------

function showPracticeResult(
    questions,
    answers,
    subject,
    chapter
) {

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach(q => {

        if (answers[q.id] === undefined) {
            unanswered++;
        } else if (
            answers[q.id] === q.answer
        ) {
            correct++;
        } else {
            wrong++;
        }

    });

    document.getElementById("app").innerHTML = `

        <div class="result-page">

            <h1>Practice Complete 🎉</h1>

            <h2>${chapter}</h2>

            <div class="result-card">

                <p>Correct: <strong>${correct}</strong></p>
                <p>Wrong: <strong>${wrong}</strong></p>
                <p>Unanswered: <strong>${unanswered}</strong></p>

                <h2>
                    Score: ${correct} / ${questions.length}
                </h2>

            </div>

            <button onclick="showChapters('${subject}')">
                Practice Again
            </button>

            <button onclick="showDashboard()">
                Dashboard
            </button>

        </div>
    `;
}

// ======================================================
// MOCK TEST LIST
// ======================================================

function showMockTests() {

    stopTimer();

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="page">

            <button onclick="showDashboard()">← Back</button>

            <h1>MHT-CET Full Mock Tests</h1>

            <div class="mock-info">

                <p><strong>150 Questions</strong></p>
                <p><strong>200 Marks</strong></p>
                <p><strong>180 Minutes</strong></p>
                <p>No Negative Marking</p>

            </div>

            <div class="mock-grid">

                ${mockTests.map(test => `

                    <div class="mock-card">

                        <h3>${test.title}</h3>

                        <p>150 Questions</p>
                        <p>200 Marks</p>
                        <p>180 Minutes</p>

                        <button onclick="startCETMock(${test.id})">
                            Start Mock Test
                        </button>

                    </div>

                `).join("")}

            </div>

        </div>
    `;
}

// ======================================================
// START CET MOCK
// ======================================================

function startCETMock(testId) {

    stopTimer();

    const physics = getMixedQuestions(
        "Physics",
        50
    );

    const chemistry = getMixedQuestions(
        "Chemistry",
        50
    );

    const mathematics = getMixedQuestions(
        "Mathematics",
        50
    );

    currentTest = {

        id: testId,

        phase: "pc",

        sections: {

            physics: {
                questions: physics,
                answers: {},
                marked: {}
            },

            chemistry: {
                questions: chemistry,
                answers: {},
                marked: {}
            },

            mathematics: {
                questions: mathematics,
                answers: {},
                marked: {}
            }

        }

    };

    currentPhase = "pc";

    currentSection = "physics";

    currentQuestionIndex = {
        physics: 0,
        chemistry: 0,
        mathematics: 0
    };

    remainingSeconds = 90 * 60;

    renderCETExam();

    startTimer();
}

// ======================================================
// CET EXAM UI
// ======================================================

function renderCETExam() {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    const question =
        section.questions[index];

    const isPCPhase =
        currentPhase === "pc";

    const marks =
        currentSection === "mathematics"
            ? 2
            : 1;

    const app = document.getElementById("app");

    app.innerHTML = `

        <div class="cet-exam">

            <!-- HEADER -->

            <div class="exam-header">

                <div>
                    <strong>MHT-CET 2027</strong>
                </div>

                <div>
                    ${
                        isPCPhase
                            ? "PART 1 — PHYSICS + CHEMISTRY"
                            : "PART 2 — MATHEMATICS"
                    }
                </div>

                <div class="timer" id="timer">
                    90:00
                </div>

            </div>


            <!-- SECTION TABS -->

            <div class="section-tabs">

                <button
                    class="${currentSection === "physics" ? "active" : ""}"
                    onclick="switchSection('physics')"
                    ${!isPCPhase ? "disabled" : ""}
                >
                    Physics
                </button>

                <button
                    class="${currentSection === "chemistry" ? "active" : ""}"
                    onclick="switchSection('chemistry')"
                    ${!isPCPhase ? "disabled" : ""}
                >
                    Chemistry
                </button>

                <button
                    class="${currentSection === "mathematics" ? "active" : ""}"
                    onclick="switchSection('mathematics')"
                    ${isPCPhase ? "disabled" : ""}
                >
                    Mathematics
                </button>

            </div>


            <!-- EXAM BODY -->

            <div class="exam-body">

                <!-- QUESTION -->

                <div class="question-area">

                    <div class="question-top">

                        <span>
                            Question ${index + 1} of 50
                        </span>

                        <span>
                            ${marks} Mark${marks > 1 ? "s" : ""}
                        </span>

                    </div>

                    <div class="question-card">

                        <h2>
                            ${question.question}
                        </h2>

                        <div class="exam-options">

                            ${question.options.map(
                                (option, i) => `

                                <button
                                    class="${
                                        section.answers[question.id] === i
                                            ? "selected"
                                            : ""
                                    }"

                                    onclick="selectCETAnswer(${i})"
                                >

                                    <span>
                                        ${String.fromCharCode(65 + i)}
                                    </span>

                                    ${option}

                                </button>

                            `).join("")}

                        </div>

                    </div>


                    <!-- CONTROLS -->

                    <div class="exam-controls">

                        <button
                            onclick="previousCETQuestion()"
                            ${index === 0 ? "disabled" : ""}
                        >
                            Previous
                        </button>

                        <button onclick="markForReview()">
                            ${section.marked[question.id]
                                ? "Unmark Review"
                                : "Mark for Review"}
                        </button>

                        <button onclick="clearCETResponse()">
                            Clear Response
                        </button>

                        ${
                            currentSection === "mathematics" &&
                            index === 49
                                ? `
                                    <button
                                        onclick="submitMockTest()"
                                    >
                                        Submit Test
                                    </button>
                                `
                                : `
                                    <button
                                        onclick="nextCETQuestion()"
                                    >
                                        Save & Next
                                    </button>
                                `
                        }

                    </div>

                </div>


                <!-- QUESTION PALETTE -->

                <div class="question-palette">

                    <h3>Question Palette</h3>

                    <div class="palette-info">

                        <span>
                            🟢 Answered
                        </span>

                        <span>
                            ⚪ Not Answered
                        </span>

                        <span>
                            🟡 Review
                        </span>

                    </div>

                    <div class="palette-grid">

                        ${section.questions.map(
                            (q, i) => {

                                let className = "";

                                if (
                                    section.marked[q.id]
                                ) {
                                    className += " review";
                                }

                                if (
                                    section.answers[q.id] !== undefined
                                ) {
                                    className += " answered";
                                }

                                if (
                                    i === index
                                ) {
                                    className += " current";
                                }

                                return `

                                    <button
                                        class="${className}"
                                        onclick="goToCETQuestion(${i})"
                                    >
                                        ${i + 1}
                                    </button>

                                `;
                            }
                        ).join("")}

                    </div>


                    <div class="phase-info">

                        ${
                            isPCPhase
                                ? `
                                    <strong>Part 1</strong>

                                    <p>
                                        Physics + Chemistry
                                    </p>

                                    <p>
                                        Shared Time: 90 Minutes
                                    </p>

                                    <p>
                                        Mathematics is locked.
                                    </p>
                                `
                                : `
                                    <strong>Part 2</strong>

                                    <p>
                                        Mathematics
                                    </p>

                                    <p>
                                        Time: 90 Minutes
                                    </p>

                                    <p>
                                        Physics & Chemistry are locked.
                                    </p>
                                `
                        }

                    </div>

                </div>

            </div>

        </div>
    `;

    updateTimerDisplay();
}

// ======================================================
// SECTION SWITCH
// ======================================================

function switchSection(section) {

    if (!currentTest) return;

    if (
        currentPhase === "pc" &&
        (section === "physics" ||
         section === "chemistry")
    ) {

        currentSection = section;

        renderCETExam();

    }

    if (
        currentPhase === "math" &&
        section === "mathematics"
    ) {

        currentSection = section;

        renderCETExam();

    }
}

// ======================================================
// ANSWER
// ======================================================

function selectCETAnswer(answerIndex) {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    const question =
        section.questions[index];

    section.answers[question.id] =
        answerIndex;

    renderCETExam();
}

// ======================================================
// NEXT QUESTION
// ======================================================

function nextCETQuestion() {

    const index =
        currentQuestionIndex[currentSection];

    if (index < 49) {

        currentQuestionIndex[currentSection]++;

        renderCETExam();

    }
}

// ======================================================
// PREVIOUS QUESTION
// ======================================================

function previousCETQuestion() {

    const index =
        currentQuestionIndex[currentSection];

    if (index > 0) {

        currentQuestionIndex[currentSection]--;

        renderCETExam();

    }
}

// ======================================================
// GO TO QUESTION
// ======================================================

function goToCETQuestion(index) {

    currentQuestionIndex[currentSection] =
        index;

    renderCETExam();
}

// ======================================================
// MARK FOR REVIEW
// ======================================================

function markForReview() {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    const question =
        section.questions[index];

    section.marked[question.id] =
        !section.marked[question.id];

    renderCETExam();
}

// ======================================================
// CLEAR RESPONSE
// ======================================================

function clearCETResponse() {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    const question =
        section.questions[index];

    delete section.answers[question.id];

    renderCETExam();
}

// ======================================================
// TIMER
// ======================================================

function startTimer() {

    stopTimer();

    timerInterval = setInterval(() => {

        remainingSeconds--;

        updateTimerDisplay();

        if (remainingSeconds <= 0) {

            stopTimer();

            if (currentPhase === "pc") {

                startMathematicsPhase();

            } else {

                submitMockTest(true);

            }

        }

    }, 1000);
}

// ======================================================
// UPDATE TIMER
// ======================================================

function updateTimerDisplay() {

    const timer =
        document.getElementById("timer");

    if (!timer) return;

    const minutes =
        Math.floor(remainingSeconds / 60);

    const seconds =
        remainingSeconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ======================================================
// STOP TIMER
// ======================================================

function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }
}

// ======================================================
// MOVE TO MATHEMATICS
// ======================================================

function startMathematicsPhase() {

    currentPhase = "math";

    currentSection = "mathematics";

    currentQuestionIndex.mathematics = 0;

    remainingSeconds = 90 * 60;

    renderCETExam();

    startTimer();
}

// ======================================================
// SUBMIT MOCK
// ======================================================

function submitMockTest(autoSubmit = false) {

    if (!autoSubmit) {

        const confirmSubmit =
            confirm(
                "Are you sure you want to submit the test?"
            );

        if (!confirmSubmit) return;

    }

    stopTimer();

    showMockResult();
}

// ======================================================
// MOCK RESULT
// ======================================================

function showMockResult() {

    let result = {

        physics: {
            correct: 0,
            wrong: 0,
            unanswered: 0,
            marks: 0
        },

        chemistry: {
            correct: 0,
            wrong: 0,
            unanswered: 0,
            marks: 0
        },

        mathematics: {
            correct: 0,
            wrong: 0,
            unanswered: 0,
            marks: 0
        }

    };


    Object.keys(currentTest.sections).forEach(
        subject => {

            const section =
                currentTest.sections[subject];

            section.questions.forEach(
                question => {

                    const answer =
                        section.answers[question.id];

                    if (answer === undefined) {

                        result[subject].unanswered++;

                    }
                    else if (
                        answer === question.answer
                    ) {

                        result[subject].correct++;

                        result[subject].marks +=
                            subject === "mathematics"
                                ? 2
                                : 1;

                    }
                    else {

                        result[subject].wrong++;

                    }

                }
            );

        }
    );


    const totalMarks =
        result.physics.marks +
        result.chemistry.marks +
        result.mathematics.marks;

    const totalCorrect =
        result.physics.correct +
        result.chemistry.correct +
        result.mathematics.correct;

    const totalWrong =
        result.physics.wrong +
        result.chemistry.wrong +
        result.mathematics.wrong;

    const totalUnanswered =
        result.physics.unanswered +
        result.chemistry.unanswered +
        result.mathematics.unanswered;


    const percentage =
        ((totalMarks / 200) * 100).toFixed(2);


    document.getElementById("app").innerHTML = `

        <div class="mock-result">

            <h1>Mock Test Result</h1>

            <div class="total-score">

                <h2>${totalMarks} / 200</h2>

                <p>
                    ${percentage}%
                </p>

            </div>


            <div class="result-summary">

                <div>
                    <strong>${totalCorrect}</strong>
                    <span>Correct</span>
                </div>

                <div>
                    <strong>${totalWrong}</strong>
                    <span>Wrong</span>
                </div>

                <div>
                    <strong>${totalUnanswered}</strong>
                    <span>Unanswered</span>
                </div>

            </div>


            <h2>Subject-wise Performance</h2>


            <div class="subject-result">

                <div>

                    <h3>Physics</h3>

                    <p>
                        Correct:
                        ${result.physics.correct}
                    </p>

                    <p>
                        Wrong:
                        ${result.physics.wrong}
                    </p>

                    <p>
                        Unanswered:
                        ${result.physics.unanswered}
                    </p>

                    <strong>
                        ${result.physics.marks} / 50
                    </strong>

                </div>


                <div>

                    <h3>Chemistry</h3>

                    <p>
                        Correct:
                        ${result.chemistry.correct}
                    </p>

                    <p>
                        Wrong:
                        ${result.chemistry.wrong}
                    </p>

                    <p>
                        Unanswered:
                        ${result.chemistry.unanswered}
                    </p>

                    <strong>
                        ${result.chemistry.marks} / 50
                    </strong>

                </div>


                <div>

                    <h3>Mathematics</h3>

                    <p>
                        Correct:
                        ${result.mathematics.correct}
                    </p>

                    <p>
                        Wrong:
                        ${result.mathematics.wrong}
                    </p>

                    <p>
                        Unanswered:
                        ${result.mathematics.unanswered}
                    </p>

                    <strong>
                        ${result.mathematics.marks} / 100
                    </strong>

                </div>

            </div>


            <div class="result-buttons">

                <button onclick="showMockTests()">
                    Take Another Mock
                </button>

                <button onclick="showDashboard()">
                    Dashboard
                </button>

            </div>

        </div>
    `;
}

// ======================================================
// PYQ
// ======================================================

function showPYQTests() {

    stopTimer();

    const app =
        document.getElementById("app");

    app.innerHTML = `

        <div class="page">

            <button onclick="showDashboard()">
                ← Back
            </button>

            <h1>MHT-CET PYQ Tests</h1>

            <p>
                Previous-year question tests will appear here.
            </p>

            <div class="pyq-grid">

                ${pyqTests.map(test => `

                    <div class="pyq-card">

                        <h3>
                            MHT-CET ${test.year}
                        </h3>

                        <p>
                            Full Paper
                        </p>

                        <button
                            onclick="startPYQ(${test.id})"
                        >
                            Start PYQ
                        </button>

                    </div>

                `).join("")}

            </div>

        </div>
    `;
}

function startPYQ(id) {

    alert(
        "This PYQ test is ready for verified PYQ questions to be added."
    );
}

// ======================================================
// PERFORMANCE
// ======================================================

function showPerformance() {

    stopTimer();

    document.getElementById("app").innerHTML = `

        <div class="page">

            <button onclick="showDashboard()">
                ← Back
            </button>

            <h1>Performance</h1>

            <div class="performance-card">

                <h2>Your Performance</h2>

                <p>
                    Mock-test performance tracking will appear here
                    after you complete tests.
                </p>

            </div>

        </div>
    `;
}

// ======================================================
// START DASHBOARD
// ======================================================

showDashboard();
