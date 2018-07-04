$(document).ready(function() {
    
    var timer = 50;
    var clock;
    var correctAns = 0;
    var incorrectAns = 0;
    var unanswered = 0;
    var currentQuestion= 0;
   
    var gameQuestions = ["What film has a snake called Kaa in it?", "In Aladdin where does Aladdin find the Genie's lamp?", "What is the name of the boy the mice rescue in the film The Rescuers Down Under?", "What is the name of the baboon in The Lion King?"];
    var gameAnswers = ["The Jungle Book", "The Cave of Wonders", "Cody", "Rafiki"];
    var choiceOne = ["Toy Story", "The Cove of Diamonds","Jody", "Tafiki" ];
    var choiceTwo = ["Alice in Wonderland", "The Cave of Hearts", "Cody","Pafiki"  ];
    var choiceThree = ["The Jungle Book", "The Cave of Wonders", "Tody", "Safiki"];
    var choiceFour = ["Beauty and the Beast","The Cove of Dreams", "Kody", "Rafiki"];
    
    function showFun() {
        $("#questions").show();
        $("#multipleChioceOne").show();
        $("#multipleChioceTwo").show();
        $("#multipleChioceThree").show();
        $("#multipleChioceFour").show();
    }

    function hideFun() {
        $("#questions").hide();
        $("#multipleChioceOne").hide();
        $("#multipleChioceTwo").hide();
        $("#multipleChioceThree").hide();
        $("#multipleChioceFour").hide();

    }

   function hideAnswers () {
       $("#correctChoice").hide();
       $("#incorrectChoice").hide();
       $("#unansweredQuestions").hide();
       $("#Replay").hide();
   }

   function inPage () {
       hideAnswers();
       $("#answers").hide();
       $("#timer").show();
       showFun();
       $("#questions").html(gameQuestions[currentQuestion]);
       $("#multipleChioceOne").html(choiceOne[currentQuestion]);
       $("#multipleChioceTwo").html( choiceTwo[currentQuestion]);
       $("#multipleChioceThree").html(choiceThree[currentQuestion]);
       $("#multipleChioceFour").html(choiceFour[currentQuestion]);
   }

   $("#multipleChioceOne").on("click", checkAns)
   $("#multipleChioceTwo").on("click", checkAns)
   $("#multipleChioceThree").on("click", checkAns)
   $("#multipleChioceFour").on("click", checkAns)
  
   function checkAns() {
       hideFun();
       
       if ($(this).text() === gameAnswers[currentQuestion]) {
           stoptime();
           selectedAns = true; 
           $("#answers").show();
           $("#answers").html("WELL DONE!");
           inPage();
           correctAns++;
           currentQuestion++;
       }
      else {
          stopTime();
          selectedAns = true;
          $("#answers").show();
          $("#answers").html("OH NO! THE CORRECT ANSWER IS: " + gameAnswers[currentQuestion]);
          inPage();
          incorrectAns++;
          currentQuestion++;
      }

      gameEnds(); 

}
function gameEnds() {
    
        if (currentQuestion === gameQuestions.length) {
            $("#timer").hide();
            showResu();
            currentQuestion = 0;
            $(".play").show();
            $(".play").on("click", function (){
                reset();
                playGame();

              });
        }
}

    

    function timerReset() {
        timer = 40; 
    }

    function showTimer() {
        timer--;
        $("#timer").html("YOU HAVE " + timer + "LEFT!");

        if (timer <= 0 ) {
            hideFun();
            stoptime();
            $("#answers").show();
            $("#answers").html("No TIME LEFT! THE ANSWER IS : " + gameAnswers[currentQuestion]);
            unanswered++;
            currentQuestion++;
            gameEnds();
        }
    }

    function startTimer() {
        clearInterval(clock);
       clock = setInterval(showTimer, 1000);
    }

    function stopTime() {
        clearInterval(clock);
        timerReset();
        if(currentQuestion < gameQuestions.length - 1) {
            setTimeout(startTimer, 2000);
            setTimeout(inPage, 3000);
        }
    }

    timerReset();

    function showResu() {
        $("#correctChoice").show();
        $("#correctChoice").html("CORRECT: " + correctAns);
        $("#incorrectChoice").show();
        $("#incorrectChoice").html("INCORRECT: " + incorrectAns);
        $("#unansweredQuestion").show();
        $("#UnansweredQuestion").html("UNANSERED: " + unanswered);
        $("#replay").show();
        $("#replay").html("PLAY AGAIN");

    }
    
    function reset() {
        correctAns = 0;
        incorrectAns = 0;
        unanswered = 0;
    }
    
    function playGame() {
        $(".play").hide();
        startTimer();
        inPage();
    }

    $(".play").on("click", function() {
        playGame();
    });
});
