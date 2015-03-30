// Load dependencies
var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

// Set Swig access to stored views of html-type templates
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

// Set connection to MongoDB
var mongoclient = new MongoClient(new Server('localhost', 27017,
                                             { 'native_parser' : true }));
var db = mongoclient.db('lemon-trainer');
var collection = db.collection('profiles');

// Open index list page of all users
app.get('/', function (req, res) {
    collection.find({}, {"_id" : 1, "name" : 1}).toArray(function (err, users) {
        res.render('index', { users : users });
    });
});

// Open profile page for selected user
app.get('/users/:id', function (req, res) {
    collection.findOne({ "_id" : Number(req.params.id) }, function (err, user) {
        res.render('profile', { user : user });
    });
});

// Page not found
app.get('*', function (req, res) {
    res.send("Page not found", 404);
});

// Run server
mongoclient.open(function (err, mongoclient) {

    if (err) throw err;

    app.listen(8080);
    console.log("Express server started on port 8080");

});

