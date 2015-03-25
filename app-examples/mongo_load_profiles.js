// Use lemon-trainer db
conn = new Mongo();
db = conn.getDB("lemon-trainer");

// Load values for app_array.js
db.createCollection("profiles");
var dbcoll = db.getCollection("profiles");
var profilesArray = [ 
    { 
      "_id" : 1,
      "name" : {
	"first" : "Scott",
        "last" : "Russell"
      },
      "age" : 32,
      "beer" : "Blue Point Toasted Lager"
    },
    { 
      "_id" : 2,
      "name" : {
        "first" : "Krishna",
        "last" : "Sampath"
      },
      "age" : 34,
      "beer" : "Dale's Pale Ale"
    },
    { 
      "_id" : 3,
      "name" : {
        "first" : "Julio",
        "last" : "Mansilla"
      },
      "age" :  25,
      "beer" : "Guiness Draught Stout"
    },
    {
      "_id" : 4,
      "name" : {
        "first" : "Derek",
        "last" : "Koch"
      },
      "age" : 42,
      "beer" : "Allagash White"
    }
];

for (index in profilesArray) {    
    dbcoll.insert(profilesArray[index]);
};


