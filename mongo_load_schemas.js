// Use lemon-trainer db
conn = new Mongo();
db = conn.getDB("lemon-trainer");

// Create and load schemas collection
db.createCollection("schemas");
var dbcoll = db.getCollection("schemas");

var schemasArray = [
    {
      "collection" : "profiles",
      "fields" : [
        {
          "name" : "_id",
          "type" : "hidden"
        },
        {
          "name" : "name",
          "structure" : "subdocs",
          "subdocs" : [
            {
              "name" : "first",
              "type" : "text"
            },
            {
              "name" : "last",
              "type" : "text"
            }
          ]
        },
        {
          "name" : "age",
          "type" : "number"
        },
        {
          "name" : "beer",
          "type" : "text"
        },
        {
          "name" : "languages",
          "structure" : "array",
          "type" : "text"
        }
      ]
    },
    {
      "collection" : "counters",
      "fields" : [
        {
          "name" : "name",
          "type" : "text"
        },
        {
          "name" : "seq",
          "type" : "text"
        }
      ]
    }
];

for (index in schemasArray) {
    dbcoll.insert(schemasArray[index]);
};
 
