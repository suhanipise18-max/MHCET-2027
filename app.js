/* =========================================================
   MHT-CET 2027 PRACTICE PORTAL - APP.JS
   ========================================================= */

/* =========================
   DATA
========================= */

const questionBank = window.questions || [];
const chapterCatalog = window.chapterCatalog || {};
const mockTests = window.mockTests || [];
const pyqTests = window.pyqTests || [];

let currentTest = null;

let selectedSubject = "";
let selectedChapter = "";
let selectedDifficulty = "";

let practiceQuestions = [];
let practiceIndex = 0;

let timerInterval = null;
let remainingSeconds = 0;

let currentSection = "physics";
let currentQuestionIndex = {
    physics: 0,
    chemistry: 0,
    mathematics: 0
};

let currentPhase = "pc";


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}


function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
        String(hrs).padStart(2, "0") +
        ":" +
        String(mins).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}


function hideAllPages() {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });
}


function showPage(id) {
    hideAllPages();

    const page = document.getElementById(id);

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo(0, 0);
}


/* =========================================================
   LOCAL STORAGE / PERFORMANCE
========================= */

function getStats() {
    return JSON.parse(
        localStorage.getItem("mhtCETStats") ||
        JSON.stringify({
            questions: 0,
            correct: 0,
            wrong: 0,
            tests: 0,
            mockTests: [],
            subject: {
                Physics: { questions: 0, correct: 0 },
                Chemistry: { questions: 0, correct: 0 },
                Mathematics: { questions: 0, correct: 0 }
            }
        })
    );
}


function saveStats(stats) {
    localStorage.setItem("mhtCETStats", JSON.stringify(stats));
}


function updateStats(correct, wrong, answered, subjectResults = null) {
    const stats = getStats();

    stats.questions += answered;
    stats.correct += correct;
    stats.wrong += wrong;

    if (subjectResults) {
        Object.keys(subjectResults).forEach(subject => {

            if (!stats.subject[subject]) {
                stats.subject[subject] = {
                    questions: 0,
                    correct: 0
                };
            }

            stats.subject[subject].questions +=
                subjectResults[subject].answered;

            stats.subject[subject].correct +=
                subjectResults[subject].correct;
        });
    }

    saveStats(stats);

    updateDashboardStats();
}


function updateTestCount() {
    const stats = getStats();

    stats.tests += 1;

    saveStats(stats);
}


function updateDashboardStats() {
    const stats = getStats();

    const attempted = document.getElementById("questionsAttempted");
    const tests = document.getElementById("testsCompleted");
    const accuracy = document.getElementById("accuracy");

    if (attempted) {
        attempted.textContent = stats.questions;
    }

    if (tests) {
        tests.textContent = stats.tests;
    }

    if (accuracy) {
        const acc =
            stats.questions > 0
                ? Math.round((stats.correct / stats.questions) * 100)
                : 0;

        accuracy.textContent = acc + "%";
    }

    updateStreakDisplay();
}


function updateStreakDisplay() {
    const streak = Number(
        localStorage.getItem("mhtCETStreak") || 0
    );

    const element = document.getElementById("studyStreak");

    if (element) {
        element.textContent = streak;
    }
}


function recordStudyActivity() {
    const today = new Date().toISOString().split("T")[0];

    const lastDate =
        localStorage.getItem("mhtCETLastStudyDate");

    let streak = Number(
        localStorage.getItem("mhtCETStreak") || 0
    );

    if (lastDate === today) {
        return;
    }

    if (lastDate) {
        const oldDate = new Date(lastDate);
        const currentDate = new Date(today);

        const difference =
            Math.round(
                (currentDate - oldDate) /
                (1000 * 60 * 60 * 24)
            );

        if (difference === 1) {
            streak++;
        } else {
            streak = 1;
        }
    } else {
        streak = 1;
    }

    localStorage.setItem("mhtCETStreak", streak);
    localStorage.setItem("mhtCETLastStudyDate", today);

    updateStreakDisplay();
}


/* =========================================================
   HOME
========================= */

function goHome() {
    stopTimer();

    showPage("home");

    updateDashboardStats();
}


function showDashboard() {
    goHome();
}


/* =========================================================
   PRACTICE
========================= */

function showPractice() {
    showPage("practice");

    document.getElementById("subjectSelection").style.display = "block";
    document.getElementById("chapterSection").style.display = "none";
    document.getElementById("difficultySection").style.display = "none";
    document.getElementById("practiceQuestion").style.display = "none";
}


function selectSubject(subject) {

    selectedSubject = subject;

    document.getElementById("selectedSubject").textContent =
        subject;

    document.getElementById("subjectSelection").style.display =
        "none";

    document.getElementById("chapterSection").style.display =
        "block";

    document.getElementById("difficultySection").style.display =
        "none";

    document.getElementById("practiceQuestion").style.display =
        "none";

    renderChapters(subject);
}


function renderChapters(subject) {

    const container =
        document.getElementById("chapterList");

    container.innerHTML = "";

    const chapters = chapterCatalog[subject] || [];

    if (chapters.length === 0) {

        container.innerHTML =
            "<p>No chapters available.</p>";

        return;
    }

    chapters.forEach((chapter, index) => {

        const button = document.createElement("button");

        button.className = "chapter-card";

        button.innerHTML = `
            <span>Chapter ${index + 1}</span>
            <strong>${chapter}</strong>
            <small>30 Questions</small>
        `;

        button.onclick = function () {
            selectChapter(chapter);
        };

        container.appendChild(button);
    });
}


function backToSubjects() {

    document.getElementById("subjectSelection").style.display =
        "block";

    document.getElementById("chapterSection").style.display =
        "none";

    document.getElementById("difficultySection").style.display =
        "none";

    document.getElementById("practiceQuestion").style.display =
        "none";
}


function selectChapter(chapter) {

    selectedChapter = chapter;

    document.getElementById("selectedChapter").textContent =
        chapter;

    document.getElementById("chapterSection").style.display =
        "none";

    document.getElementById("difficultySection").style.display =
        "block";

    document.getElementById("practiceQuestion").style.display =
        "none";
}


function backToChapters() {

    document.getElementById("difficultySection").style.display =
        "none";

    document.getElementById("chapterSection").style.display =
        "block";

    renderChapters(selectedSubject);
}


function backToDifficulty() {

    document.getElementById("practiceQuestion").style.display =
        "none";

    document.getElementById("difficultySection").style.display =
        "block";
}


function startChapterPractice(difficulty) {

    selectedDifficulty = difficulty;

    practiceQuestions = questionBank.filter(q =>
        q.subject === selectedSubject &&
        q.chapter === selectedChapter &&
        q.difficulty === difficulty
    );

    practiceQuestions = shuffle(practiceQuestions);

    if (practiceQuestions.length === 0) {

        alert(
            "No questions are available for this chapter and difficulty."
        );

        return;
    }

    practiceIndex = 0;

    document.getElementById("difficultySection").style.display =
        "none";

    document.getElementById("practiceQuestion").style.display =
        "block";

    recordStudyActivity();

    renderPracticeQuestion();
}


function renderPracticeQuestion() {

    const question =
        practiceQuestions[practiceIndex];

    if (!question) {
        return;
    }

    document.getElementById("practiceQuestionNumber").textContent =
        `Question ${practiceIndex + 1} of ${practiceQuestions.length}`;

    document.getElementById("practiceChapter").textContent =
        question.chapter;

    document.getElementById("practiceDifficulty").textContent =
        question.difficulty;

    document.getElementById("practiceQuestionText").textContent =
        question.question;

    const optionsContainer =
        document.getElementById("practiceOptions");

    optionsContainer.innerHTML = "";

    const feedback =
        document.getElementById("practiceFeedback");

    feedback.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option-btn";

        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;

        button.onclick = function () {

            const correct =
                index === question.answer;

            document
                .querySelectorAll("#practiceOptions .option-btn")
                .forEach(btn => {
                    btn.disabled = true;
                });

            if (correct) {

                button.classList.add("correct");

                feedback.innerHTML = `
                    <div class="correct-feedback">
                        ✓ Correct Answer
                        <p>${question.explanation || ""}</p>
                    </div>
                `;

            } else {

                button.classList.add("wrong");

                const correctButton =
                    document.querySelectorAll(
                        "#practiceOptions .option-btn"
                    )[question.answer];

                if (correctButton) {
                    correctButton.classList.add("correct");
                }

                feedback.innerHTML = `
                    <div class="wrong-feedback">
                        ✗ Wrong Answer
                        <p>
                            Correct answer:
                            ${String.fromCharCode(65 + question.answer)}
                            <br>
                            ${question.explanation || ""}
                        </p>
                    </div>
                `;
            }

            savePracticeAttempt(correct);
        };

        optionsContainer.appendChild(button);
    });
}


function savePracticeAttempt(correct) {

    const key = "mhtCETPracticeAttempts";

    const attempts = JSON.parse(
        localStorage.getItem(key) || "[]"
    );

    const question =
        practiceQuestions[practiceIndex];

    attempts.push({
        questionId: question.id,
        subject: question.subject,
        chapter: question.chapter,
        correct: correct,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        key,
        JSON.stringify(attempts)
    );

    const stats = getStats();

    stats.questions++;

    if (correct) {
        stats.correct++;
    } else {
        stats.wrong++;
    }

    if (!stats.subject[question.subject]) {
        stats.subject[question.subject] = {
            questions: 0,
            correct: 0
        };
    }

    stats.subject[question.subject].questions++;

    if (correct) {
        stats.subject[question.subject].correct++;
    }

    saveStats(stats);

    updateDashboardStats();
}


function nextPracticeQuestion() {

    if (
        practiceIndex <
        practiceQuestions.length - 1
    ) {
        practiceIndex++;

        renderPracticeQuestion();

    } else {

        alert("You have completed this practice set!");

        backToDifficulty();
    }
}


function previousPracticeQuestion() {

    if (practiceIndex > 0) {

        practiceIndex--;

        renderPracticeQuestion();

    }
}


/* =========================================================
   MOCK TESTS
========================= */

function showMockTests() {

    showPage("mockTests");

    const list =
        document.getElementById("mockTestList");

    list.innerHTML = "";

    if (mockTests.length === 0) {

        for (let i = 1; i <= 50; i++) {
            createMockCard(
                {
                    id: `MOCK-${String(i).padStart(2, "0")}`,
                    title: `MHT-CET Mock Test ${i}`,
                    durationMinutes: 180,
                    questionCount: 150
                },
                list
            );
        }

        return;
    }

    mockTests.forEach(test => {
        createMockCard(test, list);
    });
}


function createMockCard(test, container) {

    const card = document.createElement("div");

    card.className = "test-card";

    card.innerHTML = `
        <div>
            <h3>${test.title}</h3>

            <p>
                150 Questions • 180 Minutes
            </p>

            <small>
                Physics 50 • Chemistry 50 • Mathematics 50
            </small>
        </div>

        <button>
            Start Test
        </button>
    `;

    card.querySelector("button").onclick = function () {
        startCETMock(test.id);
    };

    container.appendChild(card);
}


function getQuestionsForSubject(subject, count) {

    const available =
        questionBank.filter(
            q => q.subject === subject
        );

    return shuffle(available).slice(0, count);
}


function startCETMock(testId) {

    const physics =
        getQuestionsForSubject("Physics", 50);

    const chemistry =
        getQuestionsForSubject("Chemistry", 50);

    const mathematics =
        getQuestionsForSubject("Mathematics", 50);

    if (
        physics.length < 50 ||
        chemistry.length < 50 ||
        mathematics.length < 50
    ) {

        alert(
            "The question bank does not contain enough questions to create the full 150-question test."
        );

        return;
    }

    const testInfo =
        mockTests.find(test => test.id === testId);

    currentTest = {

        id: testId,

        title:
            testInfo?.title ||
            "MHT-CET Mock Test",

        sections: {

            physics: {
                subject: "Physics",
                questions: physics,
                answers: Array(50).fill(null),
                marked: Array(50).fill(false)
            },

            chemistry: {
                subject: "Chemistry",
                questions: chemistry,
                answers: Array(50).fill(null),
                marked: Array(50).fill(false)
            },

            mathematics: {
                subject: "Mathematics",
                questions: mathematics,
                answers: Array(50).fill(null),
                marked: Array(50).fill(false)
            }
        }
    };

    currentSection = "physics";

    currentPhase = "pc";

    currentQuestionIndex = {
        physics: 0,
        chemistry: 0,
        mathematics: 0
    };

    remainingSeconds = 90 * 60;

    showPage("exam");

    renderExam();

    startTimer();

    recordStudyActivity();
}


/* =========================================================
   EXAM SCREEN
========================= */

function renderExam() {

    if (!currentTest) {
        return;
    }

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    const question =
        section.questions[index];

    document.getElementById("examTitle").textContent =
        currentTest.title;

    document.getElementById("subjectName").textContent =
        section.subject;

    document.getElementById("questionNumber").textContent =
        `Question ${index + 1} of ${section.questions.length}`;

    document.getElementById("questionText").textContent =
        question.question;

    const answer =
        section.answers[index];

    const status =
        document.getElementById("questionStatus");

    if (answer === null) {
        status.textContent = "Not Answered";
    } else {
        status.textContent = "Answered";
    }

    renderOptions(section, question, index);

    renderQuestionPalette();
}


function renderOptions(section, question, index) {

    const container =
        document.getElementById("options");

    container.innerHTML = "";

    question.options.forEach((option, optionIndex) => {

        const button =
            document.createElement("button");

        button.className = "option-btn";

        button.textContent =
            String.fromCharCode(65 + optionIndex) +
            ". " +
            option;

        if (
            section.answers[index] ===
            optionIndex
        ) {
            button.classList.add("selected");
        }

        button.onclick = function () {

            section.answers[index] =
                optionIndex;

            renderExam();
        };

        container.appendChild(button);
    });
}


function renderQuestionPalette() {

    const container =
        document.getElementById("questionNumbers");

    container.innerHTML = "";

    if (!currentTest) {
        return;
    }

    const section =
        currentTest.sections[currentSection];

    section.questions.forEach((question, index) => {

        const button =
            document.createElement("button");

        button.textContent = index + 1;

        const answer =
            section.answers[index];

        if (answer !== null) {
            button.classList.add("answered");
        } else {
            button.classList.add("unanswered");
        }

        if (section.marked[index]) {
            button.classList.add("review");
        }

        if (
            index ===
            currentQuestionIndex[currentSection]
        ) {
            button.classList.add("active");
        }

        button.onclick = function () {

            currentQuestionIndex[currentSection] =
                index;

            renderExam();
        };

        container.appendChild(button);
    });
}


function previousQuestion() {

    const index =
        currentQuestionIndex[currentSection];

    if (index > 0) {

        currentQuestionIndex[currentSection]--;

        renderExam();

    } else {

        if (
            currentSection === "chemistry"
        ) {

            currentSection = "physics";

            currentQuestionIndex.physics = 49;

            renderExam();

        } else if (
            currentSection === "mathematics"
        ) {

            currentSection = "chemistry";

            currentQuestionIndex.chemistry = 49;

            renderExam();
        }
    }
}


function nextQuestion() {

    const index =
        currentQuestionIndex[currentSection];

    const section =
        currentTest.sections[currentSection];

    if (
        index <
        section.questions.length - 1
    ) {

        currentQuestionIndex[currentSection]++;

        renderExam();

        return;
    }

    if (currentPhase === "pc") {

        if (currentSection === "physics") {

            currentSection = "chemistry";

            currentQuestionIndex.chemistry = 0;

            renderExam();

            return;
        }

        if (currentSection === "chemistry") {

            startMathematicsPhase();

            return;
        }
    }

    if (currentPhase === "math") {

        submitTest();
    }
}


function markForReview() {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    section.marked[index] =
        !section.marked[index];

    renderExam();
}


function clearResponse() {

    const section =
        currentTest.sections[currentSection];

    const index =
        currentQuestionIndex[currentSection];

    section.answers[index] = null;

    renderExam();
}


/* =========================================================
   SUBJECT SWITCHING
========================= */

function switchExamSection(section) {

    if (
        currentPhase === "pc" &&
        (section === "physics" ||
            section === "chemistry")
    ) {

        currentSection = section;

        renderExam();

        return;
    }

    if (
        currentPhase === "math" &&
        section === "mathematics"
    ) {

        currentSection = "mathematics";

        renderExam();

        return;
    }
}


/* =========================================================
   TIMER
========================= */

function startTimer() {

    stopTimer();

    updateTimerDisplay();

    timerInterval =
        setInterval(function () {

            remainingSeconds--;

            updateTimerDisplay();

            if (remainingSeconds <= 0) {

                stopTimer();

                if (currentPhase === "pc") {

                    startMathematicsPhase();

                } else {

                    submitTest(true);
                }
            }

        }, 1000);
}


function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;
    }
}


function updateTimerDisplay() {

    const timer =
        document.getElementById("timer");

    if (timer) {
        timer.textContent =
            formatTime(
                Math.max(0, remainingSeconds)
            );
    }
}


/* =========================================================
   MATHEMATICS PHASE
========================= */

function startMathematicsPhase() {

    currentPhase = "math";

    currentSection = "mathematics";

    currentQuestionIndex.mathematics = 0;

    remainingSeconds = 90 * 60;

    alert(
        "Physics + Chemistry phase is complete.\n\nMathematics phase starts now.\n\nYou have 90 minutes."
    );

    renderExam();

    startTimer();
}


/* =========================================================
   SUBMIT TEST
========================= */

function submitTest(autoSubmit = false) {

    if (!currentTest) {
        return;
    }

    if (!autoSubmit) {

        const confirmed =
            confirm(
                "Are you sure you want to submit the test?"
            );

        if (!confirmed) {
            return;
        }
    }

    stopTimer();

    showResult();

    recordStudyActivity();
}


/* =========================================================
   RESULTS
========================= */

function calculateResults() {

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnanswered = 0;

    let score = 0;

    const subjectResults = {};

    Object.keys(currentTest.sections).forEach(sectionKey => {

        const section =
            currentTest.sections[sectionKey];

        let correct = 0;
        let wrong = 0;
        let unanswered = 0;

        section.questions.forEach((question, index) => {

            const answer =
                section.answers[index];

            if (answer === null) {

                unanswered++;

            } else if (
                answer === question.answer
            ) {

                correct++;

                if (sectionKey === "mathematics") {
                    score += 2;
                } else {
                    score += 1;
                }

            } else {

                wrong++;
            }
        });

        totalCorrect += correct;
        totalWrong += wrong;
        totalUnanswered += unanswered;

        subjectResults[
            section.subject
        ] = {
            correct,
            wrong,
            unanswered,
            answered: correct + wrong
        };
    });

    const totalQuestions = 150;

    const answered =
        totalCorrect + totalWrong;

    const accuracy =
        answered > 0
            ? Math.round(
                (totalCorrect / answered) * 100
            )
            : 0;

    return {
        score,
        totalCorrect,
        totalWrong,
        totalUnanswered,
        totalQuestions,
        answered,
        accuracy,
        subjectResults
    };
}


function showResult() {

    const result =
        calculateResults();

    updateStats(
        result.totalCorrect,
        result.totalWrong,
        result.answered,
        result.subjectResults
    );

    updateTestCount();

    const stats = getStats();

    stats.mockTests.push({

        id: currentTest.id,

        title: currentTest.title,

        score: result.score,

        correct: result.totalCorrect,

        wrong: result.totalWrong,

        unanswered: result.totalUnanswered,

        accuracy: result.accuracy,

        date: new Date().toISOString()
    });

    saveStats(stats);

    document.getElementById("resultTestName").textContent =
        currentTest.title;

    document.getElementById("score").textContent =
        result.score + " / 200";

    document.getElementById("correct").textContent =
        result.totalCorrect;

    document.getElementById("wrong").textContent =
        result.totalWrong;

    document.getElementById("unanswered").textContent =
        result.totalUnanswered;

    document.getElementById("resultAccuracy").textContent =
        result.accuracy + "%";

    document.getElementById("review").style.display =
        "none";

    showPage("result");
}


/* =========================================================
   ANSWER REVIEW
========================= */

function showReview() {

    const container =
        document.getElementById("reviewList");

    container.innerHTML = "";

    Object.keys(currentTest.sections).forEach(sectionKey => {

        const section =
            currentTest.sections[sectionKey];

        const heading =
            document.createElement("h3");

        heading.textContent =
            section.subject;

        container.appendChild(heading);

        section.questions.forEach((question, index) => {

            const userAnswer =
                section.answers[index];

            const item =
                document.createElement("div");

            item.className =
                "review-item";

            let status = "";
            let statusClass = "";

            if (userAnswer === null) {

                status = "Unanswered";

                statusClass = "unanswered";

            } else if (
                userAnswer === question.answer
            ) {

                status = "Correct";

                statusClass = "correct";

            } else {

                status = "Wrong";

                statusClass = "wrong";
            }

            const userText =
                userAnswer === null
                    ? "Not answered"
                    : question.options[userAnswer];

            const correctText =
                question.options[question.answer];

            item.innerHTML = `
                <div class="review-question">
                    <strong>
                        Q${index + 1}. ${question.question}
                    </strong>

                    <span class="${statusClass}">
                        ${status}
                    </span>
                </div>

                <p>
                    Your answer:
                    ${userText}
                </p>

                <p>
                    Correct answer:
                    ${correctText}
                </p>

                <p>
                    ${question.explanation || ""}
                </p>
            `;

            container.appendChild(item);
        });
    });

    document.getElementById("review").style.display =
        "block";

    document.getElementById("review").scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================================
   PYQ
========================= */

function showPYQ() {

    showPage("pyq");
}


function openPYQYear(year) {

    const pyq =
        pyqTests.find(
            test => Number(test.year) === Number(year)
        );

    if (
        !pyq ||
        !pyq.questions ||
        pyq.questions.length === 0
    ) {

        alert(
            `${year} PYQ questions have not been added yet.\n\nOnly verified PYQs should be added here.`
        );

        return;
    }

    alert(
        `${year} PYQ test is ready to start.`
    );
}


/* =========================================================
   INSTRUCTIONS
========================= */

function showInstructions() {

    showPage("instructions");
}


function startExam() {

    showMockTests();

    setTimeout(function () {

        if (mockTests.length > 0) {

            startCETMock(mockTests[0].id);

        } else {

            startCETMock("MOCK-01");
        }

    }, 100);
}


/* =========================================================
   PERFORMANCE
========================= */

function showPerformance() {

    showPage("performance");

    const stats = getStats();

    document.getElementById(
        "performanceQuestions"
    ).textContent =
        stats.questions;

    document.getElementById(
        "performanceCorrect"
    ).textContent =
        stats.correct;

    document.getElementById(
        "performanceWrong"
    ).textContent =
        stats.wrong;

    const accuracy =
        stats.questions > 0
            ? Math.round(
                (stats.correct / stats.questions) * 100
            )
            : 0;

    document.getElementById(
        "performanceAccuracy"
    ).textContent =
        accuracy + "%";

    renderSubjectPerformance();
}


function renderSubjectPerformance() {

    const container =
        document.getElementById(
            "subjectPerformanceList"
        );

    container.innerHTML = "";

    const stats = getStats();

    ["Physics", "Chemistry", "Mathematics"]
        .forEach(subject => {

            const data =
                stats.subject[subject] || {
                    questions: 0,
                    correct: 0
                };

            const accuracy =
                data.questions > 0
                    ? Math.round(
                        (data.correct /
                            data.questions) *
                        100
                    )
                    : 0;

            const item =
                document.createElement("div");

            item.className =
                "subject-performance-item";

            item.innerHTML = `
                <h3>${subject}</h3>

                <p>
                    Questions Attempted:
                    <strong>${data.questions}</strong>
                </p>

                <p>
                    Correct:
                    <strong>${data.correct}</strong>
                </p>

                <p>
                    Accuracy:
                    <strong>${accuracy}%</strong>
                </p>
            `;

            container.appendChild(item);
        });
}


/* =========================================================
   INITIALIZE
========================= */

function initializePortal() {

    updateDashboardStats();

    showPage("home");
}


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
========================= */

window.showPractice = showPractice;
window.showMockTests = showMockTests;
window.showPYQ = showPYQ;
window.showPerformance = showPerformance;
window.showInstructions = showInstructions;

window.goHome = goHome;

window.selectSubject = selectSubject;
window.backToSubjects = backToSubjects;
window.selectChapter = selectChapter;
window.backToChapters = backToChapters;
window.startChapterPractice = startChapterPractice;
window.backToDifficulty = backToDifficulty;

window.previousPracticeQuestion =
    previousPracticeQuestion;

window.nextPracticeQuestion =
    nextPracticeQuestion;

window.startExam = startExam;

window.previousQuestion =
    previousQuestion;

window.nextQuestion =
    nextQuestion;

window.markForReview =
    markForReview;

window.clearResponse =
    clearResponse;

window.submitTest =
    submitTest;

window.showReview =
    showReview;

window.openPYQYear =
    openPYQYear;


/* =========================================================
   START
========================= */

initializePortal();
