/*Global Variables
==============================================================*/
//Counter
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
//======================
var timer = '';
var qA = {// all of my questions, answers and right/wrong
			1:{
				question:'Before the Foo Fighters, David Grohl was the lead drummer in which famous rock band?',
				answers:['Nirvana','Pink Floyd','The Beatles','Spice Girls'],
				correct:'Nirvana',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl:'assets/images/nirvana.gif'
			   },
			2:{
				question:'Name the English drummer that played in the band, The Who.',
				answers:['Pink','Ringo Star','Travis Barker','Keith Moon'],
				correct:'Keith Moon',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl:'assets/images/keithmoon.gif'
			},
			3:{
				question:'Name the band that released the song Stairway to Heaven in 1971.',
				answers:['Led Zeppelin','The Eagles','AC/DC','Boston'],
				correct:'Led Zeppelin',
				right: 'Correct!',
				wrong: 'Wrong!',
				imageUrl:'assets/images/ledzeppelin.gif'
			}

	};
/*Functions
==============================================================*/
var start = function(){
	//When buttons is clicked clear the trivSection
	$('.startBtn').on('click',function(){
		//Emptys trivia section
		$('.trivSection').empty();
		createQuestions();
	});
}
var createQuestions = function(){
	timerStart();
	//Get the question question
	var question = qA[qACount]['question'];
	//assign div element to newDiv
	var newDiv = $('<div>');
	//Add a class to newDIv
	newDiv.addClass('question');
	//Add text to question
	newDiv.text(question);
	//Add question to DOM
	$('.trivSection').append(newDiv);
	generateAnswers();
}
var generateAnswers = function(){
	var answerLength = qA[qACount]['answers'].length;
	for(var i = 0; i < answerLength;i++){
		//get answers
		var answers = qA[qACount]['answers'][i];
		//Create new div to hold answers
		var newBtn = $('<button>');
		//Add class to new Div
		newBtn.addClass('answers redBtn');
		//Give buttons attribute
		newBtn.attr('data-type',answers);
		//add text to new Div
		newBtn.text(answers);
		//Add answers to DOM
		$('.trivSection').append(newBtn);
	}
	//Prevents click event from being saved
	$(document).off('click','.answers',checkAnswer);
	$(document).on('click','.answers',checkAnswer);
}
var checkAnswer = function(){
	 //Get users answer choice
	var userAnswer = $(this).data('type');
	var correctAnswer = qA[qACount]['correct'];
	var correctImg = qA[qACount]['imageUrl'];

	var right = qA[qACount]['right'];
	var wrong = qA[qACount]['wrong'];
	console.log(qACount);
	if(userAnswer === correctAnswer){
		//Update rightCount
		rightCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		//Create Div
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('rightAnswer');
		//adds CORRECT! text to div
		newDiv.text(right);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		if(qACount <= 3){
			//removes CORRECT! text and continues to create next question after 3 seconds
			setTimeout(
				function(){
					$('.trivSection').empty();
					createQuestions();
					},4000);
		}
		else{
			$('.trivSection').empty();
			var newImg = $('<img>');
			newImg.attr('src',correctImg);
			$('.trivSection').append(newImg);
			//Create Div
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('rightAnswer');
			//adds CORRECT! text to div
			newDiv.text(right);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer)
			//Reset
			setTimeout(gameOver, 4000);
		}
	}
	else{
		wrongCount++;
		//Clears out triv Section
		$('.trivSection').empty();
		var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
		var newDiv = $('<div>');
		//Give div class
		newDiv.addClass('wrongAnswer');
		//adds Wrong! text to div
		newDiv.text(wrong);
		//Add answer to DOM
		$('.trivSection').append(newDiv);
		//Stops Time
		clearInterval(timer)
		//Add 1 to question count to move to the next question
		qACount++;
		
		if(qACount <= 3){
			setTimeout(function(){
			$('.trivSection').empty();
			createQuestions();
			},4000);
		}
		else{
			//Clears out triv Section
			$('.trivSection').empty();
			var newImg = $('<img>');
		newImg.attr('src',correctImg);
		$('.trivSection').append(newImg);
			var newDiv = $('<div>');
			//Give div class
			newDiv.addClass('wrongAnswer');
			//adds Wrong! text to div
			newDiv.text(wrong);
			//Add answer to DOM
			$('.trivSection').append(newDiv);
			//Stops Time
			clearInterval(timer);
			//Reset
			setTimeout(gameOver, 3500);
		}
	}
}
//Timer
//==========================================
var timerStart = function(){ 
	$('.timerSection').empty();
	//Sets time to 10
	trivTime = 100;
	//Progress Bar
	var timeTag = $('<div>');
	timeTag.addClass('time');
	timeTag.addClass('progress');
	var progressBar = $('<div>');
	progressBar.addClass('progress-bar');
	progressBar.width(trivTime + '%');

	$('.timerSection').append(timeTag);
	$('.time').append(progressBar);	
	//Decrements Time
	timer = setInterval(timeDecrement,100);
}
var timeDecrement = function(){ 
	//Progress bar decrement
	$('.progress-bar').width(trivTime + '%');
	trivTime--;
	//if time gets to 0
	if(trivTime === -10){
		userAnswer = false;
		//Clears Time
		clearInterval(timer);
		checkAnswer();
	}
	
}
var gameOver = function(){
	//Remove everything in the trivia section
	$('.trivSection').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
	$('.trivSection').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text('Game Over! Play Again ?');
	//Append game over text to DOM
	$('.trivSection').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('redBtn resetBtn');
	//Give btn reset Text
	newBtn.text('Reset');
	//Append the text 
	$('.trivSection').append(newBtn);
	//Reset all values
	trivTime = 100;
	qACount = 1;
	rightCount = 0;
	wrongCount = 0;
	//When reset button is clicked then it will start the game over
	$('.resetBtn').on('click',function(){
		$('.trivSection').empty()
		//Starts game over
		createQuestions();
	});
}



start();
