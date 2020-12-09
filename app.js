var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
const { stringify } = require('querystring');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var dumbo = {table:[],books:[]};
dumbo.books.push("lord of flies")
dumbo.books.push("the grapes of wrath")
dumbo.books.push("leaves of grass")
dumbo.books.push("the sun and her flowers")
dumbo.books.push("dune")
dumbo.books.push("to kill a mockingbird")
var s = JSON.stringify(dumbo);
fs.writeFileSync("users.json",s);
app.get('/',function(req,res){
    res.render('login' , {error: ""})
});
app.get('/registration',function(req,res){
    res.render('registration', {error: "" , error2 : ""})
});
app.get('/home',function(req,res){
    res.render('home')
});
app.get('/fiction',function(req,res){
    res.render('fiction')
})
app.get('/novel',function(req,res){
    res.render('novel')
})
app.get('/poetry',function(req,res){
    res.render('poetry')
})
app.get('/flies',function(req,res){
    res.render('flies')
})
app.get('/grapes',function(req,res){
    res.render('grapes')
})
app.get('/leaves',function(req,res){
    res.render('leaves')
})
app.get('/sun',function(req,res){
    res.render('sun')
})
app.get('/mockingbird',function(req,res){
    res.render('mockingbird')
})
app.get('/dune',function(req,res){
    res.render('dune')
})
app.get('/readlist',function(req,res){
    res.render('readlist')
})
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
/*app.post('/search',function(req,res){
   var read = fs.readFileSync("users.json")
   var dumbo = JSON.parse(read)

})*/
app.listen(3003);