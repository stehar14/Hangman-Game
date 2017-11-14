	//array containing possible words	
		var possibleWords = ["arrow", "busy", "connect", "liver", "onions", "beetles", "monkeys", "pandas", "puppy", "thing", "formation"];
		var wins = 0;
		var losses = 0;
	//pick a random choice from possible words and store that word in an array with one character per index
		function game(){
			var word = possibleWords[Math.floor(Math.random()*possibleWords.length)];
			var wordArray = word.split("");
		//prints word and word array to console (testing)
			console.log(word);	
			console.log(wordArray);
		//declare a variable blanks to keep track of letters not yet guessed	
			var blanks = word.length;
			var guesses = 9;
			document.getElementById("guesses").innerHTML = 9;
				
		//declares an empty array
			var answer = [];
			var guessedLetters = [];

		//for loop filling empty array with an underscore for each letter in the chosen word and prints to console
			for ( i = 0; i < word.length; i++){
				answer[i] = "_";
			}
		//shows answer array on webpage
			document.getElementById("answer").innerHTML = answer.join(" ");
		//prints answer array and blanks to console (testing)
			console.log(answer);
			console.log(blanks);
			
		//game loop
			
		//user choices
		    document.onkeyup = function(event) {
		    	if ((blanks > 0) && (guesses > 0)) {
		//declares variable to convert users guesses to lower case and store them
					var key = event.key.toLowerCase();
			//if statement checking to see if word contains user guess
					
						if (word.includes(key) && (guessedLetters.includes(key) === false)){
						for (k = 0; k < word.length; k++){
							if (key === wordArray[k]) {
							answer[k] = key;
							document.getElementById("answer").innerHTML = answer.join(" ");
							blanks--;
							}
						}
						guessedLetters.push(key);
						document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					}
					else if (guessedLetters.includes(key)) {
						alert("You already chose that letter!")
					}
					else {
						guesses--;
						document.getElementById("guesses").innerHTML = guesses;
						guessedLetters.push(key);
						document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					}
					//testing
					console.log(answer);
					console.log("Guesses:" + guesses);
				}
				if (blanks === 0) {
					wins++;
					document.getElementById("wins").innerHTML = wins;
					alert("You win!!!");
					guessedLetters = [];
					document.getElementById("guessedLetters").innerHTML = guessedLetters.join(" ");
					game();
				}
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
		game();

    	

