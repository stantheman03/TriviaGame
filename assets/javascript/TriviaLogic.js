// Game flow:
// 1: start game begins when player hits start button
// 2: once start is pressed trigger clock countdown
// 3: the time given is for time for entire game
// 4: if time runs out: Game Over !!
// 5: player can only guess one answer at a time
// 6: timer should be shown so player sees it
// 7: display all questions at once
// 8: include done button at the end, if user finishes before given time

$(document).ready(function(){

    // Global variables
     var currentQuestions;
     var correctAnswer;
     var incorrectAnswer;
     var unanswered;
     var time;
     var answered;
     var userSelect;
     var alert ={
         correct: "Congratulations, You are a true Super Sayian",
         incorrect: "You bring shame to Saiyan race" + " " + "Vegeta will show you no mercy",
         endTime: "You should be quicker since you are a Sayian",
         finished: "So are you worthy of being a Sayian"
         };

        //  questions for trivia 
    var ListofQuestions =[
        { question: "What is the name of Universe 7's God of Destrcution",
        answerList:["Goku Black", "Zeno", "Beerus", "Whis"],
        answer: 2,
        answertext: "Lord Beerus is God of destruction of universe 7. He is known for his short temper and taking long naps"
        },
        { question: "Who created the Dragon Balls",
        answerList:["Shenron", "Piccolo Jr. Saga", "Korin", "Kami"],
        answer: 3,
        answertext: "Kami is creator of Dragon Balls, dewels in the floating tower"
        },
        { question: "What is Bulma's last name",
        answerList:["Trunks", "Briefs", "Shorts", "Bloomers"],
        answer: 1,
        answertext: "Bulma wife of Vegeta and mother of trunks, never changed her name after marriage"
        },
        { question: "Where is the Capsule Corporation headquarters located",
        answerList:["West City", "Capsule Town", "Octagon City", "East City"],
        answer: 1,
        answertext: "The place is large enough to have held whole Namekian race after Frieza destroyed their planet"
        },
        { question: "When was Goku born",
        answerList:["A.D 737", "A.D 745", "A.D 750", "A.D 778"],
        answer: 0,
        answertext: "He was born on PLanet Vegeta"
        },
        { question: "I am Prince of all Saiyans",
        answerList:["Goku", "Vegeta", "Bardock", "Andriod 17"],
        answer: 1,
        answertext: "he said this whenever being beaten by someone he thought was less powerful than him"
        },
        { question: "The name of Goku means",
        answerList:["Awareness of Emptiness", "Chosen One", "Enlightment", "Protector"],
        answer: 1,
        answertext: "Go means aware and ku means emptiness or sky"
        },
        { question: "What is Goku's profession",
        answerList:["radish farmer", "chef", "fighter", "construction worker"],
        answer: 0,
        answertext: "In the episode Goku and Friends Return, Goku is portrayed as Radish farmer"
        },
        { question: "What is Goku's Sayian name",
        answerList:["Zamasu", "Goactseli", "Goducedsou", "Kakarot"],
        answer: 3,
        answertext: "The name was given by Vegeta and Nappa after their encounter"
        },
        { question: "Who is Goku scared of the most",
        answerList:["Beerus", "Chi-Chi", "Jiren", "Frieza"],
        answer: 0,
        answertext: "He is scared of his wife Chi-Chi, its self evident in all the series"
        },
    ];
// Functions
// captures user click on start game
$("#startBtn").on("click", function(){
    $(this).hide();
    newGame()
});
// captures user click on reset button
$("#startOverBtn").on("click", function(){
    $(this).hide();
    newGame();
});
// restart game once over

function newGame(){
 $("#gameCol").show();
 $("#LastMessage").empty();
 $("#correctAnswers").empty();
 $("incorrectAnswers").empty();
 $("#unanswered").empty();
 currentQuestions = 0;
 correctAnswer = 0;
 unanswered = 0;
 nextQuestion();
}

// function to display next question
function nextQuestion(){
    $("#message").empty();
    $("#correctAnswer").empty();
    answered = true;
}

// function to display new question
$("#currentQuestion").html("Question " + (currentQuestions+1) + "of" + ListofQuestions.length);
$(".question").html(ListofQuestions[currentQuestions].question);
for(var i = 0; i < 5; i++){
    var choices = $('<div>');
    choices.text(ListofQuestions[currentQuestions].answerList[i]);
    choices.attr({'data-index': i});
    choices.addClass('thisChoice');
    $(".answeerList").append(choices);
}
countdown();
// click on answer will pause time and establish answerpage

$(".thisChoice").on("click", function(){
    userSelect = $(this).data('index');
    clearInterval(time)
    answerPage();
});

function countdown(){
    seconds = 10;
    $("#timeLeft").html('<h3>Time Left: ' + seconds + '</h3>');
    answer = true;
    // timer to go down
    time = setInterval(showCountdown, 1000);
}
function showCountdown(){
    seconds--;
    $("#timeLeft").html('<h3>Time Left: ' + seconds + '</h3>')
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}
function answerPage(){
    $("#currentQuestion").empty();
    $(".thisChoice").empty();
    $(".question").empty();
}
    var correctanswerText = ListofQuestions[currentQuestions].answerList[ListofQuestions[currentQuestions].answer];
    var correctanswerIndex = ListofQuestions[currentQuestions].answer;

    // if else if correct or incorrect by user
 if((userSelect == correctanswerIndex) && (answered == true)){
correctAnswer++;
$("#alert").html(alert.correct);
 }   
 else if((userSelect != correctanswerIndex) && (answered == true)){
     incorrectAnswer++;
     $("#alert").html(alert.incorrect);
     $("#correctedAnswer").html("the correct answer was: " + correctanswerText);
 }
 else{
     unanswered++;
     $("#alert").html(alert.endTime);
     $("#correctedAnswer").html("The correct answer was: " + correctanswerText);
 }

 if(currentQuestions == (ListofQuestions.length-1)){
     setTimeout(scoreboard, 6000);
 }
 else{
     currentQuestions++;
     setTimeout(nextQuestion, 6000);
 }

//  function to show stats:

function scoreboard(){
    $("#timeLeft").empty();
    $("#alert").empty();
    $("#correctedAnswer").empty();
    $("LastMessage").html(alert.finished);
    $("correctAnswer").html("Correct Answer: " + correctAnswer);
    $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
    $("#startOverBtn").addClass("reset");
    $("#startOverBtn").show();
    $("#startOverBtn").html("Play Again");
}
});