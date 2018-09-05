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
//GLOBAL VARIABLES
//===========================================
var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    gameHTML: "",
    questionsArray: [
                    "What is the name of Lord Freeza's Father", "What is Chi Chi's father name", "Which transformation did Gohan use to defeat cell", "What is the newest Super Saiyan God transformation called", "Who is Beerus"],
    answerArray: [
                  ["King Cold", "King Chilled", "King Cooler", "King Zarbon"], ["Yamacha Sr", "Master Roshi", "Kami", "OX King"], ["Super Saiyan 2", "Ultra Super Saiyan", "Super Saiyan God", "Super Saiyan"], ["Hyper Saiyan God", "Super Saiyan God Super Saiyan 2", "Super Saiyan God Super Saiyan", "Super Saiyan God 2"], ["The God of destruction", "The God of Power", "Ultimate Kai", "God of death"],],
    correctAnswers: [
                    "A. King Cold", "D. OX King", "A. Super Saiyan 2", "C. Super Saiyan God Super Saiyan", "A. The God of destruction"],
    imageArray: [
                "<img class='center-block img-right' src='http://cdn.playbuzz.com/cdn//0edca126-db60-46ed-8efa-c812919d4cae/059d20a8-793a-4666-aacd-a23e67053ff5.jpg'>", "<img class='center-block img-right' src='http://cdn.playbuzz.com/cdn//0edca126-db60-46ed-8efa-c812919d4cae/3aa2fa4e-558a-4022-9a91-53d936b5fe8b.jpg'>", "<img class='center-block img-right' src='http://cdn.playbuzz.com/cdn//0edca126-db60-46ed-8efa-c812919d4cae/a648002e-0ff6-4c0d-9cc2-4b8c48cc16af.jpg'>", "<img class='center-block img-right' src='http://cdn.playbuzz.com/cdn//0edca126-db60-46ed-8efa-c812919d4cae/b4d1b595-f57c-4667-b2a8-a07531515cc2.jpg'>", "<img class='center-block img-right' src='http://cdn.playbuzz.com/cdn//0edca126-db60-46ed-8efa-c812919d4cae/bbae8fc5-ae54-43a9-8448-6212d4b5ea38.jpg'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  
  //FUNCTIONS
  //===========================================
  function startScreen(){
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
    //Add Start button to main-area
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 4000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  //MAIN PROCESS
  //===========================================
  startScreen();
  
  //start-button click
  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      generateHTML();
  
      timer();
  }); // Closes start-button click
  
  $("body").on("click", ".answer", function(event){
    //If correct answer
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    //If incorrect ansewr
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); // Close .answer click
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      resetGame();
  }); // Closes reset-button click


});