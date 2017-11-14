	//array containing possible words	
		var possibleWords = ["arrow", "busy", "connect", "liver", "onions", "beetles", "monkeys", "pandas", "puppy", "thing", "formation"];
	
	//set wins and losses to 0	
		var wins = 0;
		var losses = 0;
	
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
			var guesses = 9;
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
					}

					/*testing
					console.log(answer);
					console.log("Guesses:" + guesses);*/
				}

	//if the user guesses all letters in the word, they win, guessed letters array resets
	//wins increase by 1 and updates html, game restarts automatically
				if (blanks === 0) {
					wins++;
					document.getElementById("wins").innerHTML = wins;
					alert("You win!!!");
					guessedLetters = [];
					document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					game();
				}

	//if the user uses all guesses, they lose, guessed letters array resets
	//losses increase by 1 and updates html, game restarts automatically
				else if (guesses === 0) {
					losses++;
					document.getElementById("losses").innerHTML = losses;
					alert("You lose!");
					guessedLetters= [];
					document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					game();
				}
			
			}
		}

	//starts game initially
		game();

    	

