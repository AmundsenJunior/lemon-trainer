var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

var mongoclient = new MongoClient(new Server('localhost', 27017,
                                                { 'native_parser' : true}));
var db = mongoclient.db('lemon-trainer');

var namesArray = new Array();

app.get('/', function (req, res) {
    var collection = db.collection('names');
    
    collection.find({}).toArray(function (err, docs) {
        var name = docs[Math.floor(Math.random()*docs.length)]; 
        res.render('hello', name);
    });
});

app.get('*', function (req, res) {
    res.send("Page not found", 404);
});

mongoclient.open(function (err, mongoclient) {

    if (err) throw err;

    app.listen(8080);
    console.log("Express server started on port 8080");
});

