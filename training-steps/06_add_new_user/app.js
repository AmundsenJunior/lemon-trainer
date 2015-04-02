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

// Set calls to collections
var profiles = db.collection('profiles');
var counters = db.collection('counters');
var schemas = db.collection('schemas');

// Open index list page of all users
app.get('/', function (req, res) {
    profiles.find({}, {"_id" : 1, "name" : 1}).toArray(function (err, users) {
        res.render('index', { users : users });
    });
});

// Open add new user page
app.get('/users/add_new_user', function (req, res) {
    schemas.findOne({"collection" : "profiles"}, {fields : {"_id" : 0, "fields" : 1}}, function (err, fields) {
        res.render('new_user', { 
            title : "Add a New A100 User Profile",
            fields : fields.fields
        });
    console.log(fields.name);
    console.log(fields.fields);
    });
});

// Open profile page for selected user
app.get('/users/:id', function (req, res) {
    profiles.findOne({ "_id" : Number(req.params.id) }, function (err, user) {
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

