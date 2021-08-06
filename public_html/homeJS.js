

updatePlayer();
setInterval(updatePlayer, 5000);
updatePlayerList();
setInterval(updatePlayerList, 30000);


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



function depositMoney() {
	$.ajax({
		url: '/depositMoney',
		method: 'GET',
		success: function(result) {
			if (result == "Money Added!") {
				console.log(result);
				
			}
			else {
				console.log("result");
				
			}
			
		}
	});
	
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
			moneyText.html('Your Balance: '+ user.money);
			
		}
	});
	
}