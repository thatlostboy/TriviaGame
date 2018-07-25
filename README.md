# TriviaGame
#

A test set of questions is used when you click startGame.   The test questions is used primarily to test the cases (skipped questions, wrong answers, etc).

To get the real questions, click on load from API.  this will grab 10 easy questions from category general from the API at "https://opentdb.com/api_config.php".  A lot of massage of the data is done to adapt the API data to what the program needs.  

A trivia game that shows only one question until the player answers it or their time runs out.
If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

The scenario is similar for wrong answers and time-outs.

If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).