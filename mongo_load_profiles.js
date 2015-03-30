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
      "beer" : "Blue Point Toasted Lager",
      "languages" : [
        "English",
        "French",
        "German"
      ]
    },
    { 
      "_id" : 2,
      "name" : {
        "first" : "Krishna",
        "last" : "Sampath"
      },
      "age" : 34,
      "beer" : "Dale's Pale Ale",
      "languages" : [
        "Spanish",
        "English",
        "Russian",
        "Hindi"
      ]
    },
    { 
      "_id" : 3,
      "name" : {
        "first" : "Julio",
        "last" : "Mansilla"
      },
      "age" :  25,
      "beer" : "Guiness Draught Stout",
      "languages" : [
        "Spanish",
        "English",
        "Portuguese",
        "Arabic"
      ]
    },
    {
      "_id" : 4,
      "name" : {
        "first" : "Derek",
        "last" : "Koch"
      },
      "age" : 42,
      "beer" : "Allagash White",
      "languages" : [
        "English",
        "Japanese",
        "German"
      ]
    },
    {
      "_id" : 5,
      "name" : {
        "first" : "Chris",
        "last" : "Impastato"
      },
      "age" : 25,
      "beer" : "Two Roads Honeyspot Road White IPA",
      "languages" : [
        "English",
        "Afrikaans",
        "Swedish"
      ]
    }
];

for (index in profilesArray) {    
    dbcoll.insert(profilesArray[index]);
};


