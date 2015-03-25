// Use lemon-trainer db
conn = new Mongo();
db = conn.getDB("lemon-trainer");

// Load values for app_array.js
db.createCollection("names");
var dbcoll = db.getCollection("names");
print(coll);
var nameArray = [ "MongoDB", "NodeJS", "ExpressJS", "Swig Templating Engine", "GoHardJS" ];
for (index in nameArray) {    
    dbcoll.insert({ "name" : nameArray[index] });
};

