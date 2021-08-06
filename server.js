/*AUTHOR: Logan Benner
*Program: Final Project
*File: server.js
*Purpose: 
 ---TODO---
*/
const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/final';
mongoose.connect(mongoDBURL, {useNewUrlParser: true});
db.on('error', console.error.bind(console, "MongoDB Error"));



var Schema = mongoose.Schema;
var UserSchema = new Schema(// Items
{ username: String,
  password: String,
  money: Number,
  lastDeposit: Number });
var TableGameSchema = new Schema(// Table Games
{	title: String, 
	description: String,
	dealers: [],
	javascript: String
});
var SlotSchema = new Schema(
{	title: String, 
	description: String,
	javascript: String
});

var Table = mongoose.model('Table', TableGameSchema );

var User = mongoose.model('User', UserSchema );

var Slot = mongoose.model('Slot', SlotSchema);

var loggedIn = [];


const hostname = '127.0.0.1';
const port = 5000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.use('/home.html', (req, res, next) => {
	let cookie = req.cookies.login;
	if (cookie != undefined) {
		next();
	}	else {
		res.send('Please login before accessing homepage');
	}
});

app.use(express.static('./public_html'))
app.listen(port, () => 
console.log('App listening at http://localhost: ${port}'));



app.post("/signup", async (req, res) => {
	const body = JSON.parse(req.body.user);
	console.log(req.body);
	console.log(body);
	const check = await User.findOne({username : body.username});
	if (!check) {
		const newUser = JSON.parse(req.body.user);
		newUser.money = 0;
		newUser.lastDeposit = 0;
		const user = new User(newUser);
		bcrypt.hash(user.password, 10, (err, hash) => {
			user.password = hash;
			user.save().then((doc) => res.send("Success"));
		});
	} else {
		res.send('Failed');
	}
  });


app.post("/login", async (req, res) => {
    const body = JSON.parse(req.body.user);
    const check = await User.findOne({ username: body.username });
    if (check) {
      // check user password with hashed password stored in the database
		bcrypt.compare(body.password, check.password, function (err, result) {
			if (result) {
				let now = new Date();
				let found = 0;
				for (i = 0; i < loggedIn.length; i++) {
					if (loggedIn[i].username == body.username) {
						found = 1;
					}
				}
				if (found == 0) {
					loggedIn.push({username: body.username, expire : Date.now() + 300000});
				}
				res.cookie('login', {user: body.username, money: check.money}, {maxAge: 300000});
				res.send("Success");
			  } else {
				res.send("Invalid Password");
			  }
			  
			
		});
      
    } else {
      res.send("Invalid Username");
    }
  });
app.post('/addMoney/', (req, res) => {
	let cookie = req.cookies.login;
	if (cookie != undefined) {
		User.find({username : req.cookies.login.user}).exec(function(error, results) {
			if (results != null) {
				let player = results[0]; 
				let body = JSON.parse(req.body.user);
				player.money += body.amount;
				player.save();
			}
			else {
				res.send("Error");
			}
		});
		
		
	}
	
	
});






app.get('/depositMoney', (req, res) => {
	let cookie = req.cookies.login;
	if (cookie != undefined) {
		User.find({username : req.cookies.login.user}).exec(function(error, results) {
			if (results != null) {
				let player = results[0];
				let currDate = new Date();
				let lastDate = player.lastDeposit;
				let timeDiff = (currDate - lastDate) / 1000;
				if (timeDiff > 36000) {
					player.money += 10000;
					player.lastDeposit = currDate;
					player.save();
					res.send("Money Added!");
				} else {
					timeDiff = timeDiff / 3600;
					res.send(timeDiff.toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigis: 2
					}));
				}
			}
			else {
				res.send("Error");
			}
		});
	}
});


app.get('/updatePlayer', (req, res) => {
	let cookie = req.cookies.login;
	if (cookie != undefined) {
		User.find({username : req.cookies.login.user}).exec(function(error, results) {
			if (results != null) {
				let result = results[0];
				result = JSON.stringify(result);
				res.send(result);
			}
			else {
				res.send("Error");
			}
		});
	}
});


app.get('/playerList', (req, res) => {
	let toSend = '';
	let now = new Date();
	for (i = 0; i < loggedIn.length; i++) {
		if (now < loggedIn[i].expire) {
			toSend += loggedIn[i].username + ', ';
		}
		else {
			loggedIn.pop(i);
			i--;
		}
		
	}
	res.send(toSend);
	
});


















