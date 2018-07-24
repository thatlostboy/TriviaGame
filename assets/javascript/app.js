
/*
Basic:
You'll create a trivia form with multiple choice or true/false options (your choice).
The player will have a limited amount of time to finish the quiz. 
The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.
Don't let the player pick more than one answer per question.
Don't forget to include a countdown timer.

Advanced:
You'll create a trivia game that shows only one question until the player answers it or their time runs out.
If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

The scenario is similar for wrong answers and time-outs.


If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.


On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).


*/
console.log("Test");
$(document).ready(function () {

    questions = ['question1', 'question2', 'question3', 'question4'];

    quiztest = [
        {
            question: "Which is number 3?",
            choices: ["number 1", "number 2", "number 3", "number 4"],
            answer: 2,
            currentAnswer: -10,
            imgSrc: "",
        },
        {
            question: "Which is number 1?",
            choices: ["number 1", "number 2", "number 3", "number 4"],
            answer: 0,
            currentAnswer: -10,
            imgSrc: "",
        },
        {
            question: "Which is number 4?",
            choices: ["number 1", "number 2", "number 3", "number 4"],
            answer: 3,
            currentAnswer: -10,
            imgSrc: "",
        },
        {
            question: "Which is number 2?",
            choices: ["number 1", "number 2", "number 3", "number 4"],
            answer: 1,
            currentAnswer: -10,
            imgSrc: "",
        },
        {
            question: "Which is number 5?",
            choices: ["number 1", "number 5", "number 3", "number 4", "number 9", "number 6"],
            answer: 1,
            currentAnswer: -10,
            imgSrc: "",
        },
        {
            question: "Which is number 8?",
            choices: ["number 1", "number 2", "number 8", "number 4", "number 5"],
            answer: 2,
            currentAnswer: -10,
            imgSrc: "",
        },
    ]

    // when quiz is complete, this is what is displayed
    function displayDone() {
        console.log("---------> results after test");
        var button1 = "<br><button id='startGame'>Restart Game</button><br><button id='loadApiQuestions'>Load 10 New Questions from Trivia API</button><br><span id='loadresults'></span>";
        var endResults = "Total Questions: " + totalQuestions + "<br>Correct Answers: " + totalCorrect + "<br>Incorrect: " + totalIncorrect + "<br>Unanswered: " + totalNoAnswer;
        endResults += button1;
        console.log(endResults);
        $('#question').html(endResults);
        $('#questionResults').html("");
        $('#questionTimerDiv').html("");
    }

    // when time run out or when clicked, this is the asnwer that is displayed
    function displayAnswer(qNum, questionObj, timesUp, correct) {
        // console.log("------------> displaying answer");
        var message1 = "";  // say correct answer, incorrect answer, or out of time
        var message2 = ""; // dispaly correct answer
        var imgName = "";

        if (timesUp) {
            message1 = "You ran out of time!";
            timesUp = false;
        } else {
            if (correct) {
                message1 = "Correct!!";
                correct = false;
            } else {
                // highlight wrong answer in red
                message1 = "Wrong!!";
                var wrongAnswerIdx = questionObj[qNum].currentAnswer;
                var jQueryWrongAns = "[choiceid='" + wrongAnswerIdx + "']";
                $(jQueryWrongAns).addClass("choseWrong");
            }
        }
        // remove hovering class to show answers
        $(".choice").removeClass('choosing');

        // highlight correct answer in green
        var correctAnswerIdx = questionObj[qNum].answer;
        jQueryCorrectAns = "[choiceid='" + correctAnswerIdx + "']";
        $(jQueryCorrectAns).addClass("choseRight");

        // create message to display on screen
        message2 = "Correct Answer was: " + questionObj[qNum].choices[correctAnswerIdx];
        imgName = "<img src='" + questionObj[qNum].imgSrc + '>';
        message = "<br>" + message1 + "<br>" + message2 + "<br>" + imgName;
        $("#questionResults").html(message);

    }


    function displayQuestion(timer, questionObj, qNum, qCount) {
        var questiondiv = $("<div>");
        var question = $("<h4>");
        var options = "";
        qNum++;  // question number



        // clear previous values
        $("#question").html("");
        $("#questionResults").html("");

        // create choices from question Object
        for (i = 0; i < questionObj.choices.length; i++) {
            // console.log(questionObj.choices[i]);
            options = options + "<div class='choice choosing' choiceid='" + i + "'>" + questionObj.choices[i] + "</div>";
        }

        questionNum = "Question " + qNum + " of " + qCount + ": ";
        questionTxt = questionNum + questionObj.question;
        question.text(questionTxt);
        questiondiv.append(question);
        questiondiv.append(options);


        startCountDown = timer / 1000;

        $("#questionTimerDiv").html('Timer: <span id="countdown">' + startCountDown + '</span><hr>');
        // questiondiv.append("<div>Timer: <span id='countdown'>" + startCountDown + "</span></div>")
        countDown = timer / 1000;
        //console.log("Timer: "+countDown);
        let countDownObj = setInterval(function () {
            countDown -= 1;
            //console.log("interval: "+countDown);
            $("#countdown").html(countDown);
        }, 1000
        )
        //console.log("Entries in questiondiv");
        //console.log(questiondiv);
        $('#question').html(questiondiv);
        return countDownObj; // passing back the interval timer so the original one is referenced and reset
    }

    function triviaQuestion(qNum, quiz) {

        // console.log("init ", quiz[qNum]);
        $('body').off('click', '.choice');  // remove click to avoid assocition with previous question
        countObj = displayQuestion(qTimer, quiz[qNum], qNum, quiz.length); // capture the interval countdown object from previous question
        timesUp = false;
        var correct = false;


        function nextQuestion(quiz, qTimerObj, countObj) {
            // console.log("test next question");

            // remove timers and remove preivous click associations
            clearTimeout(qTimerObj);  // clear the timer object for each qustion.  This is the timer that allows X secdonds to answer question.  
            $('body').off('click', '.choice');
            $('body').off('click', 'nextQ');
            clearTimeout(countObj);  // clear the countdown timer for each question.  This is the interval timer on the screen that goes 5.  4..   3..   2..  1 .  

            // display answer
            displayAnswer(qNum, quiz, timesUp, correct);

            // increment quiz
            timesUp = false;   // reset timesUp
            qNum++;
            if (qNum < parseInt(quiz.length)) {
                setTimeout(function () {
                    console.log("Generic");
                    triviaQuestion(qNum, quiz);
                }, waitNextQ);
            } else {
                setTimeout(function () {
                    displayDone();  // display results and options to restart or load new questions
                    initGame(false,quiz);  // initialize values with whatever the current quiz is
                    startGame();
                    console.log("done!");
                }, waitNextQ)

            }


        }

        // reassign click event to just created choices
        $('body').on('click', '.choice', function () {
            choiceid = $(this).attr("choiceid");
            quiz[qNum].currentAnswer = parseInt(choiceid); // assign answer to array
            if (quiz[qNum].answer === parseInt(choiceid)) {
                console.log("you got the right answer! ");
                correct = true;
                totalNoAnswer--;
                totalCorrect++;
            } else {
                console.log("you got the wrong answer! " + choiceid + " : " + quiz[qNum]);
                totalNoAnswer--;
                totalIncorrect++;
            }
            choicevalue = $(this).text();
            // console.log(this);
            console.log("selected " + choiceid + " " + choicevalue);
            nextQuestion(quiz, qTimerObj, countObj);
        })

        // what happens when time runs out..   
        var qTimerObj = setTimeout(function () {
            $("#countdown").html(0);   // show countdown value of "0"
            quiz[qNum].currentAnswer = -10;
            timesUp = true;
            nextQuestion(quiz, qTimerObj, countObj);
        }, qTimer);

    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // fisher-yates algorithm to shuffle
    // this is used to shuffle question order in test and to shuffle the choices in the
    // trivia API given the way the API data is presented
    function shuffle(arraysrc) {
        var currentIndex = arraysrc.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            //pick a remaining Element
            randomIndex = Math.floor(Math.random() * currentIndex);

            currentIndex -= 1;

            // swap with current element
            temporaryValue = arraysrc[currentIndex];
            arraysrc[currentIndex] = arraysrc[randomIndex];
            arraysrc[randomIndex] = temporaryValue;
        }

        return arraysrc
    }

    function triviaApiAdapter(triviaObj) {

        // adapt output from free trivia API output at https://opentdb.com/api_config.php
        // to the below format used in this javascript program
        /*
        question: "Which is number 3?",
        choices: ["number 1", "number 2", "number 3", "number 4"],
        answer: 2,
        currentAnswer: -10,
        imgSrc: "",
        */

        var newquiz = [];
        console.log("--------->  I am in question Adpter");
        for (let i = 0; i < triviaObj.length; i++) {
            let questionI = {};
            let choices = [];
            questionI['question'] = decodeURIComponent(triviaObj[i]['question']);
            questionI['choices'] = triviaObj[i]['incorrect_answers'];
            for (let j = 0; j < questionI['choices'].length; j++) {
                questionI['choices'][j] = decodeURIComponent(questionI['choices'][j]);
            }
            let correctAnswer = decodeURIComponent(triviaObj[i]['correct_answer'])
            questionI['choices'].push(correctAnswer);
            questionI['choices'] = shuffle(questionI['choices']);
            questionI['answer'] = questionI['choices'].indexOf(correctAnswer);
            questionI['currentAnswer'] = -10;
            questionI['imgSrc'] = "";
            newquiz.push(questionI);
        }

        return newquiz;
    }


    // initialize Game values 
    function initGame(useAPI, quizObj) {
        // if useAPI is false, use quiztest object for testing
        // if useAPI is true, grab from open trivia API for testing


        quizQNum = 0;   // starting question
        totalQuestions = quizObj.length;
        totalIncorrect = 0;  // selected wrong answer
        totalNoAnswer = quizObj.length; // skipped or did not answer in time
        totalCorrect = 0;

        if (!useAPI) {  // if not using API, use the test questions
            // load the test quiz into the activeQuiz
            activeQuiz = JSON.parse(JSON.stringify(quizObj));

            // shuffle questions
            activeQuiz = shuffle(activeQuiz);
            //console.log("after request: ", activeQuiz);

            // initialize values
            totalQuestions = quizObj.length;
            totalNoAnswer = quizObj.length;

        } else {  // if using API, disable buttons to load data, renable after complete, and 
            // massage the data to match the way it's handling it now
            $("#loadApiQuestions").html("Loading...");
            $("#startGame").attr("disabled", "disabled");
            $("#loadApiQuestions").attr("disabled", "disabled");
            //console.log("Loading ajax request... ");
            
            // free trivia API:  https://opentdb.com/api_config.php
            var queryURL = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&encode=url3986';

            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                //console.log(response.results);
                activeQuiz = triviaApiAdapter(response.results);
                //console.log("after function call: ", activeQuiz);
                //console.log("ajax request loading completed...");
                $("#loadApiQuestions").html("Load 10 New Questions from Trivia API");
                $("#loadresults").html("10 New questions from Trivia API successfully loaded");
                $("#startGame").html("Start Game");
                $("#startGame").removeAttr('disabled');
                $("#loadApiQuestions").removeAttr('disabled');

                // initialize values
                totalQuestions = activeQuiz.length;
                totalNoAnswer = activeQuiz.length;
            });

        }
    }


    // this functions assigns the onclick handles for the start web page and the restart web page
    // at the end of the quiz
    function startGame() {
        // start click handlers for game
        $('body').off("click", "#startGame");
        $('body').off("click", "#loadApiQuestions");
        $('body').on("click", "#startGame", function () {
            triviaQuestion(quizQNum, activeQuiz);
        });
    
        // load data from API, 
        $('body').on("click", "#loadApiQuestions", function () {
            initGame(true, quiztest); // will update the activeQuiz variable with 20 questison from API
        });
    }

    // initialize variables for trivia
    var quizQNum = 0;   // initialize starting question
    var waitNextQ = 3000;  // how many ms to show answer before automatically going to next question
    var qTimer = 20000;  // milliseconds to answer each question
    var totalQuestions = quiztest.length;
    var totalIncorrect = 0;  // selected wrong answer
    var totalNoAnswer = quiztest.length; // skipped or did not answer in time
    var totalCorrect = 0;
    var activeQuiz = [];  // this is the active quiz, quiztest is copied here or API trivia is copied in here



    // start game with Test Data
    // provide option to load API Trivia if desired.  
    initGame(false, quiztest);
    startGame();

});



/*  to study another time.   promise, async, and await .

    // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404 
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
    async function triviaQuestion() {
        for (i = 0; i < questions.length; i++) {
            console.log(questions[i]);
            $('#gametest').on("click",function(){
                console.log("clicked"+questions[i]);
            })
            $('#gametest').text(questions[i]);

            await sleep(2000);
        }
    }
    */



