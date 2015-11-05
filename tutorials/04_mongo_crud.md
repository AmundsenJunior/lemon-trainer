# Mongo CRUD Operations and the ```mongo``` administrative shell

http://docs.mongodb.org/manual/crud/

***Open the ```mongo``` shell and activate the ```lemon-trainer``` db and ```profiles``` collection***
```
$ mongo
> show dbs
> use lemon-trainer
> show collections
> var dbcoll = db.profiles
```

## Read (```find```)

* ```find()```
* ```findOne()```
* ```.pretty()```
* query document
* query subdocuments
* query conditions
* logic operators
* specify return fields

#### Finds all documents in collection
  ```
  dbcoll.find()
  ```

#### Displays clean JSON formatted results
  ```
  dbcoll.find().pretty()
  ```

#### Finds first document in collection (automatically displays in "pretty" mode, as above)
  ```
  dbcoll.findOne()
  ```

#### Find first match on query with equality condition
  ```
  dbcoll.findOne({"languages" : "English"})
  ```

#### Find all matches on query with equality condition
  ```
  dbcoll.find({ "languages" : "Spanish" })
  ```

#### Find all matches on query with logic operators
  ```
  dbcoll.find({ "age" : {$gte : 32}})
  ```

#### Find all matches in subdocument
Where the above use of field names can be done with or without quotation marks, all mentions of embedded documents (or subdocuments) with [dot notation](http://docs.mongodb.org/manual/reference/glossary/#term-dot-notation) must be written within quotes, as these would be confused in JavaScript with linked method calls.
  ```
  dbcoll.find({ "name.first" : "Derek"})
  ```

#### Find documents matching on OR condition
  ```
  dbcoll.find( { $or : [ { "age" : 25 } , { "_id" : 2 } ] } )
  ```

#### Find documents and only show specified fields
  ```
  dbcoll.find( { "languages" : "Spanish" }, { "name" : 1, "age" : 1, "_id" : 0 } )
  ```

---

## Create (```insert```)

#### Create new document
  ```
  var newDoc = { "_id" : 6, name : { "first" : "Blake", "last" : "Praharaj" } }
  dbcoll.insert(newdoc)
  dbcoll.findOne( {"_id" : 6 } )
  ```

#### Duplicate key error

The ```_id``` field is a unique identifier for each document in a collection. When you insert new documents, by default MongoDB will assign a unique ObjectId hexadecimal value to the ```_id``` field, unless you instead provide a unique value with your insert statement, as we have done with the ```profiles``` collection. If, therefore, you try to insert a new document with an already existing ```_id``` value, ```mongo``` will return a "duplicate key error".

  ```
  dbcoll.insert( { "_id" : 6 , "name" : { "first" : "Nicole", "last" : "Flokos" } } )
  ```
  
  To create an incrementing ```_id``` field value with each insert, do the following (per [the MongoDB docs](http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/#auto-increment-counters-collection):

  1. Create a new collection, ```counters```, that tracks the latest inserted ```_id``` sequence value. We will initialize this document at a ```seq``` value of 6, to match our current ```profiles``` collection:
     ```
     db.counters.insert( { "_id" : "userid", "seq" : 6 } )
     ```

  2. Next, create a function that increments the ```seq``` value and returns it upon being called:
     ```
     function getNextSequence(name) {
       var ret = db.counters.findAndModify(
         {
           query : { "_id" : name },
           update: { $inc : { "seq" : 1 } },
           new : true
         }
       );
     
       return ret.seq;
     }
     ```
  3. To use this function, call it in place of a static value for the ```_id``` field when executing an ```insert```:
     ```
     dbcoll.insert( { "_id" : getNextSequence("userid"), "name" : { "first" : "Nicole", "last" : "Flokos" } } )
     dbcoll.insert( { "_id" : getNextSequence("userid"), "name" : { "first" : "Taiwo", "last" : "Togun" } } )
     ```

  *Note that upon exiting the ```mongo``` shell, this function will not be available upon returning.*

---

## Update (```update```)

#### Overwrite all ```beer``` fields for documents with ```"age" : 25```:
```
> dbcoll.update( { "age" : 25 },
    {
      $set : { 
        "beer" : "Yuengling American Lager" 
      }
    },
    { multi : true }
  )
> dbcoll.find( { "age" : 25 } )
```

#### Insert ```age```, ```beer```, and ```languages``` fields for the documents we inserted earlier:
```
> dbcoll.find( { "_id" : { $gt : 5 } } )
> dbcoll.update(
    { "_id" : { $gt : 5 } },
    { 
      $set : { 
        "age" : 23, 
        "beer" : "Sierra Nevada Torpedo IPA",
        "languages" : [
          "French",
          "Klingon",
          "Valyrian"
        ]
      }
    },
    { multi : true }
  )
> dbcoll.find( { "_id" : { $gt : 5 } } )
```

#### Update values in the ```languages``` array:
```
> dbcoll.find( { "languages" : "German" } )
> dbcoll.update( 
    { "languages" : "German" },
    { 
      $pull : {
        "languages" : "English"
      }
    },
    { multi : true }
  )
> dbcoll.update(
    { "languages" : "German" },
    { 
      $push : {
        "languages" : "The Queen's English"
      }
    },
    { multi : true }
  )
> dbcoll.update(
    { "languages" : "German" },
    { 
      $addToSet : {
        "languages" : "Japanese"
      }
    },
    { multi : true }
  )
> dbcoll.find( { "languages" : "German" } )
```

---

## Delete (```remove```)
The ```remove``` function will delete documents from the collection based on the one query argument passed to the function.
```db.collection.remove({})``` will delete all documents from the collection.
``` db.collection.remove( { field : "value" } )``` will remove all documents that match the query.


