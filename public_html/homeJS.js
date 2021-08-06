

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

getSlots();

function getSlots() {
	$.ajax({
		url: '/slot',
		method: 'GET',
		success: function(result) {
			console.log(result);
			let slot = JSON.parse(result);
			let slotText = $('#slot1');
			slotText.html(slot.description);
			let slotTitle = $('slotLink');
			slotTitle.html(slot.title);
			let slotImage = $('slotImage');
			slotImage.attr("src", slot.background);
			let slotLink = $('slotLink');
			slotLink.attr("href", slot.page);
		}
	});
	
}

function getTables() {
	$.ajax({
		url: '/tables',
		method: 'GET',
		success: function(result) {
			console.log(result);
			let tables = JSON.parse(result);
			let tab1Text = $('#table1');
			tab1Text.html(tables.first.description);
			let tab1Title = $('bjLink');
			tab1Title.html(tables.first.title);
			let tab1Image = $('table1Image');
			tab1Image.attr("src", tables.first.background);
			let tab1Link = $('bjLink');
			tab1Link.attr("href", tables.first.page);
			
			
			
			let tab2Text = $('#table2');
			tab2Text.html(tables.second.description);
			let tab2Title = $('roulLink');
			tab2Title.html(tables.second.title);
			let tab2Image = $('table2Image');
			tab2Image.attr("src", tables.second.background);
			let tab2Link = $('roulLink');
			tab2Link.attr("href", tables.second.page);
		}
	});
	
	
}












