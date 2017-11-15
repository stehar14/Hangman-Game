	//array containing possible words and possible guesses	
		var possibleWords = ["arrow", "busy", "connect", "liver", "onions", "beetles", "monkeys", "pandas", "puppy", "thing", "formation"];
		var possibleGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	//set wins and losses to 0	
		var wins = 0;
		var losses = 0;
		var guesses = 7;
		var canvas = document.getElementById('stickman');
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
    // draw the ground
    drawLine(c, [20,190], [180,190]);
    // start building the gallows if there's been a bad guess
    if (guesses <= 7) {
        // create the upright
        c.strokeStyle = '#A52A2A';
        drawLine(c, [30,185], [30,10]);
        if (guesses <= 6) {
            // create the arm of the gallows
            c.lineTo(150,10);
            c.stroke();
        }
        if (guesses <= 5) {
            c.strokeStyle = 'black';
            c.lineWidth = 3;
            // draw rope
            drawLine(c, [145,15], [145,30]);
            // draw head
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
	
	/*prints word and word array to console (testing)
			console.log(word);	
			console.log(wordArray);*/
	
	//declare blanks to keep track of letters not yet guessed and guesses to track remaining guesses	
			var blanks = word.length;
			drawCanvas();
			document.getElementById("guesses").innerHTML = 7;
				
	//declares empty arrays to hold answer and guessed letter
			var answer = [];
			var guessedLetters = [];

	//for loop filling empty array with an underscore for each letter in the chosen word and prints to console
			for ( i = 0; i < word.length; i++){
				answer[i] = "_";
			}
	//shows answer array on webpage
			document.getElementById("answer").innerHTML = answer.join(" ");
	
	/*prints answer array and blanks to console (testing)
			console.log(answer);
			console.log(blanks);*/
			
	//user choices taken from keyboard input
		    document.onkeyup = function(event) {
		    	
	//if there are still letters to fill in AND guesses remaining, run the code
		    	if ((blanks > 0) && (guesses > 0)) {
	
	//declares variable to convert users guesses to lower case and store them
					var key = event.key.toLowerCase();
	
	//checking to see if word contains user guess and the guessed letter hasn't been guessed yet
					if (word.includes(key) && (guessedLetters.includes(key) === false)){
						
	//check user guess against each character in the word
						for (k = 0; k < word.length; k++){
							
	//if user input matches a character in the word, replace the corresbonding blank in the answer array
							if (key === wordArray[k]) {
							answer[k] = key;

	//update HTML with answer, subtract one blank for each time the key matches
							document.getElementById("answer").innerHTML = answer.join(" ");
							blanks--;
							}
						}

	//push the guess to the guessed letters array and update html
						guessedLetters.push(key);
						document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					}

	//if the user enters an invalid key, alert them to choose again
					else if (possibleGuesses.includes(key) === false) {
						alert("That's not a valid input!")
					}

	//if the user enters in a redundant guess, alert them to choose again
					else if (guessedLetters.includes(key)) {
						alert("You already chose that letter!")
					}

	//if the letter doesn't match and hasn;t been guessed already, it is wrong
	//subtracts a guess and updates html with new guesses left and guessed letter
					else {
						guesses--;
						document.getElementById("guesses").innerHTML = guesses;
						guessedLetters.push(key);
						document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
						drawCanvas();
					}

					/*testing
					console.log(answer);
					console.log("Guesses:" + guesses);*/
				}

	//if the user guesses all letters in the word, they win, guessed letters array resets
	//wins increase by 1 and updates html, game restarts automatically
				if (blanks === 0) {
					setTimeout(function() {
						wins++;
						document.getElementById("wins").innerHTML = wins;
						alert("You win!!!");
						guesses = 7;
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
						document.getElementById("losses").innerHTML = losses;
						alert("You lose!");
						guesses = 7;
						guessedLetters= ["-"];
						document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
						game();
					}, 0);
				}
			
			}
		}

	//starts game initially
		game();

    	

