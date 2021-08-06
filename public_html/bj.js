var suits = ["red", "black"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var players = new Array();
var currentPlayer = 0;

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

        div_playerid.innerHTML = players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

function returnHome() {
	window.location = "home.html";
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

function startblackjack(){
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display="none";
    currentPlayer = 0;
    var deck = createDeck();
    shuffle(deck);
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands(){
    for(var i = 0; i < 2; i++){
      	for (var x = 0; x < players.length; x++){
            var card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
    updateDeck();
}

function getPoints(player){
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++){
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function updatePoints(){
    for (var i = 0 ; i < players.length; i++){
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function updateDeck(){
    document.getElementById('deckcount').innerHTML = deck.length;
}

function renderCard(card, player){
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card){
    var toReturn = document.createElement('img');
    if(card.Suit == "black"){
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

var currentPlayer = 2;
function hitMe(){
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
    console.log(players);
}

function check(){
    if (players[currentPlayer].Points > 21){
    	document.getElementById('status').innerHTML = players[currentPlayer].Name + ' LOST';
    	document.getElementById('status').style.display = "inline-block";
    	end();
    }
}

function stay(){
    if (currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }
    else {
        end();
    }
}

function end(){
    var winner = -1;
    var score = 0;

    for(var i = 0; i < players.length; i++){
        if (players[i].Points > score && players[i].Points < 22){
            winner = i;
        }

        score = players[i].Points;
    }

    if(players[winner].ID == 1){
    	document.getElementById('status').innerHTML = 'OOPSIE HOUSE WINS';
    } else{
    	document.getElementById('status').innerHTML = 'YOU WIN';
    }

   
}