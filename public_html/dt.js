/*
File: dt.js
Author: Logan Benner
Purpose: This file runs all the logic and display for dragon tiger. It sends ajax requests to manage player money and uses a canvas to display the graphics.
*/


const canvas = document.getElementById('canvas1');
var con = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
imgs = [
	"./imgs/2card.png",
	"./imgs/3card.png",
	"./imgs/4card.png",
	"./imgs/5card.png",
	"./imgs/6card.png",
	"./imgs/7card.png",
	"./imgs/8card.png",
	"./imgs/9card.png",
	"./imgs/10card.png",
	"./imgs/Jcard.png",
	"./imgs/Qcard.png",
	"./imgs/Kcard.png",
	"./imgs/Acard.png",
	"./imgs/2red.png",
	"./imgs/3red.png",
	"./imgs/4red.png",
	"./imgs/5red.png",
	"./imgs/6red.png",
	"./imgs/7red.png",
	"./imgs/8red.png",
	"./imgs/9red.png",
	"./imgs/10red.png",
	"./imgs/Jred.png",
	"./imgs/Qred.png",
	"./imgs/Kred.png",
	"./imgs/Ared.png",
]
for (i = 0; i < imgs.length; i++) {
	let temp = new Image();
	temp.src = imgs[i];
	imgs[i] = temp;
	
}




/*
This is the Card class. It stores the image for the card, the position, and the momentum / movement. 
Constructor: X: static X coordinate, y: variable y coordinate, src: the Image object for the card. 
*/
class Card {
	constructor(x,y, src) {
		this.x = x;
		this.y = y;
		this.source = src;
	}
	update() {
		if (this.y < 220) {
			this.y += 2;
		}
		if (this.y > 220) {
			this.y -=2;
		}
	}
	draw() {
		con.drawImage(this.source, this.x, this.y, 100, 100);
	}
}

var img1 = new Card(110, 800, imgs[12]);
var img2 = new Card(290, -200, imgs[25]);


/*
This function animates dragon tiger. 
It clears the previously created card, then draws a new one. 
*/
function animate() {
	con.clearRect(0, 0, canvas.width, canvas.height);
	img1.update();
	img1.draw();
	img2.update();
	img2.draw();
	requestAnimationFrame(animate);
	
}

animate();

/*
nextHandDragon:
This places a $500 bet on dragon, then selects and creates the new card objects. 
*/
function nextHandDragon() {
	let ran1 = Math.floor(Math.random() * 25);
	let ran2 = Math.floor(Math.random() * 25);
	img1 = new Card(100, 800, imgs[ran1]);
	img2 = new Card(300, -200, imgs[ran2]);
	
	if (ran1 > 12) {
		ran1 -= 12;
	}
	if (ran2 > 12) {
		ran2 -= 12;
	}
	if (ran1 > ran2) {
		addMoney(500);
	}
	if (ran2 > ran1) {
		addMoney(-500);
	}
}


/*
nextHandTiger:
This places a $500 bet on tiger, then selects and creates the new card objects. 
*/
function nextHandTiger() {
	let ran1 = Math.floor(Math.random() * 25);
	let ran2 = Math.floor(Math.random() * 25);
	img1 = new Card(100, 800, imgs[ran1]);
	img2 = new Card(300, -200, imgs[ran2]);
	
	if (ran1 > 12) {
		ran1 -= 12;
	}
	if (ran2 > 12) {
		ran2 -= 12;
	}
	if (ran1 > ran2) {
		addMoney(-500);
	}
	if (ran2 > ran1) {
		addMoney(500);
	}
}





/*
addMoney(x)
x: integer amount of money change, can be positive or negative
This adds money to the current user by sending a post request with the amount change
*/

function addMoney(x) {
	let userObj = {amount: x};
	userObj = JSON.stringify(userObj);
	console.log(userObj);
	$.ajax({
		url:'/addMoney',
		method: 'POST',
		data: {user: userObj},
		success: function( result ) {
			updatePlayer();
		}
	});
}


function returnHome() {
	window.location = "home.html";
}








/*
updatePlayer:
GETs and updates the current player information on screen. This needs to be called on an interval to keep the money up to date. 
*/
function updatePlayer() {
		$.ajax({
		url: '/updatePlayer',
		method: 'GET',
		success: function(result) {
			console.log(result);
			let user = JSON.parse(result);
			let userText = $('#currUser');
			userText.html(user.username);
			let moneyText = $('#currMoney');
			moneyText.html('Your Balance: $'+ user.money);
			moneyText = $('#currBalance');
			moneyText.html('Your Balance: $'+ user.money);
			
		}
	});
	
}


/*
updatePlayer:
GETs and updates the online players information on screen. This needs to be called on an interval to keep the money up to date. 
*/
setInterval(updatePlayerList, 30000);
updatePlayerList();
updatePlayer();
function updatePlayerList() {
	$.ajax({
		url: '/playerList',
		method: 'GET',
		success: function(result) {
			console.log(result);
			let users = result;
			let userText = $('#otherUsers');
			userText.html("Currently Online Users: " + users);
			
			
		}
	});
	
}
