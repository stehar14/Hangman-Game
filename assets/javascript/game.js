	//array containing possible words	
		var possibleWords = ["arrow", "busy", "connect", "liver", "onions", "beetles", "monkeys", "pandas", "puppy", "thing", "formation"];
	
	//pick a random choice from possible words and store that word in an array with one character per index
		
			var word = possibleWords[Math.floor(Math.random()*possibleWords.length)];
			var wordArray = word.split("");
	//prints word and word array to console (testing)
			console.log(word);	
			console.log(wordArray);
	//declare a variable blanks to keep track of letters not yet guessed	
			var blanks = word.length;
			var guesses = 9;
	
	//declares an empty array
			var answer = [];
	
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
    			
   				if (word.includes(key)){
    				for (k = 0; k < word.length; k++){
    					if (key === wordArray[k]) {
    					answer[k] = key;
    					document.getElementById("answer").innerHTML = answer.join(" ");
    					blanks--;
    					}
    				}
    			}
    			else {
    				guesses--;
    				document.getElementById("guesses").innerHTML = guesses;
    				
    			}
    			//testing
    			console.log(answer);
    			console.log("Guesses:" + guesses);
    		}
    	
    	}

    	

