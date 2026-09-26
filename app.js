/* =========================================================
   MHT-CET 2027 PRACTICE PORTAL
   FINAL APP.JS
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentSubject = "";
let currentChapter = "";
let currentDifficulty = "";

let practiceQuestions = [];
let currentPracticeIndex = 0;

let examQuestions = [];
let currentQuestionIndex = 0;

let userAnswers = [];
let markedForReview = [];

let timerInterval = null;
let timeRemaining = 0;

let currentTestName = "MHT-CET Mock Test";

let lastResult = null;


/* =========================================================
   PAGE HELPERS
========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function hideAllPages() {

    document.querySelectorAll(".page").forEach(function(page) {
        page.style.display = "none";
    });
}


function showPage(id) {

    hideAllPages();

    const page = getElement(id);

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getStats() {

    return JSON.parse(
        localStorage.getItem("mhtcetStats")
    ) || {
        questionsAttempted: 0,
        testsCompleted: 0,
        correct: 0,
        wrong: 0,
        studyStreak: 0,
        lastStudyDate: null
    };
}


function saveStats(stats) {

    localStorage.setItem(
        "mhtcetStats",
        JSON.stringify(stats)
    );
}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    updateDashboard();

    generateMockTests();

});


/* =========================================================
   HOME
========================================================= */

function goHome() {

    stopTimer();

    showPage("home");

    updateDashboard();
}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const stats = getStats();

    const questionsElement =
        getElement("questionsAttempted");

    const testsElement =
        getElement("testsCompleted");

    const accuracyElement =
        getElement("accuracy");

    const streakElement =
        getElement("studyStreak");


    if (questionsElement) {
        questionsElement.textContent =
            stats.questionsAttempted;
    }


    if (testsElement) {
        testsElement.textContent =
            stats.testsCompleted;
    }


    let accuracy = 0;

    if (stats.questionsAttempted > 0) {

        accuracy = Math.round(
            (stats.correct /
                stats.questionsAttempted) * 100
        );
    }


    if (accuracyElement) {
        accuracyElement.textContent =
            accuracy + "%";
    }


    if (streakElement) {
        streakElement.textContent =
            stats.studyStreak;
    }
}


/* =========================================================
   STUDY STREAK
========================================================= */

function updateStudyStreak() {

    const stats = getStats();

    const today =
        new Date().toISOString().split("T")[0];


    if (stats.lastStudyDate === today) {
        return;
    }


    if (!stats.lastStudyDate) {

        stats.studyStreak = 1;

    } else {

        const last =
            new Date(stats.lastStudyDate);

        const current =
            new Date(today);

        const difference =
            Math.floor(
                (current - last) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 1) {
            stats.studyStreak++;
        } else {
            stats.studyStreak = 1;
        }
    }


    stats.lastStudyDate = today;

    saveStats(stats);
}


/* =========================================================
   HOME NAVIGATION
========================================================= */

function showPractice() {

    showPage("practice");

    const subject =
        getElement("subjectSelection");

    const chapter =
        getElement("chapterSection");

    const difficulty =
        getElement("difficultySection");

    const question =
        getElement("practiceQuestion");


    if (subject) subject.style.display = "block";
    if (chapter) chapter.style.display = "none";
    if (difficulty) difficulty.style.display = "none";
    if (question) question.style.display = "none";
}


function showMockTests() {

    showPage("mockTests");

    generateMockTests();
}


function showPYQ() {

    showPage("pyq");

    generatePYQList();
}


function showPerformance() {

    showPage("performance");

    updatePerformance();
}


function showInstructions() {

    showPage("instructions");
}


/* =========================================================
   SUBJECT SELECTION
========================================================= */

function selectSubject(subject) {

    currentSubject = subject;

    const selectedSubject =
        getElement("selectedSubject");

    if (selectedSubject) {
        selectedSubject.textContent = subject;
    }


    const subjectSelection =
        getElement("subjectSelection");

    const chapterSection =
        getElement("chapterSection");

    const difficultySection =
        getElement("difficultySection");

    const practiceQuestion =
        getElement("practiceQuestion");


    if (subjectSelection)
        subjectSelection.style.display = "none";

    if (chapterSection)
        chapterSection.style.display = "block";

    if (difficultySection)
        difficultySection.style.display = "none";

    if (practiceQuestion)
        practiceQuestion.style.display = "none";


    generateChapterList(subject);
}


/* =========================================================
   CHAPTER LIST
========================================================= */

function generateChapterList(subject) {

    const chapterList =
        getElement("chapterList");


    if (!chapterList) {
        return;
    }


    chapterList.innerHTML = "";


    if (
        typeof questions === "undefined" ||
        !Array.isArray(questions)
    ) {

        chapterList.innerHTML =
            "<p>Question bank not loaded.</p>";

        return;
    }


    const chapters = [];


    questions.forEach(function(q) {

        if (
            q.subject === subject &&
            !chapters.includes(q.chapter)
        ) {
            chapters.push(q.chapter);
        }

    });


    if (chapters.length === 0) {

        chapterList.innerHTML =
            "<p>No chapters available.</p>";

        return;
    }


    chapters.forEach(function(chapter) {

        const card =
            document.createElement("div");

        card.className =
            "chapter-card";


        const count =
            questions.filter(function(q) {

                return (
                    q.subject === subject &&
                    q.chapter === chapter
                );

            }).length;


        card.innerHTML = `
            <h3>${chapter}</h3>
            <p>${count} questions available</p>
        `;


        card.onclick = function() {
            selectChapter(chapter);
        };


        chapterList.appendChild(card);

    });
}


/* =========================================================
   BACK TO SUBJECTS
========================================================= */

function backToSubjects() {

    const subjectSelection =
        getElement("subjectSelection");

    const chapterSection =
        getElement("chapterSection");

    const difficultySection =
        getElement("difficultySection");

    const practiceQuestion =
        getElement("practiceQuestion");


    if (subjectSelection)
        subjectSelection.style.display = "block";

    if (chapterSection)
        chapterSection.style.display = "none";

    if (difficultySection)
        difficultySection.style.display = "none";

    if (practiceQuestion)
        practiceQuestion.style.display = "none";
}


/* =========================================================
   CHAPTER SELECTION
========================================================= */

function selectChapter(chapter) {

    currentChapter = chapter;

    const selectedChapter =
        getElement("selectedChapter");

    if (selectedChapter) {
        selectedChapter.textContent = chapter;
    }


    const chapterSection =
        getElement("chapterSection");

    const difficultySection =
        getElement("difficultySection");


    if (chapterSection)
        chapterSection.style.display = "none";

    if (difficultySection)
        difficultySection.style.display = "block";
}


function backToChapters() {

    const difficultySection =
        getElement("difficultySection");

    const chapterSection =
        getElement("chapterSection");


    if (difficultySection)
        difficultySection.style.display = "none";

    if (chapterSection)
        chapterSection.style.display = "block";
}


/* =========================================================
   START CHAPTER PRACTICE
========================================================= */

function startChapterPractice(difficulty) {

    currentDifficulty = difficulty;


    if (
        typeof questions === "undefined" ||
        !Array.isArray(questions)
    ) {

        alert("Question bank not loaded.");

        return;
    }


    practiceQuestions =
        questions.filter(function(q) {

            return (
                q.type === "practice" &&
                q.subject === currentSubject &&
                q.chapter === currentChapter &&
                q.difficulty === difficulty
            );

        });


    if (practiceQuestions.length === 0) {

        alert(
            "No " +
            difficulty +
            " questions are available for this chapter."
        );

        return;
    }


    currentPracticeIndex = 0;


    const difficultySection =
        getElement("difficultySection");

    const practiceQuestion =
        getElement("practiceQuestion");


    if (difficultySection)
        difficultySection.style.display = "none";

    if (practiceQuestion)
        practiceQuestion.style.display = "block";


    showPracticeQuestion();
}


/* =========================================================
   SHOW PRACTICE QUESTION
========================================================= */

function showPracticeQuestion() {

    const q =
        practiceQuestions[currentPracticeIndex];


    if (!q) {
        return;
    }


    const number =
        getElement("practiceQuestionNumber");

    const chapter =
        getElement("practiceChapter");

    const difficulty =
        getElement("practiceDifficulty");

    const questionText =
        getElement("practiceQuestionText");


    if (number) {

        number.textContent =
            "Question " +
            (currentPracticeIndex + 1) +
            " of " +
            practiceQuestions.length;
    }


    if (chapter) {
        chapter.textContent = q.chapter;
    }


    if (difficulty) {
        difficulty.textContent = q.difficulty;
    }


    if (questionText) {
        questionText.textContent = q.question;
    }


    const optionsContainer =
        getElement("practiceOptions");


    if (!optionsContainer) {
        return;
    }


    optionsContainer.innerHTML = "";


    q.options.forEach(function(option, index) {

        const button =
            document.createElement("button");


        button.className = "option";


        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;


        button.onclick = function() {

            answerPracticeQuestion(index);

        };


        optionsContainer.appendChild(button);

    });


    const feedback =
        getElement("practiceFeedback");


    if (feedback) {
        feedback.innerHTML = "";
    }
}


/* =========================================================
   PRACTICE ANSWER
========================================================= */

function answerPracticeQuestion(selectedIndex) {

    const q =
        practiceQuestions[currentPracticeIndex];


    if (!q) {
        return;
    }


    const options =
        document.querySelectorAll(
            "#practiceOptions .option"
        );


    options.forEach(function(option) {
        option.disabled = true;
    });


    const feedback =
        getElement("practiceFeedback");


    if (selectedIndex === q.answer) {

        if (options[selectedIndex]) {
            options[selectedIndex]
                .classList.add("correct");
        }


        if (feedback) {

            feedback.innerHTML = `
                <strong>Correct! ✓</strong>
                <br><br>
                ${q.explanation || ""}
            `;

            feedback.style.background = "#ecfdf3";
            feedback.style.color = "#166534";
        }

    } else {

        if (options[selectedIndex]) {
            options[selectedIndex]
                .classList.add("wrong");
        }


        if (options[q.answer]) {
            options[q.answer]
                .classList.add("correct");
        }


        if (feedback) {

            feedback.innerHTML = `
                <strong>Incorrect ✗</strong>
                <br><br>
                Correct answer:
                ${q.options[q.answer]}
                <br><br>
                ${q.explanation || ""}
            `;

            feedback.style.background = "#fef2f2";
            feedback.style.color = "#991b1b";
        }
    }


    updateStudyStreak();


    const stats = getStats();

    stats.questionsAttempted++;


    if (selectedIndex === q.answer) {
        stats.correct++;
    } else {
        stats.wrong++;
    }


    saveStats(stats);

    updateDashboard();
}


/* =========================================================
   PRACTICE NAVIGATION
========================================================= */

function previousPracticeQuestion() {

    if (currentPracticeIndex > 0) {

        currentPracticeIndex--;

        showPracticeQuestion();
    }
}


function nextPracticeQuestion() {

    if (
        currentPracticeIndex <
        practiceQuestions.length - 1
    ) {

        currentPracticeIndex++;

        showPracticeQuestion();

    } else {

        alert(
            "You have reached the end of this practice set."
        );
    }
}


function backToDifficulty() {

    const practiceQuestion =
        getElement("practiceQuestion");

    const difficultySection =
        getElement("difficultySection");


    if (practiceQuestion)
        practiceQuestion.style.display = "none";

    if (difficultySection)
        difficultySection.style.display = "block";
}


/* =========================================================
   MOCK TEST LIST
========================================================= */

function generateMockTests() {

    const container =
        getElement("mockTestList");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    for (let i = 1; i <= 50; i++) {

        const card =
            document.createElement("div");

        card.className = "test-card";


        card.innerHTML = `
            <h3>Mock Test ${String(i).padStart(2, "0")}</h3>

            <p>
                Full MHT-CET-style practice test
                with timer and question navigation.
            </p>

            <button onclick="startMockTest(${i})">
                Start Test
            </button>
        `;


        container.appendChild(card);
    }
}


/* =========================================================
   START MOCK TEST
========================================================= */

function startMockTest(testNumber) {

    if (
        typeof questions === "undefined" ||
        !questions.length
    ) {

        alert("Question bank is empty.");

        return;
    }


    currentTestName =
        "MHT-CET Mock Test " +
        String(testNumber).padStart(2, "0");


    /*
      Current master bank contains 1680 practice slots.
      Until verified full mock questions are added,
      this creates a 150-question timed practice test.
    */

    examQuestions =
        shuffleArray(
            questions.filter(function(q) {
                return q.type === "practice";
            }).slice()
        ).slice(0, 150);


    startExamWithQuestions(
        examQuestions,
        currentTestName
    );
}


/* =========================================================
   START EXAM
========================================================= */

function startExam() {

    startMockTest(1);
}


function startExamWithQuestions(
    questionSet,
    testName
) {

    examQuestions =
        questionSet || [];


    currentTestName =
        testName || "MHT-CET Mock Test";


    if (!examQuestions.length) {

        alert("No questions available.");

        return;
    }


    currentQuestionIndex = 0;


    userAnswers =
        new Array(
            examQuestions.length
        ).fill(null);


    markedForReview =
        new Array(
            examQuestions.length
        ).fill(false);


    /*
      180-minute practice timer.
    */

    timeRemaining = 180 * 60;


    showPage("exam");


    const examTitle =
        getElement("examTitle");


    if (examTitle) {
        examTitle.textContent =
            currentTestName;
    }


    createQuestionPalette();

    showExamQuestion();

    startTimer();
}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }


    return array;
}


/* =========================================================
   EXAM QUESTION
========================================================= */

function showExamQuestion() {

    const q =
        examQuestions[currentQuestionIndex];


    if (!q) {
        return;
    }


    const questionNumber =
        getElement("questionNumber");

    const subjectName =
        getElement("subjectName");

    const questionText =
        getElement("questionText");


    if (questionNumber) {

        questionNumber.textContent =
            "Question " +
            (currentQuestionIndex + 1) +
            " of " +
            examQuestions.length;
    }


    if (subjectName) {
        subjectName.textContent =
            q.subject;
    }


    if (questionText) {
        questionText.textContent =
            q.question;
    }


    const optionsContainer =
        getElement("options");


    if (!optionsContainer) {
        return;
    }


    optionsContainer.innerHTML = "";


    q.options.forEach(function(option, index) {

        const button =
            document.createElement("button");


        button.className = "option";


        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;


        if (
            userAnswers[currentQuestionIndex] === index
        ) {

            button.classList.add("selected");
        }


        button.onclick = function() {

            selectExamAnswer(index);

        };


        optionsContainer.appendChild(button);

    });


    updateQuestionStatus();

    updateQuestionPalette();
}


/* =========================================================
   EXAM ANSWER
========================================================= */

function selectExamAnswer(index) {

    userAnswers[currentQuestionIndex] =
        index;


    showExamQuestion();
}


/* =========================================================
   CLEAR RESPONSE
========================================================= */

function clearResponse() {

    userAnswers[currentQuestionIndex] =
        null;


    showExamQuestion();
}


/* =========================================================
   MARK FOR REVIEW
========================================================= */

function toggleMarkForReview() {

    markedForReview[currentQuestionIndex] =
        !markedForReview[currentQuestionIndex];


    updateQuestionStatus();

    updateQuestionPalette();
}


/* =========================================================
   QUESTION STATUS
========================================================= */

function updateQuestionStatus() {

    const status =
        getElement("questionStatus");


    if (!status) {
        return;
    }


    if (markedForReview[currentQuestionIndex]) {

        status.textContent =
            "Marked for Review";

    } else if (
        userAnswers[currentQuestionIndex] !== null
    ) {

        status.textContent =
            "Answered";

    } else {

        status.textContent =
            "Not Answered";
    }
}


/* =========================================================
   QUESTION PALETTE
========================================================= */

function createQuestionPalette() {

    const palette =
        getElement("questionPalette");


    if (!palette) {
        return;
    }


    palette.innerHTML = "";


    examQuestions.forEach(function(q, index) {

        const button =
            document.createElement("button");


        button.textContent =
            index + 1;


        button.className =
            "palette-question";


        button.onclick = function() {

            currentQuestionIndex =
                index;

            showExamQuestion();

        };


        palette.appendChild(button);

    });
}


function updateQuestionPalette() {

    const palette =
        getElement("questionPalette");


    if (!palette) {
        return;
    }


    const buttons =
        palette.querySelectorAll("button");


    buttons.forEach(function(button, index) {

        button.classList.remove(
            "answered",
            "review",
            "current"
        );


        if (
            index === currentQuestionIndex
        ) {

            button.classList.add(
                "current"
            );
        }


        if (
            markedForReview[index]
        ) {

            button.classList.add(
                "review"
            );

        } else if (
            userAnswers[index] !== null
        ) {

            button.classList.add(
                "answered"
            );
        }

    });
}


/* =========================================================
   PREVIOUS / NEXT EXAM QUESTION
========================================================= */

function previousQuestion() {

    if (currentQuestionIndex > 0) {

        currentQuestionIndex--;

        showExamQuestion();
    }
}


function nextQuestion() {

    if (
        currentQuestionIndex <
        examQuestions.length - 1
    ) {

        currentQuestionIndex++;

        showExamQuestion();

    } else {

        alert(
            "This is the last question."
        );
    }
}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    stopTimer();


    updateTimerDisplay();


    timerInterval =
        setInterval(function() {

            timeRemaining--;


            updateTimerDisplay();


            if (timeRemaining <= 0) {

                stopTimer();

                alert(
                    "Time is over. Your test will be submitted."
                );

                submitExam();
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
        getElement("timer");


    if (!timer) {
        return;
    }


    const hours =
        Math.floor(
            timeRemaining / 3600
        );


    const minutes =
        Math.floor(
            (timeRemaining % 3600) / 60
        );


    const seconds =
        timeRemaining % 60;


    timer.textContent =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


/* =========================================================
   SUBMIT EXAM
========================================================= */

function submitExam() {

    stopTimer();


    let correct = 0;
    let wrong = 0;
    let unanswered = 0;


    examQuestions.forEach(function(q, index) {

        const answer =
            userAnswers[index];


        if (answer === null) {

            unanswered++;

        } else if (
            answer === q.answer
        ) {

            correct++;

        } else {

            wrong++;
        }

    });


    const attempted =
        correct + wrong;


    const total =
        examQuestions.length;


    const accuracy =
        attempted > 0
            ? Math.round(
                (correct / attempted) * 100
            )
            : 0;


    /*
      Practice scoring:
      Each question is counted as one point.
      This keeps the engine simple until the
      final verified exam marking scheme is set.
    */

    const score = correct;


    lastResult = {

        testName: currentTestName,

        total: total,

        correct: correct,

        wrong: wrong,

        unanswered: unanswered,

        attempted: attempted,

        accuracy: accuracy,

        score: score,

        date: new Date().toLocaleString()

    };


    saveTestStats(
        attempted,
        correct,
        wrong
    );


    showResult();
}


/* =========================================================
   SAVE TEST STATS
========================================================= */

function saveTestStats(
    attempted,
    correct,
    wrong
) {

    const stats =
        getStats();


    stats.questionsAttempted +=
        attempted;


    stats.correct +=
        correct;


    stats.wrong +=
        wrong;


    stats.testsCompleted++;


    updateStudyStreak();


    saveStats(stats);

    updateDashboard();
}


/* =========================================================
   RESULT PAGE
========================================================= */

function showResult() {

    showPage("result");


    if (!lastResult) {
        return;
    }


    setText(
        "resultTestName",
        lastResult.testName
    );


    setText(
        "resultScore",
        lastResult.score
    );


    setText(
        "resultTotal",
        lastResult.total
    );


    setText(
        "resultCorrect",
        lastResult.correct
    );


    setText(
        "resultWrong",
        lastResult.wrong
    );


    setText(
        "resultUnanswered",
        lastResult.unanswered
    );


    setText(
        "resultAccuracy",
        lastResult.accuracy + "%"
    );
}


function setText(id, value) {

    const element =
        getElement(id);


    if (element) {
        element.textContent = value;
    }
}


/* =========================================================
   PERFORMANCE
========================================================= */

function updatePerformance() {

    const stats =
        getStats();


    const accuracy =
        stats.questionsAttempted > 0
            ? Math.round(
                (stats.correct /
                    stats.questionsAttempted) * 100
            )
            : 0;


    setText(
        "performanceAttempted",
        stats.questionsAttempted
    );


    setText(
        "performanceTests",
        stats.testsCompleted
    );


    setText(
        "performanceCorrect",
        stats.correct
    );


    setText(
        "performanceWrong",
        stats.wrong
    );


    setText(
        "performanceAccuracy",
        accuracy + "%"
    );


    setText(
        "performanceStreak",
        stats.studyStreak
    );
}


/* =========================================================
   PYQ PAGE
========================================================= */

function generatePYQList() {

    const container =
        getElement("pyqList");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const years = [
        2022,
        2023,
        2024,
        2025,
        2026
    ];


    years.forEach(function(year) {

        const card =
            document.createElement("div");


        card.className =
            "test-card";


        card.innerHTML = `
            <h3>MHT-CET ${year} PYQ</h3>

            <p>
                Previous-year question test.
            </p>

            <button onclick="startPYQ(${year})">
                Open PYQ
            </button>
        `;


        container.appendChild(card);

    });
}


/* =========================================================
   START PYQ
========================================================= */

function startPYQ(year) {

    /*
      The current master file contains the PYQ
      structure but does not contain verified
      historical paper questions yet.
    */

    alert(
        "The " +
        year +
        " PYQ section is ready for verified question data."
    );
}


/* =========================================================
   EXIT EXAM
========================================================= */

function exitExam() {

    const confirmExit =
        confirm(
            "Are you sure you want to exit this test?"
        );


    if (!confirmExit) {
        return;
    }


    stopTimer();

    showPage("home");

    updateDashboard();
}


/* =========================================================
   RESULT NAVIGATION
========================================================= */

function retryTest() {

    if (!examQuestions.length) {
        return;
    }


    startExamWithQuestions(
        [...examQuestions],
        currentTestName
    );
}


function resultHome() {

    stopTimer();

    showPage("home");

    updateDashboard();
}


/* =========================================================
   RESET PERFORMANCE
========================================================= */

function resetPerformance() {

    const confirmed =
        confirm(
            "Reset all performance statistics?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "mhtcetStats"
    );


    updateDashboard();

    updatePerformance();
}


/* =========================================================
   SAFETY CHECK
========================================================= */

console.log(
    "MHT-CET Portal loaded successfully."
);


if (typeof questions !== "undefined") {

    console.log(
        "Questions loaded:",
        questions.length
    );

} else {

    console.warn(
        "questions.js was not loaded."
    );
}
