//js

//*********
// Variables
//*********

let myArray = [];
let isTurn = true;
let winwin = false;
let counter = 0;
let gameStatus = ["","","","","","","","",""];
const x = "./static/x.png";
const o = "./static/o.png";
// miguel se quejara de lo larga que es... y yo me tendre q morder para no decir mi...
const winArray = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

//*********
// Funciones
//*********

// funcion para guardar la posicion marcada
const markPosition = (p) => gameStatus[p] = isTurn ? 'x' : 'o';


// funcion para la creacion de los button
function Square() {
	let newButton = document.createElement("button");
	let myClass = document.createAttribute("class");
	let myId = document.createAttribute("id");
	let myEvent = document.createAttribute("onclick");
	myClass.value = "square";
	myId.value = counter;
	myEvent.value = "mark(this)";
	newButton.setAttributeNode(myClass);
	newButton.setAttributeNode(myId);
	newButton.setAttributeNode(myEvent);

	return newButton;
}

// funcion para añadir tres filas de button
function Model() {
	let elementMain = document.querySelector("main");

	for (controlRow=0; controlRow != 3; controlRow++) {
		let newDiv = document.createElement("div");
		for (controlElement=0; controlElement != 3; controlElement++){
			newDiv.appendChild(Square()); // Añadimos los elementos a la linea
			counter++;
		}
		elementMain.appendChild(newDiv); //Añadimos la linea al main
	}
}

// funcion para el marcado
function mark(myButton){	
	// Verificamos si tiene o no imagen
	if ((myButton.querySelector("img") == null) && (winwin == false)){
		let myImg = document.createElement("img");
		let mySrc = document.createAttribute("src");
		mySrc.value = isTurn ? x : o; // Comprovamos el turno
		myImg.setAttributeNode(mySrc);
		myButton.appendChild(myImg);
		// funcion para guardar la posicion marcada
		markPosition(myButton.id);
		// funcion de victoria o empate
		win();
		if (winwin == false) {
			isTurn = isTurn ? false : true; //Cambiamos el turno
		} else if (winwin == true) {
			alert(`Enorabuena has ganado`);
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
			continue; // Si los tres valores son iguales tenemos un ganador
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