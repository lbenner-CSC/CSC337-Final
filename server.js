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


const hostname = '127.0.0.1';
const port = 5000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

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
	console.log(body);
    const check = await User.findOne({ username: body.username });
	console.log(check);
    if (check) {
      // check user password with hashed password stored in the database
		bcrypt.compare(body.password, check.password, function (err, result) {
			if (result) {
				res.send("Succes");
			  } else {
				res.send("Invalid Password");
			  }
			
		});
      
    } else {
      res.send("Invalid Username");
    }
  });


























