var panel = $("#quiz-area");
var countStartNumber = 30;

$(document).on("click", "#start-over", function(e) {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e)
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});

var questions = [{
    question:"What film has a snake called Kaa in it?",
    answers: ["The Jungle Book", "Toy Story", "Alice in Wonderland","Beauty and the Beast"],
    correctAnswer: "The Jungle Book",
    image: "assets/images/JungelBook.jpg"
}, {
    question:"In Aladdin where does Aladdin find the Genie's lamp?",
    answers: ["The Cave of Wonders", "The Cove of Diamonds", "The Cave of Hearts", "The Cove of Dreams"],
    correctAnswer: "The Cave of Wonders",
    image: "assets/images/AladdinLamp.jpg"
}, {
    question:"What is the name of the boy the mice rescue in the film The Rescuers Down Under?",
    answers: ["Jody", "Cody","Tony", "Kody"],
    correctAnswer: "Cody",
    image: "assets/images/rescuersduposter.jpg"
},{
    question:"What is the name of the baboon in The Lion King?",
    answers: ["Tafiki", "Safiki","Pafiki", "Rafiki"],
    correctAnswer: "Rafiki",
    image: "assets/images/simba-rafiki.jpg"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
        game.counter--;
        $('#counter-number').html(game.counter);

        if(game.counter === 0){
            console.log("TIME UP");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
          panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
        }
    },
    nextQuestion: function(){
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function (){
        clearInterval(timer);
        $('#counter-number').html(game.counter);
    
        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 3 * 1000);
        } else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        clearInterval(timer);
    
        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);
    
        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
          this.answeredCorrectly();
        } else {
          this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 3 * 1000);
        } else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 3 * 1000);
        } else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function(){
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};