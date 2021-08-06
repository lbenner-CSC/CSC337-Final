/*
 Program: bj.js
 Description: This program creates a deck and simulates a single player
 blackjack game between a person and the house
*/
var suits = ["red", "black"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var players = new Array();

//Creates the deck and gives each card its need weight
function createDeck(){
    deck = new Array();
    for (var i = 0 ; i < values.length; i++){
        for(var x = 0; x < suits.length; x++){
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K"){
                weight = 10;
            }
            if (values[i] == "A"){
                weight = 11;
            }
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
    return deck;
}

//shuffles the deck randomly
function shuffle(deck){
	console.log(deck);
	for (var i = 0; i < 1000; i++){
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

//Creates the dealer and the player
function createPlayers(num){
    players = new Array();
    for(var i = 1; i <= num; i++){
    	if (i == 1){
    		var hand = new Array();
        	var player = { Name: 'Dealer', ID: i, Points: 0, Hand: hand };
        	players.push(player);
    	}
    	else{
    		var hand = new Array();
        	var player = { Name: 'YOU', ID: i, Points: 0, Hand: hand };
        	players.push(player);
    	}
    }
}

//Creates the players UI
function createPlayersUI(){
    document.getElementById('players').innerHTML = '';
    for(var i = 0; i < players.length; i++){
        var div_player = document.createElement('div');
   	    var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        if(i == 0){
        	div_playerid.innerHTML = players[i].Name;
        } else{
        	div_playerid.innerHTML = players[i].Name;
        }
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}


function returnHome() {
	window.location = "home.html";
}

//Starts the blackjack game calling all the needed methods
function startblackjack(){
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display="none";
    var deck = createDeck();
    shuffle(deck);
    createPlayers(2);
    createPlayersUI();
    document.getElementById('points_' + 0).style.color = "white";
    dealHands();
    document.getElementById('player_' + 1).classList.add('active');
}

//Deals cards to the players and makes sure not to show one of houses cards
function dealHands(){
	var card1 = deck.pop();
	players[0].Hand.push(card1);
	renderCard(card1, 0);

	var card2 = deck.pop();
	players[1].Hand.push(card2);
	renderCard(card2, 1);

	var card3 = deck.pop();
	players[0].Hand.push(card3);
	renderCard("c", 0);

	var card4 = deck.pop();
	players[1].Hand.push(card4);
	renderCard(card4, 1);

	updatePoints();
	updateDeck();


}

//retrieves the players points
function getPoints(player){
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++){
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

//updates the players points
function updatePoints(){
    for (var i = 0 ; i < players.length; i++){
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

//updates the deck length
function updateDeck(){
    document.getElementById('deckcount').innerHTML = deck.length;
}

//Shows the cards requested
function renderCard(card, player){
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card, player));
}

//Gets the correct image for the corresponding card
function getCardUI(card, player){
	if(player == 3){
		var toReturn = document.getElementById('faceDown');
	} else{
		var toReturn = document.createElement('img');
	}
    if (card == "c"){
    	toReturn.src = "./imgs/cardBack.png"
    	toReturn.id = 'faceDown';
    }
    else if(card.Suit == "black"){
    	if(card.Value == "A"){
    		toReturn.src = "./imgs/Acard.png";
    	}
    	else if(card.Value == "K"){
    		toReturn.src = "./imgs/Kcard.png";
    	}

    	else if(card.Value == "Q"){
    		toReturn.src = "./imgs/Qcard.png";
    	}

    	else if(card.Value == "J"){
    		toReturn.src = "./imgs/Jcard.png";
    	}

    	else if(card.Value == "10"){
    		toReturn.src = "./imgs/10card.png";
    	}

    	else if(card.Value == "9"){
    		toReturn.src = "./imgs/9card.png";
    	}

    	else if(card.Value == "8"){
    		toReturn.src = "./imgs/8card.png";
    	}

    	else if(card.Value == "7"){
    		toReturn.src = "./imgs/7card.png";
    	}

    	else if(card.Value == "6"){
    		toReturn.src = "./imgs/6card.png";
    	}

    	else if(card.Value == "5"){
    		toReturn.src = "./imgs/5card.png";
    	}

    	else if(card.Value == "4"){
    		toReturn.src = "./imgs/4card.png";
    	}

    	else if(card.Value == "3"){
    		toReturn.src = "./imgs/3card.png";
    	}

    	else if(card.Value == "2"){
    		toReturn.src = "./imgs/2card.png";
    	}
    }

    else if (card.Suit == "red"){
        if(card.Value == "A"){
    		toReturn.src = "./imgs/Ared.png";
    	}
    	else if(card.Value == "K"){
    		toReturn.src = "./imgs/Kred.png";
    	}

    	else if(card.Value == "Q"){
    		toReturn.src = "./imgs/Qred.png";
    	}

    	else if(card.Value == "J"){
    		toReturn.src = "./imgs/Jred.png";
    	}

    	else if(card.Value == "10"){
    		toReturn.src = "./imgs/10red.png";
    	}

    	else if(card.Value == "9"){
    		toReturn.src = "./imgs/9red.png";
    	}

    	else if(card.Value == "8"){
    		toReturn.src = "./imgs/8red.png";
    	}

    	else if(card.Value == "7"){
    		toReturn.src = "./imgs/7red.png";
    	}

    	else if(card.Value == "6"){
    		toReturn.src = "./imgs/6red.png";
    	}

    	else if(card.Value == "5"){
    		toReturn.src = "./imgs/5red.png";
    	}

    	else if(card.Value == "4"){
    		toReturn.src = "./imgs/4red.png";
    	}

    	else if(card.Value == "3"){
    		toReturn.src = "./imgs/3red.png";
    	}

    	else if(card.Value == "2"){
    		toReturn.src = "./imgs/2red.png";
    	}
    }
    toReturn.className = 'card';
    return toReturn;
}

//Adds a card to the player
function hitMe(){
    var card = deck.pop();
    players[1].Hand.push(card);
    if (players[1].Points > 21){
    	return;
    }
    renderCard(card, 1);
    updatePoints();
    check();
}

//checks to see if player is over 21
function check(){
    if (players[1].Points > 21){
    	document.getElementById('status').innerHTML = 'HOUSE WINS :(';
		addMoney(-200);
    	document.getElementById('status').style.display = "inline-block";
    }
}

//means its the dealers turn
function stay(){
	document.getElementById('player_' + 1).classList.remove('active');
	document.getElementById('player_' + 0).classList.add('active');
    dealerTurn();
}

//Dealer hits if needed or stands and compares points to the player
function dealerTurn(){
	var card = players[0].Hand[1];
	getCardUI(card, 3);
	document.getElementById('points_'+ 0).style.color = "black";
	if (players[0].Points >= 17){
		console.log(players[0].Points);
		if(players[0].Points > players[1].Points){
			console.log(players[0].Points);
			document.getElementById('status').innerHTML = 'HOUSE WINS :(';
			addMoney(-200);
			document.getElementById("status").style.display = "inline-block";
		}
		else if(players[0].Points < players[1].Points){
			console.log(players[0].Points);
			document.getElementById('status').innerHTML = 'YOU WON';
			addMoney(200);
			document.getElementById("status").style.display = "inline-block";
		} else{
			console.log(players[0].Points);
			document.getElementById('status').innerHTML = 'PUSH';
			document.getElementById("status").style.display = "inline-block";
		}
	}
	else{
		dealerHit();
	}
}

//The dealer hits and checks to see if who won
function dealerHit(){
	while(players[0].Points < 17){
		var card = deck.pop();
    	players[0].Hand.push(card);
    	renderCard(card, 0);
    	updatePoints();
    	if (players[0].Points > 21 && players[1].Points <= 21){
    		console.log(players[0].Points);
    		document.getElementById('status').innerHTML = 'YOU WON';
			addMoney(200);
    		document.getElementById("status").style.display = "inline-block";
    		break;
    	}
    	else if(players[0].Points <= 21 && players[0].Points > players[1].Points){
    		document.getElementById('status').innerHTML = 'HOUSE WINS :(';
			addMoney(-200);
    		document.getElementById("status").style.display = "inline-block";
    		console.log(players[0].Points);
    		break;
    	}
    	else if(players[0].Points <= 21 && players[0].Points < players[1].Points){
    		document.getElementById('status').innerHTML = 'YOU WON';
			addMoney(200);
    		document.getElementById("status").style.display = "inline-block";
    		console.log(players[0].Points);
    		break;
    	}
    	else if(players[0].Points <= 21 && players[0].Points == players[1].Points){
    		document.getElementById('status').innerHTML = 'PUSH';
    		document.getElementById("status").style.display = "inline-block";
    		console.log(players[0].Points);
    		break;
    	}
	}
    
}

//adds money to the user
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

//Updates the players current balance 
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
