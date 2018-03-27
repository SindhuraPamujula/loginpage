var express = require('express');
var signup = require('./controller/registerForm');

var app = express( );
//set up view engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));
signup(app);
app.listen(3333);
console.log('server is listening');
