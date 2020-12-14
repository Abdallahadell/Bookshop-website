/*var books = {Books:[]};
var booksStringfy = JSON.stringify(books);
fs.writeFileSync("books.json",booksStringfy);*/

function pushBook(title, link) {
    var readBooks = fs.readFileSync("books.json");
    books = JSON.parse(readBooks);
    books.Books.push({'Title' : title , 'Link' : link});
    var booksStringfy = JSON.stringify(books);
    fs.writeFileSync("books.json",booksStringfy);
}