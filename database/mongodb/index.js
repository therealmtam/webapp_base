// README:
// This file contains database CRUD functions.
/*
  BEFORE USING:
  1) Make sure MongoDB is installed.

  2) npm install Mongoose ODM:
    npm install --save mongoose

  3) Create a data folder to store the data that will be stored into
    MongoDB:

    database > data

  4) Create a script in package.json to start MongoDB and to point it
    to store data into the data folder:

    "mongo": "mongod --dbpath ./database/data"

    MongoDB must be started before the server can connect to it.

*/
//------------------------------------------
const mongoose = require('mongoose');
//------------------------------------------
// Connect to MongoDB locally:
/*
  This is the minimum needed to connect the myapp database running locally
  on the default port(27017)

  Note: The endpoint (in this case is myapp) becomes the database name
  that is shown when accessing Mongo via the CLI. Also, connect is an async
  operation that also can have a callback => ...connect('___', callback);
*/

mongoose.connect('mongodb://localhost/myapp');
//------------------------------------------
// Define the schema using the Schema Class:

const Schema = mongoose.Schema;

const documentSchema = new Schema({
  fileId: { type: Number, index: true },
  fileName: String,
  fileType: String,
});

//------------------------------------------
// Create document collections of a specific document schema:

const ModelInCollection1 = mongoose.model('collection1', documentSchema);
//------------------------------------------
// CRUD FUNCTIONS:

const create = (fileId, fileName, fileType) => {
  const model = new ModelInCollection1();
  model.fileId = fileId;
  model.fileName = fileName;
  model.fileType = fileType;

  model.save((err, result) => {
    if (err) {
      console.log(err); // error handle
    }
    console.log('Done ', result);
  });
};

const read = (id, callback) => {
  ModelInCollection1.find({ file_id: id }).exec().then((err, result) => {
    if (err) {
      console.log(err); // error handle
    }
    callback(result);
  });
};

module.exports = {
  read,
  create,
};
