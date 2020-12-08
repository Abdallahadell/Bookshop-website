var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
const { stringify } = require('querystring');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.render('login' , {error: ""})
});
app.get('/registration',function(req,res){
    res.render('registration', {error: "" , error2 : ""})
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
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    dumbo = JSON.parse(z);
    var found = dumbo.table.some(el => el.user == nameLow);
    if(found){
       res.render('registration' , {error: "the user already exists." , error2: ""});
    }

    if(!found){
        if(req.body.password != "" && req.body.username != "") {
            dumbo.table.push({'user':nameLow,'password':req.body.password});
            var y = JSON.stringify(dumbo);
            fs.writeFileSync("users.json",y);
            res.render('Login' , {error: ""});
        } else { res.render('registration' , {error: "" , error2: "The username or password cannot be empty."}); }
    }   

});
app.post('/Enter',function(req,res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    y = {user:nameLow,password:req.body.password};
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