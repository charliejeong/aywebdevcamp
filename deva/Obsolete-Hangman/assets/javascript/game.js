var words = ["typewriter", "pager", "fax machine", "dial up", "phonebook", "floppy disk", "vhs", "rotary telephone", "telephone booth", "dumb phone", "walkman", "overhead projector"];
var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var health = document.getElementById("health");
var guessedLetters = [];
var currentOutput = [];
var trysLeft = 15;
var secretWord;
var gameOver = false;
var wordsGuessedCount = 0;

secretWord = randomWord();
printBlanks(secretWord);
document.querySelector("#points").innerHTML = "Monsters defeated: " + wordsGuessedCount;


//This function happens when user releases a key
document.onkeyup = function(event) {

	if (gameOver === true) {
		return;
	}

	//this for-loop checks if user pressed a valid letter
	for (var i = 0; i < letters.length; i++) {
		if (event.key === letters[i]) {
			checkUserLetter(event.key);
		}
	}

	completeWordCheck();

}








// Here is a place to put functions...........................


//this function is for initializing and resetting the screen
function initialize() {
	guessedLetters = [];
	currentOutput = [];
	trysLeft = 15;
	health.value = trysLeft * 15;
	secretWord = randomWord();
	printBlanks(secretWord);
	document.querySelector("#guessed").innerHTML = "Guessed Letters: ";
	document.querySelector("#points").innerHTML = "Monsters defeated: " + wordsGuessedCount;
}
//....................................................


//this function will change the text to say game over
function endGame() {
	gameOver = true;
	health.value = 0;
	document.querySelector("#blanks").innerHTML = "Game Over";
}
//........................................................


//this function will change the monster
function changeMonster() {
	var monsterArray = ["assets/images/monster1.jpg","assets/images/monster2.jpg","assets/images/monster3.jpg"];
	var randomMonster = monsterArray[Math.floor(Math.random() * monsterArray.length)];
		document.getElementById("monster").src = randomMonster;
}
//...........................................................


//This function will check to see if the word is completed 
function completeWordCheck () {

	//this loop will leave the function if there are still blanks
	for (var i = 0; i < currentOutput.length; i++) {
		if (currentOutput[i] === " _ ") {
			return;
		}
	}

	wordsGuessedCount++;
	console.log(wordsGuessedCount);
	initialize();
	changeMonster();
}
//...........................................................

//Input: none | Output: random word from list................
function randomWord() {	
	var chosenWord;
	chosenWord = words[Math.floor(Math.random() * words.length)];
	console.log("chosen word: " + chosenWord);
	return chosenWord;
}
//.............................................................



//Input: word | Then prints the proper amount of blanks..........
function printBlanks(printBlanks_input) {
	var wordLength = printBlanks_input.length;
	var blankArray = [];
	var printString = " ";
	
	//This loop will create an array with all the needed blanks and spaces
	for (var i = 0; i < wordLength; i++) {	
		if (printBlanks_input.charAt(i) === " ") {
			blankArray[i] = "\xa0\xa0\xa0";
		}
		else {
			blankArray[i] = " _ ";
		}
	}

	currentOutput = blankArray.slice(0);
	console.log("current output: " + currentOutput);

	//This loop turns blankArray into a string
	for (var e = 0; e < blankArray.length; e++) {	
		printString = printString.concat(blankArray[e]);
	}

	document.querySelector("#blanks").innerHTML = printString;
}
//.............................................................


//Input: letter that user pressed | checks if it's one of the correct letters and checks if the letter has already been pressed
function checkUserLetter(inputLetter) {
	var newPrint = " ";
	var guessCorrect = false;
	var guessedString = " ";

	//this loop checks to see if the letter has already been pressed
	for (var i = 0; i < guessedLetters.length; i++) {
		//leaves the function if the letter has already been pressed
		if (inputLetter === guessedLetters[i]) {
			return;
		}
	}

	//this will check if the letter is correct and will change the current output
	for (var k = 0; k < secretWord.length; k++) {
		if (inputLetter === secretWord.charAt(k)) {
			currentOutput[k] = inputLetter;
			guessCorrect = true;
		}
	}


	//this will check and decrement number of tries if guess is wrong
	if (guessCorrect === false) {
		guessedLetters.push(inputLetter);
		console.log("guessed letters: " + guessedLetters);
		trysLeft--;
		health.value = trysLeft * 10;
		console.log("tries left: " + trysLeft);
		console.log("health: " + health.value);
	}

	if (trysLeft <= 0) {
		endGame();
		return;
	}

	console.log("current output: " + currentOutput);

	//This loop turns currentOutput into a string
	for (var e = 0; e < currentOutput.length; e++) {	
		newPrint = newPrint.concat(currentOutput[e]);
	}

	document.querySelector("#blanks").innerHTML = newPrint;

	//This loop turns guessedLetters into a string, then prints it
	for (var p = 0; p < guessedLetters.length; p++) {	
		guessedString = guessedString.concat(guessedLetters[p]);
	}
	document.querySelector("#guessed").innerHTML = "Guessed letters: " + guessedString;


}
//............................................................