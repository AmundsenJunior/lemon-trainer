var MongoClient = require('mongodb').MongoClient;

// Open the connection to the server
MongoClient.connect('mongodb://localhost:27017/lemon-trainer', function(err, db) {
    if(err) throw err;

    // Find one document in our collection
    db.collection('profiles').findOne({}, function(err, doc) {

        if(err) throw err;

        // Print the result
        console.dir(doc);

        // Close the db
        db.close();
    });

    // Declare success
    console.dir("Called findOne!");
});

