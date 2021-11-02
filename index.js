//js

let myArray = [];


function Square() {
	let newButton = document.createElement("button");
	let myAttribute = document.createAttribute("class");
	myAttribute.value = "square";
	newButton.setAttributeNode(myAttribute);
	
	return newButton;
}

function Model() {
	let elementMain = document.querySelector("main");
	
	for (controlRow=0; controlRow != 9; controlRow++) {
		elementMain.appendChild(Square());
	}
}