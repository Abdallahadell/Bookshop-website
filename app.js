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
app.use('/scripts', express.static(__dirname + '/scripts/'));

var dumbo = {table:[],books:[]};

dumbo.books.push("lord of flies");
dumbo.books.push("the grapes of wrath");
dumbo.books.push("leaves of grass");
dumbo.books.push("the sun and her flowers");
dumbo.books.push("dune");
dumbo.books.push("to kill a mockingbird");

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
    res.render('readlist' , {books:books})
})

var s = JSON.stringify(dumbo);
fs.writeFileSync("users.json",s);

app.post('/register',function(req,res){
    var z = fs.readFileSync("users.json");
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    dumbo = JSON.parse(z);
    var found = dumbo.table.some(el => el.user == nameLow);

    if(found){
        res.redirect('registration' , {error: "the user already exists." , error2: ""});
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
    var found = dumbo.table.some(e => e.user == nameLow && e.password == req.body.password);

    /*for(i=0;i<dumbo.table.length;i++){
        if(dumbo.table[i].user==y.user&&dumbo.table[i].password==y.password){
            flag=true;
        }
    }*/

    if (found){
        res.render('home');
    } else{
        res.render('Login' , {error: "The username or password are incorrect."});
    }
})
app.post('/add', function(req, res){
    switch(req.body.title){
        case "sun" : pushBook("The Sun and Her Flowers", "/sun"); res.redirect("sun"); break;
        case "dune" : pushBook("Dune" , "/dune"); res.redirect("dune"); break;
        case "flies" : pushBook("Lord of the Flies" , "/flies"); res.redirect("flies"); break;
        case "grapes" : pushBook("The Grapes of Wraths" , "/grapes"); res.redirect("grapes"); break;
        case "leaves" : pushBook("Leaves of Grass" , "/leaves"); res.redirect("leaves"); break;
        case "mockingbird" : pushBook("To Kill a Mockingbird" , "/mockingbird"); res.redirect("mockingbird"); break;
        default : console.log("Nothing to push");
    }
})
var books = {Books:[]};
var booksStringfy = JSON.stringify(books);
fs.writeFileSync("books.json",booksStringfy);

function pushBook(title, link) {
    var readBooks = fs.readFileSync("books.json");
    books = JSON.parse(readBooks);
    books.Books.push({'Title' : title , 'Link' : link});
    //alert("successfully added to your readlist.");
    var booksStringfy = JSON.stringify(books);
    fs.writeFileSync("books.json",booksStringfy);
}

var list = [1,2,3];

app.listen(3003);