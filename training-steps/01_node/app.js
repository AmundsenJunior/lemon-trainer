// add node's http library
var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello, A100 2015 Winter Cohort\n");
});

server.listen(8080);

console.log("Server running at http://localhost:8080");


