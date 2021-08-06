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

var img1 = new SlotImage(70, imgs[1]);
var img2 = new SlotImage(200, imgs[2]);
var img3 = new SlotImage(330, imgs[3]);

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





function newSpin() {
	addMoney(-500);
	let ran1 = Math.floor(Math.random() * 7);
	let ran2 = Math.floor(Math.random() * 7);
	let ran3 = Math.floor(Math.random() * 7);
	console.log(ran1, ran2, ran3);
	img1 = new SlotImage(70, imgs[ran1]);
	img2 = new SlotImage(200, imgs[ran2]);
	img3 = new SlotImage(330, imgs[ran3]);
	if(ran1 == ran2) {
		addMoney(1500);
	} else if( ran1 == ran2 && ran1 == ran3) {
		addMoney(10000);
		
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
			
		}
	});
}

function returnHome() {
	window.location = "home.html";
}



