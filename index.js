//js

//*********
// Variables
//*********

let isTurn = true;
let winwin = false;
let counter = 0;
let gameStatus = ["","","","","","","","",""];

// miguel se quejara de lo larga que es... y yo me tendre q morder para no decir mi...
const winArray = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

//*********
// Funciones
//*********

/**
  * Verifies if the string is in a valid email format
  * @param email {string}
  * @return  {boolean}
  */
const markPosition = (p) => gameStatus[p] = isTurn ? 'x' : 'o';


// funcion para la creacion de los button
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

// funcion para añadir tres filas de button
function Model() {
	let elementMain = document.querySelector("main");
	
	let newDivContent1 = document.createElement("div");
	const newDivContent1Padding = Indicator(newDivContent1);
	elementMain.appendChild(newDivContent1Padding);
	
	for (let controlRow=0; controlRow != 3; controlRow++) {
		let newDiv = document.createElement("div");
		for (let controlElement=0; controlElement != 3; controlElement++){
			newDiv.appendChild(Square()); // Añadimos los elementos a la linea
			counter++;
		}
		elementMain.appendChild(newDiv); //Añadimos la linea al main
	}
	let newDivContent2 = document.createElement("div");
	elementMain.appendChild(newDivContent2);
}

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

// funcion para el marcado
function mark(myButton){	
	// Verificamos si tiene o no imagen
	if ((myButton.innerHTML == '') && (winwin == false)){
		document.getElementById(myButton.id).innerHTML = isTurn ? 'X' : 'O';
		
		// funcion para guardar la posicion marcada
		markPosition(myButton.id);
		
		//funcion de victoria o empate
		win();
		
		if (winwin == false) {
			isTurn = isTurn ? false : true; //Cambiamos el turno
			controlTurn(isTurn);
			
		} else if (winwin == true) {
			alert(`Enorabuena han ganado las ${isTurn ? 'X' : 'O'}`);
		} else {
			alert(`Fueron tablas`);
		}
		
	} else if (winwin != false) {
		location.reload(); // Reiniciamos
	} else {
		alert('Ese espacio ya esta ocupado');
	}
}


function win() {
	for (let w of winArray) {
		// si un campo no esta relleno no puede ser victoria o empate
		if ((gameStatus[w[0]] == '') || (gameStatus[w[1]] == '') || (gameStatus[w[2]] == '')){
			continue; 
		// Si los tres valores son iguales tenemos un ganador
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
// Eventos
//*********
window.addEventListener("load", Model); // Carga del tablero