// ======================================================
// MHT-CET 2027 PRACTICE PORTAL - COMPLETE APP.JS
// ======================================================


// ======================================================
// PAGE NAVIGATION
// ======================================================

function hideAllSections() {
    document.getElementById("home").style.display = "none";
    document.getElementById("practice").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("exam").style.display = "none";
    document.getElementById("result").style.display = "none";
}


// ======================================================
// DASHBOARD
// ======================================================

function goHome() {
    hideAllSections();

    document.getElementById("home").style.display = "block";

    updateDashboard();
}


// ======================================================
// PRACTICE VARIABLES
// ======================================================

let selectedSubject = "";
let selectedChapter = "";
let practiceQuestions = [];
let currentPracticeQuestion = 0;
let selectedPracticeAnswer = null;


// ======================================================
// OPEN PRACTICE
// ======================================================

function showPractice() {

    hideAllSections();

    document.getElementById("practice").style.display = "block";

    document.getElementById("practiceSubjects").style.display = "block";
    document.getElementById("chapterSection").style.display = "none";
    document.getElementById("practiceQuestion").style.display = "none";
}


// ======================================================
// SELECT SUBJECT
// ======================================================

function selectSubject(subject) {

    selectedSubject = subject;

    document.getElementById("practiceSubjects").style.display = "none";
    document.getElementById("chapterSection").style.display = "block";

    document.getElementById("selectedSubject").textContent =
        subject + " Chapters";

    createChapterList(subject);
}


// ======================================================
// CHAPTER LIST
// ======================================================

function createChapterList(subject) {

    const chapterList = document.getElementById("chapterList");

    chapterList.innerHTML = "";

    let chapters = [];


    if (subject === "Physics") {

        chapters = [
            "Units and Measurements",
            "Motion",
            "Laws of Motion",
            "Work, Energy and Power",
            "Rotational Motion",
            "Gravitation",
            "Properties of Matter",
            "Thermal Properties",
            "Oscillations",
            "Waves",
            "Electrostatics",
            "Current Electricity",
            "Magnetic Effects of Current",
            "Electromagnetic Induction",
            "Ray Optics",
            "Modern Physics"
        ];

    }


    else if (subject === "Chemistry") {

        chapters = [
            "Some Basic Concepts of Chemistry",
            "Structure of Atom",
            "Periodic Table",
            "Chemical Bonding",
            "States of Matter",
            "Thermodynamics",
            "Equilibrium",
            "Redox Reactions",
            "Organic Chemistry Basics",
            "Hydrocarbons",
            "Solutions",
            "Electrochemistry",
            "Chemical Kinetics",
            "Coordination Compounds"
        ];

    }


    else if (subject === "Mathematics") {

        chapters = [
            "Trigonometry",
            "Straight Lines",
            "Circles",
            "Vectors",
            "Three Dimensional Geometry",
            "Probability",
            "Matrices",
            "Determinants",
            "Limits",
            "Continuity",
            "Differentiation",
            "Integration",
            "Differential Equations"
        ];

    }


    chapters.forEach(function(chapter) {

        const button = document.createElement("button");

        button.className = "chapter-button";

        button.textContent = chapter;

        button.onclick = function() {
            selectChapter(chapter);
        };

        chapterList.appendChild(button);

    });
}


// ======================================================
// SELECT CHAPTER
// ======================================================

function selectChapter(chapter) {

    selectedChapter = chapter;

    document.getElementById("chapterSection").style.display = "none";
    document.getElementById("practiceQuestion").style.display = "block";

    document.getElementById("practiceChapter").textContent =
        chapter;

    loadPracticeQuestions();
}


// ======================================================
// LOAD PRACTICE QUESTIONS
// ======================================================

function loadPracticeQuestions() {

    currentPracticeQuestion = 0;
    selectedPracticeAnswer = null;

    practiceQuestions = [];


    // questions.js must contain a variable called "questions"
    if (typeof questions !== "undefined" && Array.isArray(questions)) {

        practiceQuestions = questions.filter(function(q) {

            return q.subject === selectedSubject &&
                (
                    !q.chapter ||
                    q.chapter === selectedChapter
                );

        });

    }


    // If no questions are available
    if (practiceQuestions.length === 0) {

        practiceQuestions = [

            {
                subject: selectedSubject,
                chapter: selectedChapter,

                question:
                    "Practice questions for this chapter will be added soon.",

                options: [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],

                answer: 0,

                explanation:
                    "Real MHT-CET practice questions will be added to this chapter."
            }

        ];

    }


    showPracticeQuestion();
}


// ======================================================
// SHOW PRACTICE QUESTION
// ======================================================

function showPracticeQuestion() {

    const q =
        practiceQuestions[currentPracticeQuestion];


    document.getElementById("practiceQuestionNumber").textContent =
        "Question " +
        (currentPracticeQuestion + 1) +
        " / " +
        practiceQuestions.length;


    document.getElementById("practiceChapter").textContent =
        selectedChapter;


    document.getElementById("practiceQuestionText").textContent =
        q.question;


    const optionsContainer =
        document.getElementById("practiceOptions");


    optionsContainer.innerHTML = "";


    selectedPracticeAnswer = null;


    q.options.forEach(function(option, index) {

        const button =
            document.createElement("button");


        button.className =
            "practice-option";


        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;


        button.onclick = function() {

            checkPracticeAnswer(index);

        };


        optionsContainer.appendChild(button);

    });


    document.getElementById("practiceFeedback").style.display =
        "none";
}


// ======================================================
// CHECK PRACTICE ANSWER
// ======================================================

function checkPracticeAnswer(index) {

    const q =
        practiceQuestions[currentPracticeQuestion];


    const feedback =
        document.getElementById("practiceFeedback");


    if (selectedPracticeAnswer !== null) {
        return;
    }


    selectedPracticeAnswer = index;


    if (index === q.answer) {

        savePracticeProgress(true);

        feedback.style.display = "block";

        feedback.innerHTML =
            "✅ <strong>Correct!</strong><br><br>" +
            (q.explanation || "Good job!");

    }

    else {

        savePracticeProgress(false);

        feedback.style.display = "block";

        feedback.innerHTML =
            "❌ <strong>Incorrect.</strong><br><br>" +
            "Correct answer: " +
            q.options[q.answer] +
            "<br><br>" +
            (q.explanation || "");

    }


    updateDashboard();
}


// ======================================================
// NEXT QUESTION
// ======================================================

function nextPracticeQuestion() {

    if (
        currentPracticeQuestion <
        practiceQuestions.length - 1
    ) {

        currentPracticeQuestion++;

        showPracticeQuestion();

    }

    else {

        alert("🎉 You have completed this chapter!");

        goHome();

    }
}


// ======================================================
// PREVIOUS QUESTION
// ======================================================

function previousPracticeQuestion() {

    if (currentPracticeQuestion > 0) {

        currentPracticeQuestion--;

        showPracticeQuestion();

    }
}


// ======================================================
// BACK TO SUBJECTS
// ======================================================

function backToSubjects() {

    document.getElementById("chapterSection").style.display =
        "none";

    document.getElementById("practiceQuestion").style.display =
        "none";

    document.getElementById("practiceSubjects").style.display =
        "block";
}


// ======================================================
// BACK TO CHAPTERS
// ======================================================

function backToChapters() {

    document.getElementById("practiceQuestion").style.display =
        "none";

    document.getElementById("chapterSection").style.display =
        "block";
}


// ======================================================
// MOCK TEST INSTRUCTIONS
// ======================================================

function showInstructions() {

    hideAllSections();

    document.getElementById("instructions").style.display =
        "block";
}


// ======================================================
// START MOCK TEST
// ======================================================

function startExam() {

    hideAllSections();

    document.getElementById("exam").style.display =
        "block";


    if (typeof createNumberButtons === "function") {
        createNumberButtons();
    }


    if (typeof showQuestion === "function") {
        showQuestion();
    }


    if (typeof startTimer === "function") {
        startTimer();
    }

}


// ======================================================
// PRACTICE PROGRESS
// ======================================================

function savePracticeProgress(isCorrect) {

    let progress =
        getPracticeProgress();


    progress.attempted++;


    if (isCorrect) {

        progress.correct++;

    }

    else {

        progress.wrong++;

    }


    updateStudyStreak();


    localStorage.setItem(
        "mhcetProgress",
        JSON.stringify(progress)
    );
}


// ======================================================
// GET PRACTICE PROGRESS
// ======================================================

function getPracticeProgress() {

    const saved =
        localStorage.getItem("mhcetProgress");


    if (saved) {

        try {

            return JSON.parse(saved);

        }

        catch (error) {

            console.log(
                "Progress data reset."
            );

        }

    }


    return {

        attempted: 0,
        correct: 0,
        wrong: 0

    };
}


// ======================================================
// ACCURACY
// ======================================================

function getAccuracy() {

    const progress =
        getPracticeProgress();


    if (progress.attempted === 0) {
        return 0;
    }


    return Math.round(
        (
            progress.correct /
            progress.attempted
        ) * 100
    );
}


// ======================================================
// STUDY STREAK
// ======================================================

function updateStudyStreak() {

    const today =
        new Date();


    today.setHours(0, 0, 0, 0);


    const todayString =
        today.toDateString();


    const lastDateString =
        localStorage.getItem(
            "lastPracticeDate"
        );


    let streak =
        Number(
            localStorage.getItem(
                "studyStreak"
            )
        ) || 0;


    // First practice ever
    if (!lastDateString) {

        streak = 1;

    }


    else if (
        lastDateString === todayString
    ) {

        // Already practiced today
        // Do not increase streak

    }


    else {

        const lastDate =
            new Date(lastDateString);


        lastDate.setHours(0, 0, 0, 0);


        const difference =
            Math.floor(
                (
                    today -
                    lastDate
                ) /
                (1000 * 60 * 60 * 24)
            );


        if (difference === 1) {

            // Practiced yesterday
            streak++;

        }

        else {

            // Missed one or more days
            streak = 1;

        }

    }


    localStorage.setItem(
        "studyStreak",
        streak
    );


    localStorage.setItem(
        "lastPracticeDate",
        todayString
    );
}


// ======================================================
// DASHBOARD UPDATE
// ======================================================

function updateDashboard() {

    const progress =
        getPracticeProgress();


    // Questions Attempted
    const questionsAttempted =
        document.getElementById(
            "questionsAttempted"
        );


    if (questionsAttempted) {

        questionsAttempted.textContent =
            progress.attempted;

    }


    // Tests Completed
    const testsCompleted =
        document.getElementById(
            "testsCompleted"
        );


    if (testsCompleted) {

        testsCompleted.textContent =
            Number(
                localStorage.getItem(
                    "testsCompleted"
                )
            ) || 0;

    }


    // Accuracy
    const accuracy =
        document.getElementById(
            "accuracy"
        );


    if (accuracy) {

        accuracy.textContent =
            getAccuracy() + "%";

    }


    // Study Streak
    const studyStreak =
        document.getElementById(
            "studyStreak"
        );


    if (studyStreak) {

        studyStreak.textContent =
            (
                Number(
                    localStorage.getItem(
                        "studyStreak"
                    )
                ) || 0
            ) +
            " Days";

    }
}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Make sure old progress is valid
        getPracticeProgress();

        updateDashboard();

        goHome();

    }
);
