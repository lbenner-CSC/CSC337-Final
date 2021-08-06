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

function animate() {
	con.clearRect(0, 0, canvas.width, canvas.height);
	img1.update();
	img1.draw();
	img2.update();
	img2.draw();
	requestAnimationFrame(animate);
	
}

animate();


function nextHandDragon() {
	let ran1 = Math.floor(Math.random() * 25);
	let ran2 = Math.floor(Math.random() * 25);
	img1 = new Card(100, 800, imgs[ran1]);
	img2 = new Card(300, -200, img[ran2]);
	
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
function nextHandTiger() {
	let ran1 = Math.floor(Math.random() * 25);
	let ran2 = Math.floor(Math.random() * 25);
	img1 = new Card(150, 800, imgs[ran1]);
	img2 = new Card(350, -200, img[ran2]);
	
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