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
        "_id",
        {
          "name" : [
            "first",
            "last"
          ]
        },
        "age",
        "beer",
        "languages"
      ] 
    },
    {
      "collection" : "counters",
      "fields" : [
        "name",
        "seq"
      ]
    }
];

for (index in schemasArray) {
    dbcoll.insert(schemasArray[index]);
};
 
