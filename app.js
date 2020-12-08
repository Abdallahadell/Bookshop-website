var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var popup = require('node-popup');
const { stringify } = require('querystring');
const Window = require('window');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
res.render('login')
});
app.get('/registration',function(req,res){
    res.render('registration', {error: ""})
});
app.get('/home',function(req,res){
    res.render('home')
});
var dumbo = {
    table:[]
};
var s = JSON.stringify(dumbo);
fs.writeFileSync("users.json",s);
app.post('/register',function(req,res){
   var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var found = dumbo.table.some(el => el.user == req.body.username);
    if(found){
       res.render('registration' , {error: "the user already exists."});
    }

    if(!found){
    dumbo.table.push({'user':req.body.username,'password':req.body.password});
    var y = JSON.stringify(dumbo);
    
    fs.writeFileSync("users.json",y);
    res.render('Login');
    }   

});
app.post('/Enter',function(req,res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    y = {user:req.body.username,password:req.body.password};
    var flag = false;
    for(i=0;i<dumbo.table.length;i++){
        if(dumbo.table[i].user==y.user&&dumbo.table[i].password==y.password){
            flag=true;
        }
    }
    if (flag){
        res.render('home');
    }else{
        res.render('Login' , {error: "The username or password are incorrect."});
    }
})

app.listen(3003);