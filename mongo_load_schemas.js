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
          "_id" : {
            "type" : "hidden"
          }
        },
        {
          "name" : [
            {
              "first" : {
                "type" : "text"
              }
            },
            {
              "last" : {
                "type" : "text"
              }
            }
          ]
        },
        {
          "age" : {
            "type" : "number"
          }
        },
        {
          "beer" : {
            "type" : "text"
          }
        },
        {
          "languages" : {
            "structure" : "array",
            "type" : "text"
          }
        }
      ] 
    },
    {
      "collection" : "counters",
      "fields" : [
        {
          "name" : {
            "type" : "text"
          }
        },
        {
          "seq" : {
            "type" : "text"
          }
        }
      ]
    }
];

for (index in schemasArray) {
    dbcoll.insert(schemasArray[index]);
};
 
