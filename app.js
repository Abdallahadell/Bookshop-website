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
var session = require('express-session');
const { render } = require('ejs');

var dumbo;
/*dumbo.books.push({name:"lord of flies",direct:'/flies'})
dumbo.books.push({name:"the grapes of wrath",direct:'/grapes'})
dumbo.books.push({name:"leaves of grass",direct:'/leaves'})
dumbo.books.push({name:"the sun and her flowers",direct:'/sun'})
dumbo.books.push({name:"dune",direct:'/dune'}) 
dumbo.books.push({name:"to kill a mockingbird",direct:'/mockingbird'})
var s = JSON.stringify(dumbo);
fs.writeFileSync("users.json",s);*/

app.use(session({ secret: 'keyboard cat',resave:false,rolling:true,saveUninitialized:false, cookie: { maxAge: 180000}}));

app.get('/searchresults',function(req,res){
    if (req.session.user){
        req.session.touch
        if(searchresults.books.length != 0){
            res.render('searchresults' , {contents: searchresults.books , zero:""})
        }
        else{
            res.render('searchresults' , {contents: 0, zero:"No results"})
        }
    }
    else{
        res.redirect('/login')
    }
})
app.get('/login',function(req,res){
    res.render('login' , {error: ""});
}); 
app.get('/',function(req,res){
    if (req.session.user){
        req.session.touch
        res.redirect('home');
    }
    else{
        res.redirect('/login')
    }
});
app.get('/registration',function(req,res){
    res.render('registration', {error: "" , error2 : ""});
});
app.get('/home',function(req,res){
    if (req.session.user){
        req.session.touch
        res.render('home');
    }
    else{
        res.redirect('/login')
    }
});
app.get('/fiction',function(req,res){
    if (req.session.user){
        req.session.touch
        res.render('fiction');
    }
    else{
        res.redirect('/login')
    }
})
app.get('/novel',function(req,res){
    if (req.session.user){
        req.session.touch
        res.render('novel');
    }
    else{
        res.redirect('/login')
    }
})
app.get('/poetry',function(req,res){
    if (req.session.user){
        req.session.touch
        res.render('poetry');
    }
    else{
            res.redirect('/login')
    }
})
app.get('/flies',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('flies' , {bool : dumbo.readlist[x].some(e => e.Title == 'Lord of the Flies')});
    }
    else{
            res.redirect('/login')
    }
})
app.get('/grapes',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('grapes' , {bool : dumbo.readlist[x].some(e => e.Title == 'The Grapes of Wrath')});
    }
    else{
        res.redirect('/login')
    }
})
app.get('/leaves',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('leaves' , {bool : dumbo.readlist[x].some(e => e.Title == 'Leaves of Grass')});
    }
    else{
        res.redirect('/login')
    }
})
app.get('/sun',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('sun' , {bool : dumbo.readlist[x].some(e => e.Title == 'The Sun and Her Flowers')});
    }
    else{
        res.redirect('/login')
    }
})
app.get('/mockingbird',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('mockingbird' , {bool : dumbo.readlist[x].some(e => e.Title == 'To Kill a Mockingbird')});
    }
    else{
        res.redirect('/login')
    }
})
app.get('/dune',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('dune' , {bool : dumbo.readlist[x].some(e => e.Title == 'Dune')});
    }
    else{
        res.redirect('/login')
    }
})
app.get('/readlist',function(req,res){
    if (req.session.user){
        req.session.touch
        var z = fs.readFileSync("users.json");
        dumbo = JSON.parse(z);
        var x = dumbo.table.findIndex(e => e.user == req.session.user);
        res.render('readlist' , {booklist : dumbo.readlist[x]});
    }
    else{
        res.redirect('/login')
    }
})

app.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/login');
});
app.post('/register',function(req,res){
    var z = fs.readFileSync("users.json");
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    dumbo = JSON.parse(z);
    var found = dumbo.table.some(el => el.user == nameLow);

    if(found){
        res.render('registration' , {error: "the user already exists." , error2: ""});
    }
    else{
        if(req.body.password != "" && req.body.username != "") {
            dumbo.table.push({'user':nameLow,'password':req.body.password});
            dumbo.readlist.push([]);
            var y = JSON.stringify(dumbo);
            fs.writeFileSync("users.json",y);
            res.redirect('/login');
        } 
        else { res.render('registration' , {error: "" , error2: "The username or password cannot be empty."}); }
    }   
});
app.post('/login',function(req,res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    var found = dumbo.table.some(e => e.user == nameLow && e.password == req.body.password);

    if (found){
        req.session.user = nameLow;
        currentusername = nameLow;
        res.redirect('home');
    } else{
        res.render('login' , {error: "The username or password are incorrect."});
    }
})
app.post('/add', function(req, res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var x = dumbo.table.findIndex(e => e.user == req.session.user);
    var found = dumbo.readlist[x].some(e => e.Title === req.body.title);
        switch(req.body.title){
            case "The Sun and Her Flowers" : 
                if(!found){
                    pushBook("The Sun and Her Flowers", "/sun", req.session.user);
                } 
                res.redirect("sun"); break;
            case "Dune" : 
                if(!found){
                    pushBook("Dune" , "/dune", req.session.user);
                }
                res.redirect("dune"); break;
            case "Lord of the Flies" : 
                if(!found){
                    pushBook("Lord of the Flies" , "/flies", req.session.user);
                }
                res.redirect("flies"); break;
            case "The Grapes of Wrath" : 
                if(!found){
                    pushBook("The Grapes of Wrath" , "/grapes", req.session.user);
                }
                res.redirect("grapes"); break;
            case "Leaves of Grass" : 
                if(!found){
                    pushBook("Leaves of Grass" , "/leaves", req.session.user);
                } 
                res.redirect("leaves"); break;
            case "To Kill a Mockingbird" : 
                if(!found){
                    pushBook("To Kill a Mockingbird" , "/mockingbird", req.session.user);
                } 
                res.redirect("mockingbird"); break;
            default : console.log("Nothing to push");
        }
})
app.post('/remove', function(req, res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var x = dumbo.table.findIndex(e => e.user == req.session.user);
    var bookIndex = dumbo.readlist[x].findIndex(e => e.Title == req.body.title);
    dumbo.readlist[x].splice(bookIndex, 1);
    var booksStringfy = JSON.stringify(dumbo);
    fs.writeFileSync("users.json",booksStringfy);
    res.redirect("/readlist");
})

var searchresults ={books:[]}
app.post('/search', function(req,res){
    while(searchresults.books.length != 0){
        searchresults.books.pop();
    }
    var read = fs.readFileSync("users.json");
    dumbo = JSON.parse(read);
    var zzz = req.body.Search;
    var namelow = zzz.toLowerCase();
    for(i = 0; i<dumbo.books.length; i++){
        if(dumbo.books[i].name.includes(namelow) && namelow!= ""){
            searchresults.books.push(dumbo.books[i]);
        }
    }
    res.redirect('/searchresults');
})

function pushBook(title, link, currentuser) {
    var readBooks = fs.readFileSync("users.json");
    dumbo = JSON.parse(readBooks);
    var z = dumbo.table.findIndex(e => e.user == currentuser);
    dumbo.readlist[z].push({'Title' : title , 'Link' : link});
    var booksStringfy = JSON.stringify(dumbo);
    fs.writeFileSync("users.json",booksStringfy);
}

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));