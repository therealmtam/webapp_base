// HELPFUL MONGODB INFO:
//-----------------------------------------------
// General Notes:

  1) When MongoDB starts, it won't create all the collections
  until a document is stored in that collection.

  2) MongoDB stores data via models that represent different
  types of documents and have a certain schema. For each document
  type, there needs to be an associated schema (1 model : 1 schema).

  The process of creating collection is as follows:
  create a schema > create a model using the schema. This process then
  creates a collection in the database that will contain documents that
  use that model. Anything stored that uses that model will be a part of
  that collection of documents.

//-----------------------------------------------
// HOW TO ACCESS MONGODB VIA TERMINAL:

  After you have already started the DB via:

    > mongod --dbpath ./database/data

  you can access MongoDB via:

    > mongo

  Commands:
  (Reference: https://docs.mongodb.com/manual/reference/mongo-shell/)

  > show databases  //this shows the different databases
  > use <database name> //switches you to the db
  > show collections //shows the collections
  > db._<collection name>_.find({ <any query criteria> }) //finds all the records in the collection
  > db.dropDatabase() //drops the current database
//-----------------------------------------------
// HOW TO OPEN AND CLOSE A MONGODB CONNECTION:

  Open: mongoose.connect('mongodb://localhost/myapp');
  Close: mongoose.connection.close();

  Note that Opening a connetion to MongoDB is an async operation.
  Therefore, there is a callback parameter that can be used for
  functions that need to be called after opening a connection such
  as when writing a script to open a connection, seed the db, then
  close:

  mongoose.connect('mongodb://localhost/myapp', <insert callback function here> );

//-----------------------------------------------
// HOW TO CLEAR THE CONTENTS IN A COLLECTION, SCRIPT:
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const documentSchema = new Schema({
  fileId: {type: Number, index: true },
  fileName: String,
  fileType: String,
});
const ModelInCollection1 = mongoose.model('collection1', documentSchema);
const DeleteAll = function () {
  mongoose.connect('mongodb://localhost/myapp', () => {
    ModelInCollection1.remove({}).exec().then(result => {
      console.log('Removed Collection1', result.result);
    }).then(mongoose.connection.close());
  });
};
DeleteAll();

//-----------------------------------------------
// DEPLOYMENT NOTES:

1) To run the mongo daemon, use the following command:

  > mongod --dbpath ./database/data --fork --logpath /dev/null

  (Reference: https://stackoverflow.com/questions/15963147/install-mongodb-child-process-failed-exited-with-error-number-100)

2) To kill the daemon, run:

  > mongod --shutdown --dbpath ./database/data

  (Reference: https://docs.mongodb.com/master/tutorial/manage-mongodb-processes/)

3) To install MongoDB on a linux comp:

  > sudo apt-get install mongodb
  > sudo apt-get update
  (Reference: https://www.youtube.com/watch?v=WH5GgHaEy7E&t=189s)

