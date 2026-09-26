```javascript
/* =========================================================
   MHT-CET 2027 PRACTICE PORTAL
   Main Application
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
   STORAGE
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
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateDashboard();

    generateMockTests();

});


/* =========================================================
   PAGE MANAGEMENT
========================================================= */

function hideAllPages() {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {
        page.style.display = "none";
    });
}


function showPage(id) {

    hideAllPages();

    const page = document.getElementById(id);

    if (page) {
        page.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


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
        document.getElementById("questionsAttempted");

    const testsElement =
        document.getElementById("testsCompleted");

    const accuracyElement =
        document.getElementById("accuracy");

    const streakElement =
        document.getElementById("studyStreak");


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

        accuracy =
            Math.round(
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
   HOME BUTTONS
========================================================= */

function showPractice() {

    showPage("practice");

    document.getElementById(
        "subjectSelection"
    ).style.display = "block";

    document.getElementById(
        "chapterSection"
    ).style.display = "none";

    document.getElementById(
        "difficultySection"
    ).style.display = "none";

    document.getElementById(
        "practiceQuestion"
    ).style.display = "none";
}


function showMockTests() {

    showPage("mockTests");

    generateMockTests();
}


function showPYQ() {

    showPage("pyq");
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

    document.getElementById(
        "selectedSubject"
    ).textContent = subject;


    document.getElementById(
        "subjectSelection"
    ).style.display = "none";


    document.getElementById(
        "chapterSection"
    ).style.display = "block";


    document.getElementById(
        "difficultySection"
    ).style.display = "none";


    document.getElementById(
        "practiceQuestion"
    ).style.display = "none";


    generateChapterList(subject);
}


/* =========================================================
   CHAPTER LIST
========================================================= */

function generateChapterList(subject) {

    const chapterList =
        document.getElementById("chapterList");

    chapterList.innerHTML = "";


    if (typeof questions === "undefined") {

        chapterList.innerHTML =
            "<p>Question bank not loaded.</p>";

        return;
    }


    const chapters = [];


    questions.forEach(function (q) {

        if (
            q.subject === subject &&
            !chapters.includes(q.chapter)
        ) {

            chapters.push(q.chapter);
        }
    });


    if (chapters.length === 0) {

        chapterList.innerHTML =
            "<p>No chapters available yet.</p>";

        return;
    }


    chapters.forEach(function (chapter) {

        const card =
            document.createElement("div");

        card.className = "chapter-card";


        const count =
            questions.filter(function (q) {

                return (
                    q.subject === subject &&
                    q.chapter === chapter
                );

            }).length;


        card.innerHTML = `
            <h3>${chapter}</h3>
            <p>${count} questions available</p>
        `;


        card.onclick = function () {

            selectChapter(chapter);
        };


        chapterList.appendChild(card);

    });
}


/* =========================================================
   BACK TO SUBJECTS
========================================================= */

function backToSubjects() {

    document.getElementById(
        "subjectSelection"
    ).style.display = "block";


    document.getElementById(
        "chapterSection"
    ).style.display = "none";


    document.getElementById(
        "difficultySection"
    ).style.display = "none";


    document.getElementById(
        "practiceQuestion"
    ).style.display = "none";
}


/* =========================================================
   CHAPTER SELECTION
========================================================= */

function selectChapter(chapter) {

    currentChapter = chapter;

    document.getElementById(
        "selectedChapter"
    ).textContent = chapter;


    document.getElementById(
        "chapterSection"
    ).style.display = "none";


    document.getElementById(
        "difficultySection"
    ).style.display = "block";
}


function backToChapters() {

    document.getElementById(
        "difficultySection"
    ).style.display = "none";


    document.getElementById(
        "chapterSection"
    ).style.display = "block";
}


/* =========================================================
   START CHAPTER PRACTICE
========================================================= */

function startChapterPractice(difficulty) {

    currentDifficulty = difficulty;


    if (typeof questions === "undefined") {

        alert("Question bank not loaded.");

        return;
    }


    practiceQuestions =
        questions.filter(function (q) {

            return (
                q.subject === currentSubject &&
                q.chapter === currentChapter &&
                (
                    !q.difficulty ||
                    q.difficulty === difficulty
                )
            );

        });


    /*
       Until the full difficulty-tagged question bank
       is added, questions without a difficulty tag
       will still appear.
    */


    if (practiceQuestions.length === 0) {

        alert(
            "No " +
            difficulty +
            " questions are available for this chapter yet."
        );

        return;
    }


    currentPracticeIndex = 0;


    document.getElementById(
        "difficultySection"
    ).style.display = "none";


    document.getElementById(
        "practiceQuestion"
    ).style.display = "block";


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


    document.getElementById(
        "practiceQuestionNumber"
    ).textContent =
        "Question " +
        (currentPracticeIndex + 1) +
        " of " +
        practiceQuestions.length;


    document.getElementById(
        "practiceChapter"
    ).textContent =
        q.chapter;


    document.getElementById(
        "practiceDifficulty"
    ).textContent =
        q.difficulty || currentDifficulty;


    document.getElementById(
        "practiceQuestionText"
    ).textContent =
        q.question;


    const optionsContainer =
        document.getElementById(
            "practiceOptions"
        );

    optionsContainer.innerHTML = "";


    q.options.forEach(function (option, index) {

        const button =
            document.createElement("button");

        button.className = "option";

        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;


        button.onclick = function () {

            answerPracticeQuestion(
                index
            );

        };


        optionsContainer.appendChild(button);

    });


    document.getElementById(
        "practiceFeedback"
    ).innerHTML = "";
}


/* =========================================================
   PRACTICE ANSWER
========================================================= */

function answerPracticeQuestion(selectedIndex) {

    const q =
        practiceQuestions[currentPracticeIndex];


    const options =
        document.querySelectorAll(
            "#practiceOptions .option"
        );


    options.forEach(function (option) {

        option.disabled = true;

    });


    const feedback =
        document.getElementById(
            "practiceFeedback"
        );


    if (selectedIndex === q.answer) {

        options[selectedIndex]
            .classList.add("correct");


        feedback.innerHTML = `
            <strong>Correct! ✓</strong>
            <br>
            ${q.explanation || ""}
        `;


        feedback.style.background =
            "#ecfdf3";

        feedback.style.color =
            "#166534";


    } else {

        options[selectedIndex]
            .classList.add("wrong");


        options[q.answer]
            .classList.add("correct");


        feedback.innerHTML = `
            <strong>Incorrect ✗</strong>
            <br>
            Correct answer:
            ${q.options[q.answer]}
            <br><br>
            ${q.explanation || ""}
        `;


        feedback.style.background =
            "#fef2f2";

        feedback.style.color =
            "#991b1b";
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

    document.getElementById(
        "practiceQuestion"
    ).style.display = "none";


    document.getElementById(
        "difficultySection"
    ).style.display = "block";
}


/* =========================================================
   MOCK TESTS
========================================================= */

function generateMockTests() {

    const container =
        document.getElementById(
            "mockTestList"
        );


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
        questions.length === 0
    ) {

        alert("Question bank is empty.");

        return;
    }


    currentTestName =
        "MHT-CET Mock Test " +
        String(testNumber).padStart(2, "0");


    /*
       Temporary question selection.

       Once the complete MHT-CET question bank
       is added, this function will use the exact
       test structure we define for the portal.
    */


    examQuestions =
        shuffleArray(
            [...questions]
        ).slice(
            0,
            Math.min(10, questions.length)
        );


    startExamWithQuestions(
        examQuestions,
        currentTestName
    );
}


/* =========================================================
   GENERIC EXAM START
========================================================= */

function startExam() {

    if (
        typeof questions === "undefined" ||
        questions.length === 0
    ) {

        alert("Question bank is empty.");

        return;
    }


    currentTestName =
        "MHT-CET Mock Test";


    examQuestions =
        shuffleArray(
            [...questions]
        ).slice(
            0,
            Math.min(10, questions.length)
        );


    startExamWithQuestions(
        examQuestions,
        currentTestName
    );
}


function startExamWithQuestions(
    questionSet,
    testName
) {

    examQuestions =
        questionSet;


    currentTestName =
        testName;


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
       Temporary timer.

       This will be changed to the final
       MHT-CET timing when we build the
       final full mock-test configuration.
    */

    timeRemaining =
        20 * 60;


    showPage("exam");


    document.getElementById(
        "examTitle"
    ).textContent =
        currentTestName;


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
        examQuestions[
            currentQuestionIndex
        ];


    if (!q) {
        return;
    }


    document.getElementById(
        "questionNumber"
    ).textContent =
        "Question " +
        (currentQuestionIndex + 1) +
        " of " +
        examQuestions.length;


    document.getElementById(
        "subjectName"
    ).textContent =
        q.subject;


    document.getElementById(
        "questionText"
    ).textContent =
        q.question;


    const optionsContainer =
        document.getElementById(
            "options"
        );


    optionsContainer.innerHTML = "";


    q.options.forEach(function (
        option,
        index
    ) {

        const button =
            document.createElement("button");

        button.className =
            "option";


        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;


        if (
            userAnswers[
                currentQuestionIndex
            ] === index
        ) {

            button.classList.add(
                "selected"
            );
        }


        button.onclick = function () {

            selectExamAnswer(index);

        };


        optionsContainer.appendChild(
            button
        );

    });


    updateQuestionStatus();

    updateQuestionPalette();
}


/* ==============================================*
```
