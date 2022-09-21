

//GAME ENGINE
//Game Setup
let thisGamesBalls = [];
let instructions = [];
let audio = new Audio ();
let callNumber = 0;

function createBallArray () {

	let balls = [];
	thisGamesBalls = [];

	for (var i = 0; i < numberOfBalls; i++) {
		balls.push(i+1);
	}


	for (var i = 0; i < numberOfBalls; i++) {

		let randomNumber = Math.floor(Math.random() * balls.length);
		randomBall = balls[randomNumber];
		balls.splice(randomNumber, 1)
		thisGamesBalls.push(randomBall);
	}

}

//Game Play => NextBall
function whichLetter (currentBallNumber) {

	if (currentBallNumber <= 15 ){
			currentLetter = 'B';
		} else if (currentBallNumber > 15 && currentBallNumber <=30) {
			currentLetter = 'I';
		} else if (currentBallNumber > 30 && currentBallNumber <=45) {
			currentLetter = 'N';
		} else if (currentBallNumber > 45 && currentBallNumber <=60) {
			currentLetter = 'G';
		} else {
			currentLetter = 'O';
		}
		return currentLetter;
}

function addLetterAndNumber (currentBallNumber, language, timing) {

	let thisBallInstructions = [];
	thisBallInstructions.push(currentBallNumber);
	thisBallInstructions.push(language);
	thisBallInstructions.push(timing);
	return thisBallInstructions
}

function addLetterAndNumberOverall (currentBallNumber, language, timing) {
	


	if (numberOfBalls == 75) {

		let currentLetter = whichLetter(currentBallNumber);

		instructions.push(addLetterAndNumber(currentLetter, language, timing));
		timing +=1000;
	}

	instructions.push(addLetterAndNumber(currentBallNumber, language, timing));

	return timing
}

function languages (currentBallNumber, timing) {
	
	for (var i = 0; i < languagesSettings.length; i++) {

 		timing = addLetterAndNumberOverall(currentBallNumber, languagesSettings[i], timing);

		timing += 3000;
 	}

 	return timing
}

function nextBall () {

	instructions = [];
	let currentBallNumber = thisGamesBalls[callNumber];
	timing = 0;
 	
 	for (var i = 0; i < repeatCall; i++) {
		 timing = languages(currentBallNumber, timing);
		 timing += 3000;
	}

	displayBalls(currentBallNumber);
	callBalls(instructions);
	callNumber++
}


//GAME DOM AND AUDIO
//Buttons
document.getElementById('newGame').addEventListener('click', int);
document.getElementById('repeatNow').addEventListener('click', repeat);
let callBallButton = document.getElementById('callButton')
callBallButton.addEventListener('click', nextBall);

//Display
let letterDisplayDIV = document.getElementById('letterDisplay');
let numberDisplayDIV = document.getElementById('numberDisplay');

//Game Play
function newGame () {

	int ();
}

function repeat () {
	callBalls(instructions);
}

function callBalls (instructions) {


	let a = 0;

	for (var i = 0; i < instructions.length; i++) {
		setTimeout(callConsole, instructions[i][2]);
	}

	function callConsole () {
		audio.src = 'voice/' + instructions[a][1] + '/'+ instructions[a][0] + '.ogg';
			audio.play();
		a++
	}
}

function displayBalls (currentBallNumber) {

	letterToDisplay = whichLetter(currentBallNumber);

	if (numberOfBalls == 75) {
		letterDisplayDIV.innerHTML = letterToDisplay; 
	}

		numberDisplayDIV.innerHTML = currentBallNumber;
}






//MAIN PAGE-NON GAME DOM
//Buttons
document.getElementById('showSettingsButton').addEventListener('click', showSettings);
document.getElementById('hideSettingsButton').addEventListener('click', showSettings);

document.getElementById('hideSmallBallsButton').addEventListener('click', showBalls);
document.getElementById('showBallsButton').addEventListener('click', showBalls);

//Modules
let settingsDIV = document.getElementById('settings');
let mainGridDIV = document.getElementById('mainGrid');
let bigBallContainerDIV = document.getElementById('bigBallContainer');



//Show and Hide Modules
function showBalls() {
	if (smallBallsSection.style.display == 'none') {

		renderSmallBalls ();
		mainGridDIV.style.display = 'none';
		bigBallContainerDIV.style.display = 'none';
		smallBallsSection.style.display = 'grid';
		hideSmallBallsButton.focus();


    } else {
    	mainGridDIV.style.display = 'grid';
	   	smallBallsSection.style.display = 'none';
		bigBallContainerDIV.style.display = 'flex';
		callButton.focus();
    }    
}

function showSettings () {

	if (settingsDIV.style.display == 'none') {
		mainGridDIV.style.display = 'none';
		bigBallContainerDIV.style.display = 'none';
		settingsDIV.style.display = 'grid';
		repeatButton.focus();

    } else {
    	mainGridDIV.style.display = 'grid';
	   	settingsDIV.style.display = 'none';
		bigBallContainerDIV.style.display = 'flex';
		callButton.focus();

    }    
}


//MODULE 1: SETTINGS 
//Settings variables
let numberOfBalls = 75;
let languagesSettings = ['English'];
let repeatCall = 1;
let preLanguageSetting = ['English', 'Off', 'Off'];

//Settings DOM
let ballNumberSelector = document.getElementById('ballNumberSelector');
ballNumberSelector.addEventListener('change', changeBallNumber);

let repeatButton = document.getElementById('repeatButton');
repeatButton.addEventListener('click', repeatSettings);

let languageSetting1 = document.getElementById('voice1');
languageSetting1.addEventListener('change', changeLanguage1);

let languageSetting2 = document.getElementById('voice2');
languageSetting2.addEventListener('change', changeLanguage2);

let languageSetting3 = document.getElementById('voice3');
languageSetting3.addEventListener('change', changeLanguage3);

//Settings 
function changeBallNumber () {
	numberOfBalls = ballNumberSelector.options[ballNumberSelector.selectedIndex].value;
	int ();
}

function repeatSettings() {
	if (repeatCall == 1) {
		repeatCall = 2;
		repeatButton.innerHTML = 'ON';
		repeatButton.classList.toggle('activeButton');
	} else {
		repeatCall = 1;
		repeatButton.innerHTML = 'OFF';
		repeatButton.classList.toggle('activeButton');
	}
}

function changeLanguage1() {
	preLanguageSetting[0] = languageSetting1.options[languageSetting1.selectedIndex].value;
	goThoughLanguages();
}

function changeLanguage2() {


	preLanguageSetting[1] = languageSetting2.options[languageSetting2.selectedIndex].value;
	goThoughLanguages();
}

function changeLanguage3() {
	preLanguageSetting[2] = languageSetting3.options[languageSetting3.selectedIndex].value;
	goThoughLanguages();
}

function goThoughLanguages() {

	languagesSettings = [];

	for (var i = 0; i < preLanguageSetting.length; i++) {
		if (preLanguageSetting[i] != 'Off') {
			languagesSettings.push(preLanguageSetting[i] )
		}
	}

}


//MODULE 1: SMALL BALLS 
let smallBallsContainerDIV = document.getElementById('smallBallsContainer');


function createSmallBalls(i, calledBalls) {
	let ballNumber = i+1;
	let ballValue = i;
	var node = document.createElement('DIV'); 
	var span = document.createElement('span');
	node.appendChild(span);
	var textnode = document.createTextNode(ballNumber);   
	span.appendChild(textnode);


	node.id = 'smallBall' + ballNumber;
	node.className = 'smallBall'; 



	for (var a = 0; a < calledBalls.length; a++) {
		if(i+1 == calledBalls[a]) {
			node.className = 'highlightedSmallBall';
		}
	}

	smallBallsContainerDIV.appendChild(node);
}

function highlightCalledBalls() {

	let calledBallsArray = [];

	for (var i = 0; i < callNumber; i++) {

	calledBallsArray.push(thisGamesBalls[i])
	}

	return calledBallsArray;

}
function renderSmallBalls (){

	
	let calledBalls = highlightCalledBalls();


	smallBallsContainerDIV.innerHTML = '';

	for (var i = 0; i < numberOfBalls; i++) {
		createSmallBalls(i, calledBalls);
	}
}
	

//INITIALIZATION
function int () {

	letterDisplayDIV.innerHTML = '';
	numberDisplayDIV.innerHTML = '<img src= "images/bingo.png">';
	callNumber = 0;
	callBallButton.focus();
	createBallArray();
}

int ();


