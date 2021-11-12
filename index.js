//js

//*********
// Variables
//*********

let isTurn = true;
let winwin = false;
let counter = 0;
let gameStatus = ["","","","","","","","",""];

// Miguel complains about how long it is ... and I will have to bite myself not to say my ...
const winArray = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

//*********
// functions
//*********

/**
  * Verifies if the string is in a valid email format
  * @param email {string}
  * @return  {boolean}
  */
const markPosition = (p) => gameStatus[p] = isTurn ? 'x' : 'o';


/**
  * function for creating buttons
  @return newButton {webElement}
  */
function Square() {
	let newButton = document.createElement("button");
	let myId = document.createAttribute("id");
	let myEvent = document.createAttribute("onclick");
	myId.value = counter;
	myEvent.value = "mark(this)";
	newButton.setAttributeNode(myId);
	newButton.setAttributeNode(myEvent);

	return newButton;
}

/**
  * function for shift indication
  * @param newDivContent1 {webElement}
  * @return newDivContent1 {webElement}
  */
function Indicator(newDivContent1) {
	let newDivX = document.createElement("div");
	let newDivO = document.createElement("div");
	let myIdX = document.createAttribute("id");
	let myIdO = document.createAttribute("id");
	myIdX.value = "X";
	myIdO.value = "O";
	newDivX.innerHTML = "X";
	newDivO.innerHTML = "O";
	newDivX.setAttributeNode(myIdX);
	newDivO.setAttributeNode(myIdO);
	newDivContent1.appendChild(newDivX);
	newDivContent1.appendChild(newDivO);
	
	return newDivContent1
}

/**
  * function to create the board
  * we create three rows of three buttons
  */
function Model() {
	let elementMain = document.querySelector("main");
	
	let newDivContent1 = document.createElement("div");
	const newDivContent1Padding = Indicator(newDivContent1);
	elementMain.appendChild(newDivContent1Padding);
	
	for (let controlRow=0; controlRow != 3; controlRow++) {
		let newDiv = document.createElement("div");
		for (let controlElement=0; controlElement != 3; controlElement++){
			newDiv.appendChild(Square()); // We add the elements to the line
			counter++;
		}
		elementMain.appendChild(newDiv); // We add the line to the main
	}
	let newDivContent2 = document.createElement("div");
	elementMain.appendChild(newDivContent2);
}

/**
  * The management of the styles of the buttons 
  * that inform the shift functioned
  */
function controlTurn(isTurn){
	if (isTurn) {
		document.getElementById('X').style.border = 'outset';
		document.getElementById('O').style.border = 'solid';
		document.getElementById('X').style.borderWidth = '7px';
		document.getElementById('O').style.borderWidth = '5px';
		document.getElementById('X').style.borderColor = '#70757a';
		document.getElementById('O').style.borderColor = '#70757a'; 
	} else {
		document.getElementById('O').style.border = 'outset';
		document.getElementById('X').style.border = 'solid';
		document.getElementById('O').style.borderWidth = '7px';
		document.getElementById('X').style.borderWidth = '5px';
		document.getElementById('O').style.borderColor = '#70757a';
		document.getElementById('X').style.borderColor = '#70757a'; 
	}
}

/**
  * function to manage the marking on the board, 
  * shift change and if the game is ended by winner or tables
  * @param myButton {webElement}
  */
function mark(myButton){	
	// We check whether or not it has an image
	if ((myButton.innerHTML == '') && (winwin == false)){
		document.getElementById(myButton.id).innerHTML = isTurn ? 'X' : 'O';
		
		// function to save the marked position
		markPosition(myButton.id);
		
		// win or draw function
		win();
		
		if (winwin == false) {
			isTurn = isTurn ? false : true; // We change the shift
			controlTurn(isTurn);
			
		} else if (winwin == true) {
			setTimeout(() => {alert(`Enorabuena han ganado las ${isTurn ? 'X' : 'O'}`);}, 100);
		} else {
			setTimeout(() => {alert(`Fueron tablas`);}, 100);
		}
		
	} else if (winwin != false) {
		location.reload(); // We reboot
	} else {
		alert('Ese espacio ya esta ocupado');
	}
}

/**
  * win or draw function
  */
function win() {
	for (let w of winArray) {
		// If a field is not filled it cannot be a victory or a draw
		if ((gameStatus[w[0]] == '') || (gameStatus[w[1]] == '') || (gameStatus[w[2]] == '')){
			continue; 
		// If the three values are equal we have a winner
		} else if ((gameStatus[w[0]] == gameStatus[w[1]]) && (gameStatus[w[0]] == gameStatus[w[2]])) {
			winwin = true;
			break;
		}
	}
	if (winwin != true) {
		winwin = gameStatus.includes("") ? false : null;
	}	
}

//*********
// Event
//*********
window.addEventListener("load", Model); // Board loading