
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
    $("#gametest").text("What's UP?!");

    questions = ['question1', 'question2', 'question3', 'question4'];

    quiz = [
        {
            question: "1. Which is number 3?",
            choices: ["1-op", "2-op", "3-op", "4-op"],
            answer: 2,
            currentAnswer: 10,
        },
        {
            question: "2. Which is number 1?",
            choices: ["1-ap", "2-ap", "3-ap", "4-ap"],
            answer: 0,
            currentAnswer: 10,
        },
        {
            question: "3. Which is number 4?",
            choices: [1, 2, 3, 4],
            answer: 3,
            currentAnswer: 10,
        },
        {
            question: "4. Which is number 2?",
            choices: [1, 2, 3, 4],
            answer: 1,
            currentAnswer: 10,
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







    function test(qNum) {
        questiondone = false;
        console.log("init ", quiz[qNum]);
        displayquestions(quiz[qNum]);

        $('#gametest').on("click", function () {
            console.log("clicked");
            console.log(quiz[qNum]);
            questiondone = true;
            qNum++;
            if (qNum < questions.length) {
                $('#gametest').off("click");
                setTimeout(function () {
                    console.log("Did I get clicked?");
                    test(qNum);

                }, 2000);
            } else {
                $('#gametest').text("done!");
                console.log("done!");
            }

        })
    }




    function displayquestions(questionObj) {
        var questiondiv = $("<div>");
        var question = $("<h2>");
        var submitBtn = $("<button>");
        var options = "";
        for (i = 0; i < questionObj.choices.length; i++) {
            console.log(questionObj.choices[i]);
            options = options + "<p>" + questionObj.choices[i] + "</p>";
        }
        question.text(questionObj.question);
        submitBtn.text("Click Me")
        questiondiv.append(question);
        questiondiv.append(options);
        questiondiv.append(submitBtn);

        console.log("Entries in questiondiv");
        console.log(questiondiv);
        $('#gametest').html(questiondiv);
    }



    var questiondone = false;
    var quizQNum = 0;
    test(quizQNum);







});


