/*Hangman Game Homework #3
	Created 11/12/17
	Last updated 11/17/17
	Written by: Steve Harold*/

//array containing possible words and possible guesses	
var possibleWords = ["falcons", "giants", "cowboys", "redskins", "eagles", "redskins", "jets", "patriots", "bills", "dolphins", "touchdown", "safety", "goal", "tackle", "receiver", "quarterback", "tennis", "coach", "basketball", "baseball", "football", "volleyball", "basket"];
possibleGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//set wins and losses to 0, guesses to 8, and define a variable linked to the #stickman canvas element
var wins = 0;
var losses = 0;
var guesses = 9;
var canvas = document.getElementById('stickman');

//assign sounds
var right = new Audio();
right.src = "./assets/audio/right.mp3";
var wrong = new Audio();
wrong.src = "./assets/audio/wrong.mp3";
var win = new Audio();
win.src = "./assets/audio/win.mp3";
var lose = new Audio();
lose.src = "./assets/audio/lose.mp3";
var invalid = new Audio();
invalid.src = "./assets/audio/invalid.mp3";

// Draw the canvas
function drawLine(context, from, to) {
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

function drawCanvas() {
	var c = canvas.getContext('2d');

// reset the canvas and set basic styles
	canvas.width = canvas.width;
	c.lineWidth = 10;
	c.strokeStyle = 'green';
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
	c.fillStyle = 'red';

// start building the gallows if there's been a bad guess
	if (guesses <= 8) {
// create the upright
		c.strokeStyle = '#A52A2A';
		drawLine(c, [30,185], [30,10]);
		if (guesses <= 7) {
// create the arm of the gallows
    		c.lineTo(150,10);
    		c.stroke();
		}
		if (guesses <= 6) {
    		c.strokeStyle = 'black';
    		c.lineWidth = 3;
// draw rope
    		drawLine(c, [145,15], [145,30]);
    	}
// draw head
    	if (guesses <= 5) {
    		c.beginPath();
   			c.moveTo(160, 45);
    		c.arc(145, 45, 15, 0, (Math.PI/180)*360);
    		c.stroke(); 
		}
		if (guesses <= 4) {
// draw body
    		drawLine(c, [145,60], [145,130]);
		}
		if (guesses <= 3) {
// draw left arm
    		drawLine(c, [145,80], [110,90]);
		}
		if (guesses <= 2) {
// draw right arm
    		drawLine(c, [145,80], [180,90]);
		}
		if (guesses <= 1) {
// draw left leg
    		drawLine(c, [145,130], [130,170]);
		}
		if (guesses <= 0) {
// draw right leg and end game
    		drawLine(c, [145,130], [160,170]);
    		c.fillText('Game over', 45, 110);
		}

	}
}


//game function
function game(){

//pick a random choice from possible words and store that word in an array with one character per index
	var word = possibleWords[Math.floor(Math.random()*possibleWords.length)];
	var wordArray = word.split("");

//declare blanks to keep track of letters not yet guessed and guesses to track remaining guesses	
	var blanks = word.length;
	drawCanvas();
	document.getElementById("guesses").innerHTML = 9;
		
//declares empty arrays to hold answer and guessed letter
	var answer = [];
	var guessedLetters = [];

//for loop filling empty array with an underscore for each letter in the chosen word and prints to console
	for ( i = 0; i < word.length; i++){
		answer[i] = "_";
	}

//shows answer array on webpage
	document.getElementById("answer").innerHTML = answer.join(" ");

//user choices taken from keyboard input
    document.onkeyup = function(event) {
    	
//if there are still letters to fill in AND guesses remaining, run the code
    	if ((blanks > 0) && (guesses > 0)) {

			var key = event.key.toLowerCase();
			if (word.includes(key) && (guessedLetters.includes(key.toUpperCase()) === false)){
				
//check user guess against each character in the word, if it matches, add to corresponding index of answer array
				for (k = 0; k < word.length; k++){
					
					if (key === wordArray[k]) {
					answer[k] = key.toUpperCase();

//update HTML with answer, subtract one blank for each time the key matches
					document.getElementById("answer").innerHTML = answer.join(" ");
					blanks--;

//play soung for correct answer
					setTimeout(function(){
					    right.play();

					    setTimeout(function(){
					        right.pause();
					        right.currentTime = 0;
					    }, 1000);
					}, 0);
					}
				}

//push the guess to the guessed letters array and update html
				guessedLetters.push(key.toUpperCase());
				document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
			}

//if the user enters an invalid key, alert them to choose again
			else if (possibleGuesses.includes(key) === false) {
				setTimeout(function(){
				    invalid.play();

				    setTimeout(function(){
				        invalid.pause();
				        invalid.currentTime = 0;
				    }, 1000);
				}, 0);
				alert("That's not a valid input!");
			}

//if the user enters in a redundant guess, alert them to choose again
			else if (guessedLetters.includes(key.toUpperCase())) {
				setTimeout(function(){
				    invalid.play();

				    setTimeout(function(){
				        invalid.pause();
				        invalid.currentTime = 0;
				    }, 1000);
				}, 0);
				alert("You already chose that letter!");
			}

//if the letter doesn't match and hasn't been guessed already, it is wrong
//subtracts a guess and updates html with new guesses left and guessed letter
			else {
				guesses--;
				setTimeout(function(){
				    wrong.play();

				    setTimeout(function(){
				        wrong.pause();
				        wrong.currentTime = 0;
				    }, 250);
				}, 0);
				document.getElementById("guesses").innerHTML = guesses;
				guessedLetters.push(key.toUpperCase());
				document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
				drawCanvas();
			}
		}

//if the user guesses all letters in the word, they win, guessed letters array resets
//wins increase by 1 and updates html, game restarts automatically
		if (blanks === 0) {
			setTimeout(function() {
				wins++;
				setTimeout(function(){
				    win.play();

				    setTimeout(function(){
				        win.pause();
				        win.currentTime = 0;
				    }, 2000);
				}, 0);
				document.getElementById("wins").innerHTML = wins;
				alert("You win!!!");
				guesses = 9;
				guessedLetters = ["-"];
				document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
				game();
			}, 0);
		}

//if the user uses all guesses, they lose, guessed letters array resets
//losses increase by 1 and updates html, game restarts automatically
		else if (guesses === 0) {
			setTimeout(function() {
				losses++;
				setTimeout(function(){
				    lose.play();

				    setTimeout(function(){
				        lose.pause();
				        lose.currentTime = 0;
				    }, 2000);
				}, 0);
				document.getElementById("losses").innerHTML = losses;
				alert("You lose!");
				guesses = 9;
				guessedLetters= ["-"];
				document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
				game();
			}, 0);
		}
	
	}
}

//starts game initially
$(document).ready(game());



