var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database

mongoose.connect('mongodb://localhost/signupdata');
mongoose.connection.once('open',function(){
  console.log('connection made');
}).on('error',function(error){
  console.log('error'+error);
});

//create a schema
var signupschema=  new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  password:String
});
var SignupModel = mongoose.model('Signupschema',signupschema);

module.exports = function(app){


  // create application/json parser
  var jsonParser = bodyParser.json();

  // create application/x-www-form-urlencoded parser
  var urlencodedParser = bodyParser.urlencoded({ extended: false });
  app.get('/register',function(req,res){
      res.render('register');

  });
app.post('/register' ,urlencodedParser,function(req,res){
  console.log('post',req.body);
SignupModel.findOne(req.body,function(err,data){
  if(err) throw err;
  if(data == null){
    SignupModel(req.body).save(function(err,data){
      if(err) throw err;
      console.log('login');
      res.render('login');
    });
  }
  else{
    console.log('already registered login');
    res.render('login');
  }
  });
});
app.post('/login' ,urlencodedParser,function(req,res){
  console.log('post',req.body);
  SignupModel.findOne(req.body,function(err,data){
    if(err) throw err;
    if(data == null){
      res.end("user is not registered");
    }
    else{
        res.json(data);
    }
  });

});

};
