function loginUser() {
	let userLog = $('#loginName').val();
	let userPass = $('#loginPass').val();
	let userObj = {username: userLog, password: userPass};
	userObj = JSON.stringify(userObj);
	console.log(userObj);
	$.ajax({
		url:'/login',
		method: 'POST',
		data: {user: userObj},
		success: function( result ) {
			if (result == 'Success') {
				window.location = "home.html";
				
			}
			else {
				let resultText = $('#loginResult');
			resultText.css({'color':'red'});
				resultText.html('Username or Password incorrect please try again');
			}
		}
	});
}

function addUser() {
	let createName = $('#createName').val();
	let createPass = $('#createPass').val();
	let userObj = {username: createName, password: createPass};
	userObj = JSON.stringify(userObj);
	console.log(userObj);
	$.ajax({
		url:'/signup',
		method: 'POST',
		data: {user: userObj},
		success: function( result ) {
			if (result == 'Success') {
				let resultText = $('#loginResult');
				resultText.css({'color':'green'});
				resultText.html('Account Created');
				
			}
			else {
				let resultText = $('#loginResult');
			resultText.css({'color':'red'});
				resultText.html('Username taken please try another one.');
			}
		}
	});
	
	
	
}


function toHelpPage() {
	window.location = "help.html";
}