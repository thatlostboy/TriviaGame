
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


PsuedoCode:
list of dict for question/options/correct answer/currentAnswer(default to 100)
generate question set.
random pics and audio to congratulate

Global Var:
time per question


Each question:
    1: set timer:  time up, offclick and clear div, play time is up, call check answer
    2: click this:  if clicked, offclick and clear div, clear timer, store value into currentAnswer, call check answer

check answer function: 
    compare answer to currentAnswer, 
    if blank (100):  time is up, say message
    if incorrect:   say they selected worng one, 
    if correct;  say congrats!
    show pic
    ß
    set timer:  load next

if last,
    missed
    correct 
    unanswered

reload button


*/
console.log("Test");
$(document).ready(function () {

    questions = ['question1', 'question2', 'question3', 'question4'];

    quiztest = [
        {
            question: "1. Which is number 3?",
            choices: ["1-op", "2-op", "3-op", "4-op"],
            answer: 2,
            currentAnswer: -10,
        },
        {
            question: "2. Which is number 1?",
            choices: ["1-ap", "2-ap", "3-ap", "4-ap"],
            answer: 0,
            currentAnswer: -10,
        },
        {
            question: "3. Which is number 4?",
            choices: ["1-op", "2-op", "3-op", "4-op"],
            answer: 3,
            currentAnswer: -10,
        },
        {
            question: "4. Which is number 2?",
            choices: ["1-op", "2-op", "3-op", "4-op"],
            answer: 1,
            currentAnswer: -10,
        },
        {
            question: "5. Which is number 5?",
            choices: ["1-op", "5-op", "3-op", "4-op", "9-op", "6-op"],
            answer: 1,
            currentAnswer: -10,
        },
        {
            question: "6. Which is number 8?",
            choices: ["1-op", "2-op", "8-op", "4-op", "5-op"],
            answer: 2,
            currentAnswer: -10,
        },
    ]

    // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404 
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
    async function test() {
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





    function displayDone() {
        console.log("---------> results after test");
        button = "<br><button id='restart'>Restart</button>";
        endResults = "Total: " + totalQuestions + " Incorrect: " + totalIncorrect + " totalNoAnswer: " + totalNoAnswer + " totalCorrect: " + totalCorrect;
        endResults += button;
        console.log(endResults);
        return (endResults);
    }

    function displayAnswer(timer, questionObj, timesUp) {
        console.log("------------> displaying answer")

    }


    function displayQuestion(timer, questionObj) {
        var questiondiv = $("<div>");
        var question = $("<h2>");

        var options = "";

        // create choices from question Object
        for (i = 0; i < questionObj.choices.length; i++) {
            console.log(questionObj.choices[i]);
            options = options + "<div class='choice choosing' choiceid='" + i + "'>" + questionObj.choices[i] + "</div>";
        }
        question.text(questionObj.question);
        questiondiv.append(question);
        questiondiv.append(options);


        startCountDown = timer / 1000;
        questiondiv.append("<div>Timer: <span id='countdown'>" + startCountDown + "</span></div>")
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

    function test(qNum, quiz) {

        console.log("init ", quiz[qNum]);
        $('body').off('click', '.choice');  // remove click to avoid assocition with previous question
        countObj = displayQuestion(qTimer, quiz[qNum]); // capture the interval countdown object from previous question
        timesUp = false;


        function nextQuestion(quiz, qTimerObj, countObj) {
            console.log("test next question");

            // remove timers and remove preivous click associations
            clearTimeout(qTimerObj);  // clear the timer object for each qustion.  This is the timer that allows X secdonds to answer question.  
            $('body').off('click', '.choice');
            $('body').off('click', 'nextQ');
            clearTimeout(countObj);  // clear the countdown timer for each question.  This is the interval timer on the screen that goes 5.  4..   3..   2..  1 .  

            // display answer
            displayAnswer(qNum, quiz, timesUp);

            // increment quiz
            timesUp = false;   // reset timesUp
            qNum++;
            if (qNum < parseInt(quiz.length)) {
                setTimeout(function () {
                    console.log("Generic");
                    test(qNum, quiz);
                }, waitNextQ);
            } else {
                $('body').off('click','#restart')
                endResults = displayDone();
                $('#question').html(endResults);
                $('body').on('click', '#restart', function(){
                    test(quizQNum, initGame(false, quiz));
                });
                console.log("done!");
            }
        }

        // reassign click event to just created choices
        $('body').on('click', '.choice', function () {
            choiceid = $(this).attr("choiceid");
            quiz[qNum].currentAnswer = parseInt(choiceid); // assign answer to array
            if (quiz[qNum].answer === parseInt(choiceid)) {
                console.log("you got the right answer! ");
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
            alert("Times UP!");
            timesUp = true;
            nextQuestion(quiz, qTimerObj, countObj);
        }, qTimer);

    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // fisher-yates algorithm to shuffle
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


    // restart game, if useAPI, generate new questison from API, if redo preivous questions, take it from there as well.  
    function initGame(useAPI, quizObj) {

        if (!useAPI) {
            // create a copy of the test quiz 
            var newquiz = JSON.parse(JSON.stringify(quizObj));

            // shuffle questions
            newquiz = shuffle(newquiz);
        }

        return (newquiz);
    }


    var questiondone = false;
    var quizQNum = 0;   // starting question
    var waitNextQ = 2000;  // wait 2000 ms before showing next question
    var qTimer = 10000;  // seconds to answer each question
    var totalQuestions = quiztest.length;
    var totalIncorrect = 0;  // selected wrong answer
    var totalNoAnswer = quiztest.length; // skipped or did not answer in time
    var totalCorrect = 0;




    $('body').on("click","#startGame", function() {
        test(quizQNum, initGame(false, quiztest));
    });
    


});


