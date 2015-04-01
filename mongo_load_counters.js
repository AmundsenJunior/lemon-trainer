// Use lemon-trainer db
conn = new Mongo();
db = conn.getDB("lemon-trainer");

// Load counters values
db.createCollection("counters");
var dbcoll = db.getCollection("counters);

// seq value here should match highest _id value in profilesArray
// in the mongo_load_profiles.js script
var countersArray = [
    {
      "name" : "userid",
      "seq" : 5
    }
];

for (index in countersArray) {
    dbcoll.insert(countersArray[index]);
};

