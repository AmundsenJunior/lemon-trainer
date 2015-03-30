var express = require('express'),
    app = express(),
    cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

app.get('/', function (req, res) {
    res.render('index', { 'name' : 'Swig' });
});

app.get('/user/:name', function (req, res) {
    res.render('index', { 'name' : req.params.name });
});

app.get('*', function (req, res) {
    res.send("Page not found", 404);
});

app.listen(8080);
console.log("Server running at http://localhost:8080");

