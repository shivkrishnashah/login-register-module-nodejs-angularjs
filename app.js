const express = require('express')
const app = express()
const port = 8000
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
  database : 'notes',

});
connection.connect();

app.use('/', express.static(path.join(__dirname, 'login')));

app.use('/saveData', function (req, res, next) {

  let check_email = "SELECT * FROM users WHERE email = "+connection.escape(req.body.email);
  console.log(check_email);
  connection.query(check_email, function (error, results) {
    if(error){
      let response = {status:false, message: "Error in adding."};
      res.jsonp(response);
    }else{
        if(results.length>0){
          let response = {status:false, message: "Email Already Exists."};
          res.jsonp(response);
        }else{
          bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let query = "INSERT INTO `users`(`password`, `name`, `contact`, `email`, `created_on`, `modified_on`) VALUES (?,?,?,?,?,?)";
            let data =[hash, req.body.username,  req.body.contact, req.body.email, +new Date(), +new Date()]
            connection.query(query, data, function (error, results) {
                if (error) {
                  let response = {status:false, message: "Error in adding."};
                  res.jsonp(response);
                }else{
                  let response  = {status:true, message: "Added Successfully."};
                  res.jsonp(response);
                }
            });
          });
        }
    }
  });
}, function (req, res, next) {
  console.log('Request Type:', req.method)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
