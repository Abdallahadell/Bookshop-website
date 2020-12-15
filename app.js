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
dumbo.books.push({name:"lord of flies",direct:'/flies'})
dumbo.books.push({name:"the grapes of wrath",direct:'/grapes'})
dumbo.books.push({name:"leaves of grass",direct:'/leaves'})
dumbo.books.push({name:"the sun and her flowers",direct:'/sun'})
dumbo.books.push({name:"dune",direct:'/dune'})
dumbo.books.push({name:"to kill a mockingbird",direct:'/mockingbird'})
var s = JSON.stringify(dumbo);
fs.writeFileSync("users.json",s);

var books = {Books:[]};
var booksStringfy = JSON.stringify(books);
fs.writeFileSync("books.json",booksStringfy);

app.get('/login',function(req,res){
    res.render('login' , {error: ""})
});

app.get('/',function(req,res){
    res.redirect('login')
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
    res.render('readlist' , {booklist :books.Books})
})

/*var s = JSON.stringify(dumbo);*/
//fs.writeFileSync("users.json",s);

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
            res.redirect('/login');
        } else { res.render('registration' , {error: "" , error2: "The username or password cannot be empty."}); }
    }   
});

app.post('/login',function(req,res){
    var z = fs.readFileSync("users.json");
    dumbo = JSON.parse(z);
    var name = req.body.username;
    var nameLow = name.toLowerCase();
    var found = dumbo.table.some(e => e.user == nameLow && e.password == req.body.password);

    if (found){
        res.redirect('home');
    } else{
        res.render('login' , {error: "The username or password are incorrect."});
    }
})
app.post('/add', function(req, res){
    var found = books.Books.some(e => e.Title === req.body.title);
    if(found){
        console.log("Already added.");
        res.redirect(req.body.title);
        return;
    } else {
        switch(req.body.title){
            case "sun" : pushBook("sun", "/sun"); res.redirect("sun"); break;
            case "dune" : pushBook("dune" , "/dune"); res.redirect("dune"); break;
            case "flies" : pushBook("flies" , "/flies"); res.redirect("flies"); break;
            case "grapes" : pushBook("grapes" , "/grapes"); res.redirect("grapes"); break;
            case "leaves" : pushBook("leaves" , "/leaves"); res.redirect("leaves"); break;
            case "mockingbird" : pushBook("mockingbird" , "/mockingbird"); res.redirect("mockingbird"); break;
            default : console.log("Nothing to push");
        }
    }
})

function pushBook(title, link) {
    var readBooks = fs.readFileSync("books.json");
    books = JSON.parse(readBooks);
    books.Books.push({'Title' : title , 'Link' : link});
    //alert("successfully added to your readlist.");
    var booksStringfy = JSON.stringify(books);
    fs.writeFileSync("books.json",booksStringfy);
}

app.post('/search', function(req,res){
    var read = fs.readFileSync("users.json");
    var dumbo = JSON.parse(read);
    var searchresults ={books:[]}
    var zzz = req.body.Search;
    var namelow = zzz.toLowerCase();
    for(i = 0; i<dumbo.books.length; i++){
        if(dumbo.books[i].name.includes(namelow) && namelow!= ""){
            searchresults.books.push(dumbo.books[i]);
        }
    }
    if(searchresults.books.length != 0){
        res.render('searchresults' , {contents: searchresults.books , zero:""})
    }
    else{
        res.render('searchresults' , {contents: 0, zero:"No results"})
    }
})

app.listen(3003);