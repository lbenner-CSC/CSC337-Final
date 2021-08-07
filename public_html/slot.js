/*
File: slot.js
Author: Logan Benner
Purpose: This file creates, and animates the slot machine. It also displays user information and can change the balance of a player. 

*/


const canvas = document.getElementById('canvas1');
var con = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
imgs = [
	"./imgs/7.png",
	"./imgs/10.png",
	"./imgs/apple.png",
	"./imgs/cherry.png",
	"./imgs/j.png",
	"./imgs/k.png",
	"./imgs/q.png",
]
for (i = 0; i < imgs.length; i++) {
	let temp = new Image();
	temp.src = imgs[i];
	imgs[i] = temp;
	
}




con.drawImage(imgs[2], 100, 100, 100, 100);
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousedown', function(event) {
	
	newSpin();
});


/*
SlotImage: This is the image and position information for the slot machine.
x: the x coordinate for the image to move down on.
src: the Image object for the slot.
*/
class SlotImage {
	constructor(x, src) {
		this.x = x;
		this.y = -100;
		this.source = src
	}
	update(){
		if (this.y <= 110) {
			this.y += 2;
		}
	}
	draw() {
		con.drawImage(this.source, this.x, this.y, 100, 100);
	}
}

var img1 = new SlotImage(70, imgs[2]);
var img2 = new SlotImage(200, imgs[2]);
var img3 = new SlotImage(330, imgs[2]);


/*
This function animates the slot machine. 
It clears the SlotImages from the previous frame and them draws them with the new information 
*/
function animate() {
	con.clearRect(0, 0, canvas.width, canvas.height);
	img1.update();
	img1.draw();
	img2.update();
	img2.draw();
	img3.update();
	img3.draw();
	requestAnimationFrame(animate);
}

animate();




/*
newSpin:
This function randomly selects three images, removes $500 and then if 2 or more from the left reel match it adds the appropriate amount of money.
*/
function newSpin() {
	addMoney(-500);
	let ran1 = Math.floor(Math.random() * 7);
	let ran2 = Math.floor(Math.random() * 7);
	let ran3 = Math.floor(Math.random() * 7);
	console.log(ran1, ran2, ran3);
	img1 = new SlotImage(70, imgs[ran1]);
	img2 = new SlotImage(200, imgs[ran2]);
	img3 = new SlotImage(330, imgs[ran3]);
	if(ran1 == ran2 && ran1 != ran3) {
		addMoney(1500);
		let audio = new Audio('./media/jackpot.mp3');
		audio.play();
		updatePlayer();
	} else if( ran1 == ran2 && ran1 == ran3) {
		addMoney(10000);
		let audio = new Audio('./media/jackpot.mp3');
		audio.play();
		updatePlayer();
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


//returns to home page
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


setInterval(updatePlayerList, 30000);
updatePlayerList();
updatePlayer();



/*
updatePlayer:
GETs and updates the online players information on screen. This needs to be called on an interval to keep the money up to date. 
*/
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

