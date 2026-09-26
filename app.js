/* =========================================================
   MHT-CET 2027 PRACTICE PORTAL
   app.js
========================================================= */

(() => {

    "use strict";

    /* -----------------------------------------------------
       DATA FROM questions.js
    ----------------------------------------------------- */

    const questionBank = window.questions || [];
    const chapters = window.chapterCatalog || {};
    const mockTests = window.mockTests || [];
    const pyqTests = window.pyqTests || [];


    /* -----------------------------------------------------
       APPLICATION STATE
    ----------------------------------------------------- */

    let currentSubject = "";
    let currentChapter = "";

    let practiceQuestions = [];
    let practiceIndex = 0;
    let practiceDifficulty = "All";

    let currentMock = null;

    let examPhase = "pc";
    let examSubject = "Physics";
    let examIndex = 0;

    let examTimer = null;
    let remainingSeconds = 0;

    let examData = {
        Physics: {
            questions: [],
            answers: [],
            marked: []
        },

        Chemistry: {
            questions: [],
            answers: [],
            marked: []
        },

        Mathematics: {
            questions: [],
            answers: [],
            marked: []
        }
    };


    /* -----------------------------------------------------
       LOCAL STORAGE
    ----------------------------------------------------- */

    const STORAGE_KEY = "mhtcet2027_performance";


    function getPerformanceData() {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return {
                attempted: 0,
                correct: 0,
                wrong: 0,
                subject: {
                    Physics: {
                        attempted: 0,
                        correct: 0
                    },
                    Chemistry: {
                        attempted: 0,
                        correct: 0
                    },
                    Mathematics: {
                        attempted: 0,
                        correct: 0
                    }
                },
                mockHistory: []
            };
        }

        try {
            return JSON.parse(saved);
        } catch {
            return {
                attempted: 0,
                correct: 0,
                wrong: 0,
                subject: {
                    Physics: {
                        attempted: 0,
                        correct: 0
                    },
                    Chemistry: {
                        attempted: 0,
                        correct: 0
                    },
                    Mathematics: {
                        attempted: 0,
                        correct: 0
                    }
                },
                mockHistory: []
            };
        }
    }


    function savePerformance(data) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );
    }


    /* =====================================================
       PAGE NAVIGATION
    ===================================================== */

    function showPage(pageName) {

        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });

        const page = document.getElementById(
            `${pageName}Page`
        );

        if (page) {
            page.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       HOME
    ===================================================== */

    function initializePortal() {

        const totalQuestions =
            document.getElementById("totalQuestionsStat");

        const totalChapters =
            document.getElementById("totalChaptersStat");

        if (totalQuestions) {
            totalQuestions.textContent =
                questionBank.length;
        }

        if (totalChapters) {

            let count = 0;

            Object.values(chapters).forEach(list => {
                count += list.length;
            });

            totalChapters.textContent = count;
        }

        updatePerformancePage();

        showPage("home");
    }


    /* =====================================================
       PRACTICE SUBJECTS
    ===================================================== */

    function showPractice() {
        showPage("practice");
    }


    function selectSubject(subject) {

        currentSubject = subject;

        const title =
            document.getElementById("chapterPageTitle");

        const subtitle =
            document.getElementById("chapterPageSubtitle");

        if (title) {
            title.textContent =
                `${subject} Chapters`;
        }

        if (subtitle) {
            subtitle.textContent =
                `Choose a chapter to practice ${subject}.`;
        }

        renderChapters(subject);

        showPage("chapters");
    }


    /* =====================================================
       CHAPTER LIST
    ===================================================== */

    function renderChapters(subject) {

        const container =
            document.getElementById("chapterList");

        if (!container) return;

        container.innerHTML = "";

        const subjectChapters =
            chapters[subject] || [];

        subjectChapters.forEach((chapter, index) => {

            const wrapper =
                document.createElement("div");

            wrapper.className = "chapter-item";

            wrapper.innerHTML = `

                <div class="chapter-info">

                    <div class="chapter-number">
                        ${index + 1}
                    </div>

                    <div>
                        <h3>${escapeHTML(chapter)}</h3>

                        <p>
                            30 Questions •
                            10 Easy •
                            10 Medium •
                            10 Hard
                        </p>
                    </div>

                </div>

                <button>
                    Practice →
                </button>
            `;

            wrapper.querySelector("button")
                .addEventListener("click", () => {
                    startChapterPractice(
                        subject,
                        chapter
                    );
                });

            container.appendChild(wrapper);
        });
    }


    /* =====================================================
       CHAPTER PRACTICE
    ===================================================== */

    function startChapterPractice(
        subject,
        chapter
    ) {

        currentSubject = subject;
        currentChapter = chapter;

        practiceDifficulty = "All";

        practiceQuestions =
            questionBank.filter(q =>
                q.subject === subject &&
                q.chapter === chapter
            );

        practiceIndex = 0;

        if (!practiceQuestions.length) {

            alert(
                "No questions are available for this chapter."
            );

            return;
        }

        document.getElementById(
            "practiceChapterTitle"
        ).textContent = chapter;

        updateDifficultyButtons();

        renderPracticeQuestion();

        showPage("practiceQuestions");
    }


    function filterPracticeDifficulty(
        difficulty
    ) {

        practiceDifficulty = difficulty;

        practiceIndex = 0;

        updateDifficultyButtons();

        renderPracticeQuestion();
    }


    function getFilteredPracticeQuestions() {

        if (practiceDifficulty === "All") {
            return practiceQuestions;
        }

        return practiceQuestions.filter(
            q => q.difficulty === practiceDifficulty
        );
    }


    function updateDifficultyButtons() {

        const buttons = {
            All: "difficultyAll",
            Easy: "difficultyEasy",
            Medium: "difficultyMedium",
            Hard: "difficultyHard"
        };

        Object.keys(buttons).forEach(level => {

            const button =
                document.getElementById(
                    buttons[level]
                );

            if (!button) return;

            button.classList.toggle(
                "active",
                level === practiceDifficulty
            );
        });
    }


    function renderPracticeQuestion() {

        const list =
            getFilteredPracticeQuestions();

        if (!list.length) return;

        if (practiceIndex >= list.length) {
            practiceIndex = list.length - 1;
        }

        if (practiceIndex < 0) {
            practiceIndex = 0;
        }

        const question =
            list[practiceIndex];

        document.getElementById(
            "practiceQuestionNumber"
        ).textContent =
            `Q${practiceIndex + 1}`;

        document.getElementById(
            "practiceProgress"
        ).textContent =
            `Question ${practiceIndex + 1} of ${list.length}`;

        document.getElementById(
            "practiceDifficulty"
        ).textContent =
            question.difficulty;

        document.getElementById(
            "practiceQuestion"
        ).textContent =
            question.question;

        const options =
            document.getElementById(
                "practiceOptions"
            );

        options.innerHTML = "";

        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement("button");

                button.className = "option";

                button.innerHTML = `
                    <strong>
                        ${String.fromCharCode(65 + index)}.
                    </strong>
                    ${escapeHTML(option)}
                `;

                button.addEventListener(
                    "click",
                    () => {

                        showPracticeAnswer(
                            question,
                            index
                        );

                    }
                );

                options.appendChild(button);
            }
        );

        const explanation =
            document.getElementById(
                "practiceExplanation"
            );

        explanation.classList.add("hidden");

        explanation.innerHTML = "";

        renderPracticePalette(list);
    }


    function showPracticeAnswer(
        question,
        selectedIndex
    ) {

        const optionButtons =
            document.querySelectorAll(
                "#practiceOptions .option"
            );

        optionButtons.forEach(
            (button, index) => {

                button.disabled = true;

                if (index === question.answer) {
                    button.classList.add("correct");
                }

                if (
                    index === selectedIndex &&
                    index !== question.answer
                ) {
                    button.classList.add("wrong");
                }
            }
        );

        const explanation =
            document.getElementById(
                "practiceExplanation"
            );

        const correct =
            selectedIndex === question.answer;

        explanation.innerHTML = `
            <strong>
                ${correct ? "Correct! ✓" : "Incorrect ✗"}
            </strong>
            <br><br>
            ${escapeHTML(question.explanation)}
        `;

        explanation.classList.remove("hidden");

        recordPracticePerformance(
            question,
            correct
        );
    }


    function renderPracticePalette(list) {

        const palette =
            document.getElementById(
                "practiceQuestionPalette"
            );

        if (!palette) return;

        palette.innerHTML = "";

        list.forEach((question, index) => {

            const button =
                document.createElement("button");

            button.className =
                "palette-question";

            button.textContent =
                index + 1;

            if (index === practiceIndex) {
                button.classList.add("current");
            }

            button.addEventListener(
                "click",
                () => {

                    practiceIndex = index;

                    renderPracticeQuestion();
                }
            );

            palette.appendChild(button);
        });
    }


    function nextPracticeQuestion() {

        const list =
            getFilteredPracticeQuestions();

        if (practiceIndex < list.length - 1) {

            practiceIndex++;

            renderPracticeQuestion();

        } else {

            alert(
                "You have reached the last question."
            );
        }
    }


    function previousPracticeQuestion() {

        if (practiceIndex > 0) {

            practiceIndex--;

            renderPracticeQuestion();

        } else {

            alert(
                "This is the first question."
            );
        }
    }


    function goBackToChapters() {

        selectSubject(currentSubject);
    }


    /* =====================================================
       PERFORMANCE RECORDING
    ===================================================== */

    function recordPracticePerformance(
        question,
        correct
    ) {

        const data =
            getPerformanceData();

        data.attempted++;

        if (correct) {
            data.correct++;
        } else {
            data.wrong++;
        }

        if (!data.subject[question.subject]) {

            data.subject[question.subject] = {
                attempted: 0,
                correct: 0
            };
        }

        data.subject[
            question.subject
        ].attempted++;

        if (correct) {

            data.subject[
                question.subject
            ].correct++;
        }

        savePerformance(data);

        updatePerformancePage();
    }


    /* =====================================================
       MOCK TESTS
    ===================================================== */

    function showMockTests() {

        renderMockTests();

        showPage("mockTests");
    }


    function renderMockTests() {

        const container =
            document.getElementById(
                "mockTestList"
            );

        if (!container) return;

        container.innerHTML = "";

        mockTests.forEach(test => {

            const card =
                document.createElement("div");

            card.className = "test-card";

            card.innerHTML = `

                <div class="test-card-info">

                    <h3>
                        ${escapeHTML(test.title)}
                    </h3>

                    <p>
                        150 Questions •
                        200 Marks •
                        180 Minutes
                    </p>

                </div>

                <button>
                    Start Test
                </button>
            `;

            card.querySelector("button")
                .addEventListener(
                    "click",
                    () => {
                        startMockTest(test.id);
                    }
                );

            container.appendChild(card);
        });
    }


    function startMockTest(testId) {

        const test =
            mockTests.find(
                item => item.id === testId
            );

        if (!test) {
            alert("Test not found.");
            return;
        }

        const confirmed =
            confirm(
                `Start ${test.title}?\n\n` +
                `150 Questions\n` +
                `200 Marks\n` +
                `180 Minutes`
            );

        if (!confirmed) return;

        currentMock = test;

        const physics =
            getRandomQuestions(
                "Physics",
                50
            );

        const chemistry =
            getRandomQuestions(
                "Chemistry",
                50
            );

        const mathematics =
            getRandomQuestions(
                "Mathematics",
                50
            );

        examData = {

            Physics: {
                questions: physics,
                answers: new Array(50).fill(null),
                marked: new Array(50).fill(false)
            },

            Chemistry: {
                questions: chemistry,
                answers: new Array(50).fill(null),
                marked: new Array(50).fill(false)
            },

            Mathematics: {
                questions: mathematics,
                answers: new Array(50).fill(null),
                marked: new Array(50).fill(false)
            }
        };

        examPhase = "pc";
        examSubject = "Physics";
        examIndex = 0;

        startTimer(90 * 60);

        renderExam();

        showPage("exam");
    }


    /* =====================================================
       EXAM TIMER
    ===================================================== */

    function startTimer(seconds) {

        stopTimer();

        remainingSeconds = seconds;

        updateTimerDisplay();

        examTimer = setInterval(() => {

            remainingSeconds--;

            updateTimerDisplay();

            if (remainingSeconds <= 0) {

                stopTimer();

                handleTimerEnd();
            }

        }, 1000);
    }


    function stopTimer() {

        if (examTimer) {

            clearInterval(examTimer);

            examTimer = null;
        }
    }


    function updateTimerDisplay() {

        const timer =
            document.getElementById(
                "examTimer"
            );

        if (!timer) return;

        const minutes =
            Math.floor(
                remainingSeconds / 60
            );

        const seconds =
            remainingSeconds % 60;

        timer.textContent =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;
    }


    function handleTimerEnd() {

        if (examPhase === "pc") {

            alert(
                "Physics and Chemistry time is over. Mathematics phase will now begin."
            );

            startMathematicsPhase();

        } else {

            alert(
                "Time is over. Your test will be submitted."
            );

            finishMockTest();
        }
    }


    function startMathematicsPhase() {

        examPhase = "math";

        examSubject = "Mathematics";

        examIndex = 0;

        startTimer(90 * 60);

        renderExam();
    }


    /* =====================================================
       EXAM RENDER
    ===================================================== */

    function renderExam() {

        const title =
            document.getElementById(
                "examTitle"
            );

        const phase =
            document.getElementById(
                "examPhase"
            );

        if (title) {

            title.textContent =
                currentMock
                    ? currentMock.title
                    : "MHT-CET Mock Test";
        }

        if (phase) {

            phase.textContent =
                examPhase === "pc"
                    ? "Phase 1 • Physics + Chemistry • 90 Minutes"
                    : "Phase 2 • Mathematics • 90 Minutes";
        }

        updateSubjectTabs();

        renderExamQuestion();

        renderExamPalette();

        updateTimerDisplay();
    }


    function updateSubjectTabs() {

        const physics =
            document.getElementById(
                "examPhysicsTab"
            );

        const chemistry =
            document.getElementById(
                "examChemistryTab"
            );

        const mathematics =
            document.getElementById(
                "examMathematicsTab"
            );

        if (!physics) return;

        physics.classList.toggle(
            "active",
            examSubject === "Physics"
        );

        chemistry.classList.toggle(
            "active",
            examSubject === "Chemistry"
        );

        mathematics.classList.toggle(
            "active",
            examSubject === "Mathematics"
        );

        mathematics.disabled =
            examPhase !== "math";

        physics.disabled =
            false;

        chemistry.disabled =
            false;
    }


    function switchExamSubject(subject) {

        if (
            examPhase === "pc" &&
            subject === "Mathematics"
        ) {
            return;
        }

        if (
            examPhase === "math" &&
            subject !== "Mathematics"
        ) {
            return;
        }

        examSubject = subject;

        examIndex = 0;

        renderExam();
    }


    function renderExamQuestion() {

        const data =
            examData[examSubject];

        if (!data) return;

        const question =
            data.questions[examIndex];

        if (!question) return;

        const number =
            document.getElementById(
                "examQuestionNumber"
            );

        const marks =
            document.getElementById(
                "examQuestionMarks"
            );

        const questionElement =
            document.getElementById(
                "examQuestion"
            );

        const options =
            document.getElementById(
                "examOptions"
            );

        number.textContent =
            `Question ${examIndex + 1} of ${data.questions.length}`;

        marks.textContent =
            examSubject === "Mathematics"
                ? "2 Marks"
                : "1 Mark";

        questionElement.textContent =
            question.question;

        options.innerHTML = "";

        question.options.forEach(
            (option, index) => {

                const button =
                    document.createElement("button");

                button.className = "option";

                if (
                    data.answers[examIndex] === index
                ) {
                    button.classList.add("selected");
                }

                button.innerHTML = `
                    <strong>
                        ${String.fromCharCode(65 + index)}.
                    </strong>
                    ${escapeHTML(option)}
                `;

                button.addEventListener(
                    "click",
                    () => {

                        selectExamAnswer(
                            index
                        );
                    }
                );

                options.appendChild(button);
            }
        );
    }


    function selectExamAnswer(index) {

        const data =
            examData[examSubject];

        data.answers[examIndex] =
            index;

        renderExamQuestion();

        renderExamPalette();
    }


    /* =====================================================
       EXAM NAVIGATION
    ===================================================== */

    function nextExamQuestion() {

        const data =
            examData[examSubject];

        if (
            examIndex <
            data.questions.length - 1
        ) {

            examIndex++;

            renderExam();

        } else {

            if (
                examPhase === "pc"
            ) {

                if (
                    examSubject === "Physics"
                ) {

                    examSubject =
                        "Chemistry";

                    examIndex = 0;

                    renderExam();

                } else {

                    const goMath =
                        confirm(
                            "Physics and Chemistry are complete. Start the Mathematics phase?"
                        );

                    if (goMath) {
                        startMathematicsPhase();
                    }
                }

            } else {

                alert(
                    "You have reached the last Mathematics question."
                );
            }
        }
    }


    function previousExamQuestion() {

        if (examIndex > 0) {

            examIndex--;

            renderExam();

            return;
        }

        if (
            examPhase === "pc" &&
            examSubject === "Chemistry"
        ) {

            examSubject = "Physics";

            examIndex =
                examData.Physics.questions.length - 1;

            renderExam();
        }
    }


    function toggleMarkForReview() {

        const data =
            examData[examSubject];

        data.marked[examIndex] =
            !data.marked[examIndex];

        renderExamPalette();
    }


    function clearExamAnswer() {

        const data =
            examData[examSubject];

        data.answers[examIndex] =
            null;

        renderExamQuestion();

        renderExamPalette();
    }


    /* =====================================================
       EXAM PALETTE
    ===================================================== */

    function renderExamPalette() {

        const palette =
            document.getElementById(
                "examQuestionPalette"
            );

        if (!palette) return;

        palette.innerHTML = "";

        const data =
            examData[examSubject];

        data.questions.forEach(
            (question, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "palette-question";

                button.textContent =
                    index + 1;

                if (index === examIndex) {
                    button.classList.add(
                        "current"
                    );
                }

                if (
                    data.answers[index] !== null
                ) {
                    button.classList.add(
                        "answered"
                    );
                }

                if (
                    data.marked[index]
                ) {
                    button.classList.add(
                        "marked"
                    );
                }

                button.addEventListener(
                    "click",
                    () => {

                        examIndex = index;

                        renderExamQuestion();

                        renderExamPalette();
                    }
                );

                palette.appendChild(button);
            }
        );
    }


    /* =====================================================
       SUBMIT TEST
    ===================================================== */

    function submitMockTest() {

        const unanswered =
            countUnanswered();

        const message =
            unanswered > 0
                ? `You still have ${unanswered} unanswered questions.\n\nAre you sure you want to submit?`
                : "Are you sure you want to submit the test?";

        if (!confirm(message)) {
            return;
        }

        finishMockTest();
    }


    function finishMockTest() {

        stopTimer();

        const result =
            calculateResult();

        saveMockResult(result);

        renderResult(result);

        showPage("result");
    }


    function countUnanswered() {

        let count = 0;

        Object.values(examData)
            .forEach(data => {

                data.answers.forEach(answer => {

                    if (answer === null) {
                        count++;
                    }
                });
            });

        return count;
    }


    /* =====================================================
       RESULT CALCULATION
    ===================================================== */

    function calculateResult() {

        const result = {

            totalScore: 0,

            maxScore: 200,

            correct: 0,

            wrong: 0,

            unanswered: 0,

            subject: {

                Physics: {
                    correct: 0,
                    wrong: 0,
                    unanswered: 0,
                    score: 0,
                    max: 50
                },

                Chemistry: {
                    correct: 0,
                    wrong: 0,
                    unanswered: 0,
                    score: 0,
                    max: 50
                },

                Mathematics: {
                    correct: 0,
                    wrong: 0,
                    unanswered: 0,
                    score: 0,
                    max: 100
                }
            },

            review: []
        };


        Object.keys(examData)
            .forEach(subject => {

                const data =
                    examData[subject];

                const marks =
                    subject === "Mathematics"
                        ? 2
                        : 1;

                data.questions.forEach(
                    (question, index) => {

                        const selected =
                            data.answers[index];

                        if (selected === null) {

                            result.unanswered++;

                            result.subject[
                                subject
                            ].unanswered++;

                        } else if (
                            selected === question.answer
                        ) {

                            result.correct++;

                            result.totalScore += marks;

                            result.subject[
                                subject
                            ].correct++;

                            result.subject[
                                subject
                            ].score += marks;

                        } else {

                            result.wrong++;

                            result.subject[
                                subject
                            ].wrong++;
                        }

                        result.review.push({

                            subject,

                            question,

                            selected,

                            correct:
                                selected ===
                                question.answer
                        });
                    }
                );
            });


        result.accuracy =
            result.correct +
            result.wrong > 0
                ? Math.round(
                    (
                        result.correct /
                        (
                            result.correct +
                            result.wrong
                        )
                    ) * 100
                )
                : 0;


        return result;
    }


    /* =====================================================
       RESULT PAGE
    ===================================================== */

    function renderResult(result) {

        document.getElementById(
            "resultTestTitle"
        ).textContent =
            currentMock
                ? currentMock.title
                : "Mock Test";


        document.getElementById(
            "resultScore"
        ).textContent =
            `${result.totalScore} / ${result.maxScore}`;


        document.getElementById(
            "resultCorrect"
        ).textContent =
            result.correct;


        document.getElementById(
            "resultWrong"
        ).textContent =
            result.wrong;


        document.getElementById(
            "resultUnanswered"
        ).textContent =
            result.unanswered;


        document.getElementById(
            "resultAccuracy"
        ).textContent =
            `${result.accuracy}%`;


        renderSubjectResults(result);

        renderQuestionReview(result);
    }


    function renderSubjectResults(result) {

        const container =
            document.getElementById(
                "resultSubjectList"
            );

        container.innerHTML = "";

        Object.keys(result.subject)
            .forEach(subject => {

                const data =
                    result.subject[subject];

                const row =
                    document.createElement("div");

                row.className =
                    "result-subject-row";

                row.innerHTML = `

                    <strong>
                        ${subject}
                    </strong>

                    <span>
                        ${data.correct}
                        correct
                    </span>

                    <span>
                        ${data.score}
                        / ${data.max}
                    </span>

                `;

                container.appendChild(row);
            });
    }


    function renderQuestionReview(result) {

        const container =
            document.getElementById(
                "resultReviewList"
            );

        container.innerHTML = "";

        result.review.forEach(
            (item, index) => {

                const div =
                    document.createElement("div");

                div.className =
                    "review-item";

                let answerText =
                    "Not answered";

                if (
                    item.selected !== null
                ) {

                    answerText =
                        item.question.options[
                            item.selected
                        ];
                }

                const correctText =
                    item.question.options[
                        item.question.answer
                    ];

                div.innerHTML = `

                    <h4>
                        ${index + 1}.
                        ${escapeHTML(
                            item.question.question
                        )}
                    </h4>

                    <p>
                        <strong>Your answer:</strong>
                        ${escapeHTML(answerText)}
                    </p>

                    <p>
                        <strong>Correct answer:</strong>
                        ${escapeHTML(correctText)}
                    </p>

                    <p>
                        ${escapeHTML(
                            item.question.explanation
                        )}
                    </p>

                `;

                container.appendChild(div);
            }
        );
    }


    /* =====================================================
       SAVE MOCK RESULT
    ===================================================== */

    function saveMockResult(result) {

        const data =
            getPerformanceData();

        data.attempted +=
            result.correct +
            result.wrong;

        data.correct +=
            result.correct;

        data.wrong +=
            result.wrong;


        Object.keys(result.subject)
            .forEach(subject => {

                const current =
                    result.subject[subject];

                if (
                    !data.subject[subject]
                ) {

                    data.subject[subject] = {
                        attempted: 0,
                        correct: 0
                    };
                }

                data.subject[
                    subject
                ].attempted +=
                    current.correct +
                    current.wrong;

                data.subject[
                    subject
                ].correct +=
                    current.correct;
            });


        data.mockHistory.unshift({

            id:
                currentMock
                    ? currentMock.id
                    : "MOCK",

            title:
                currentMock
                    ? currentMock.title
                    : "Mock Test",

            score:
                result.totalScore,

            max:
                result.maxScore,

            accuracy:
                result.accuracy,

            date:
                new Date().toLocaleString()

        });


        if (data.mockHistory.length > 20) {

            data.mockHistory =
                data.mockHistory.slice(0, 20);
        }


        savePerformance(data);

        updatePerformancePage();
    }


    /* =====================================================
       PYQ
    ===================================================== */

    function showPYQ() {

        renderPYQ();

        showPage("pyq");
    }


    function renderPYQ() {

        const container =
            document.getElementById(
                "pyqList"
            );

        if (!container) return;

        container.innerHTML = "";

        pyqTests.forEach(test => {

            const card =
                document.createElement("div");

            card.className =
                "test-card";

            card.innerHTML = `

                <div class="test-card-info">

                    <h3>
                        ${escapeHTML(test.title)}
                    </h3>

                    <p>
                        150 Questions •
                        200 Marks •
                        180 Minutes
                    </p>

                </div>

                <button>
                    View
                </button>
            `;

            card.querySelector("button")
                .addEventListener(
                    "click",
                    () => {

                        alert(
                            `${test.title}\n\n` +
                            `The PYQ section is reserved for verified official previous-year questions.`
                        );
                    }
                );

            container.appendChild(card);
        });
    }


    /* =====================================================
       PERFORMANCE PAGE
    ===================================================== */

    function showPerformance() {

        updatePerformancePage();

        showPage("performance");
    }


    function updatePerformancePage() {

        const data =
            getPerformanceData();


        const attempted =
            document.getElementById(
                "performanceAttempted"
            );

        const correct =
            document.getElementById(
                "performanceCorrect"
            );

        const wrong =
            document.getElementById(
                "performanceWrong"
            );

        const accuracy =
            document.getElementById(
                "performanceAccuracy"
            );


        if (attempted) {
            attempted.textContent =
                data.attempted;
        }

        if (correct) {
            correct.textContent =
                data.correct;
        }

        if (wrong) {
            wrong.textContent =
                data.wrong;
        }


        const total =
            data.correct +
            data.wrong;


        if (accuracy) {

            accuracy.textContent =
                total > 0
                    ? `${Math.round(
                        data.correct /
                        total *
                        100
                    )}%`
                    : "0%";
        }


        renderSubjectPerformance(data);

        renderMockHistory(data);
    }


    function renderSubjectPerformance(data) {

        const container =
            document.getElementById(
                "subjectPerformanceList"
            );

        if (!container) return;

        container.innerHTML = "";


        Object.keys(data.subject)
            .forEach(subject => {

                const item =
                    data.subject[subject];

                const percent =
                    item.attempted > 0
                        ? Math.round(
                            item.correct /
                            item.attempted *
                            100
                        )
                        : 0;


                const row =
                    document.createElement("div");

                row.className =
                    "performance-row";

                row.innerHTML = `

                    <strong>
                        ${subject}
                    </strong>

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${percent}%">
                        </div>

                    </div>

                    <span>
                        ${percent}%
                    </span>

                `;

                container.appendChild(row);
            });
    }


    function renderMockHistory(data) {

        const container =
            document.getElementById(
                "mockHistory"
            );

        if (!container) return;

        if (!data.mockHistory.length) {

            container.innerHTML = `
                <div class="empty-state">
                    No mock tests completed yet.
                </div>
            `;

            return;
        }

        container.innerHTML = "";


        data.mockHistory.forEach(test => {

            const row =
                document.createElement("div");

            row.className =
                "performance-row";

            row.innerHTML = `

                <strong>
                    ${escapeHTML(test.title)}
                </strong>

                <span>
                    ${test.score}/${test.max}
                </span>

                <span>
                    ${test.accuracy}%
                </span>

            `;

            container.appendChild(row);
        });
    }


    /* =====================================================
       RANDOM QUESTIONS
    ===================================================== */

    function getRandomQuestions(
        subject,
        count
    ) {

        const pool =
            questionBank.filter(
                q => q.subject === subject
            );

        const shuffled =
            [...pool].sort(
                () => Math.random() - 0.5
            );

        return shuffled.slice(
            0,
            Math.min(count, shuffled.length)
        );
    }


    /* =====================================================
       SECURITY / TEXT ESCAPING
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    /* =====================================================
       EXPOSE FUNCTIONS TO HTML
    ===================================================== */

    window.showPage =
        showPage;

    window.showPractice =
        showPractice;

    window.showMockTests =
        showMockTests;

    window.showPYQ =
        showPYQ;

    window.showPerformance =
        showPerformance;

    window.selectSubject =
        selectSubject;

    window.filterPracticeDifficulty =
        filterPracticeDifficulty;

    window.previousPracticeQuestion =
        previousPracticeQuestion;

    window.nextPracticeQuestion =
        nextPracticeQuestion;

    window.goBackToChapters =
        goBackToChapters;

    window.switchExamSubject =
        switchExamSubject;

    window.previousExamQuestion =
        previousExamQuestion;

    window.nextExamQuestion =
        nextExamQuestion;

    window.toggleMarkForReview =
        toggleMarkForReview;

    window.clearExamAnswer =
        clearExamAnswer;

    window.submitMockTest =
        submitMockTest;


    /* =====================================================
       START APPLICATION
    ===================================================== */

    initializePortal();

})();
