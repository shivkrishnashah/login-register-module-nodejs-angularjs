const express = require('express')
const app = express()
const port = 3000
var path = require("path");
var router = express.Router();
var bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'notes'
});
connection.connect();

app.use('/', express.static(path.join(__dirname, 'login')));

app.use('/saveData', function (req, res, next) {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log('hash', hash);
    let query = "INSERT INTO `users`(`password`, `name`, `contact`, `email`, `created_on`, `modified_on`) VALUES (?,?,?,?,?,?)";
    let data =[hash, req.body.username,  req.body.contact, req.body.email, +new Date(), +new Date()]
    connection.query(query, data, function (error, results) {
      if (error) throw error;
      let data = {
        status: true
      }
      res.jsonp(data);
    });
  });



}, function (req, res, next) {
  console.log('Request Type:', req.method)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
