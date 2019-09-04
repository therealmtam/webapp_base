// MODULES:
const express = require('express');

const app = express();
//-------------------------------------------------------------------
// HELPER MODULES:
/*
  These modules are functions developed by us.
  Note: the relative file path.
*/
const HelperModule = require('./helpers/helper1.js');
//-------------------------------------------------------------------
// MIDDLEWARE USED PRIOR TO ALL ROUTING:
/*
  example) app.use(<function to use>);
  Note: middleware must be loaded first, and must include next() to pass the request
  to the next middleware function in the call stack.

  express.static is needed if you want to send not only the HTML, but also
  bundle.js, style.css, and other static assets in one go. Otherwise, fs.readfile
  for each file is the only other option.
*/

console.log(__dirname);

// app.use(express.static(`${__dirname}/../../client/plainHtml/dist`));
app.use(express.static(`${__dirname}/../../client/reactApp/dist`));

//-------------------------------------------------------------------
// ROUTES:
/*
  example) app.get('/', <middleware function(s)>, (req, res) => {});

  Common Status Codes:
  200 - OK - Req has succeeded. Typically used after GET
  201 - Created - Req has successfully created __. Typically used after POST or PUT
  301 - Moved Permanently - Endpoing has been reassigned. The new URI is returned
  400 - Bad request - Req has invalid syntax.
  404 - URL is not recognized (ie. endpoint not valid)

  If .status() is omitted, the response status will default to typical values:
  ex. GET's response.send() = status 200 / response.redirect() = status 301

  Use .status() to send a different status code:
  ex. GET's response.status(500) = will show on the client as Internal Server Error
*/

const fs = require('fs');

//------------------------------------------
app.get('/testget', (request, response) => {

    //the other way of returning static assets is to read the data from the file(s) and send it.
    const data = fs.readFileSync(`${__dirname}/../../client/plainHtml/dist/index.html`, { encoding: 'utf8'});

    response.status(200).send(data);
});
//------------------------------------------
app.post('/testpost', (request, response) => {
  response.redirect('/');
});
//------------------------------------------
app.get('/test/:id', (request, response) => {
  response.send(request.params.id);
});

//-------------------------------------------------------------------
// SETUP CONNECTION TO SERVER:
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected to Port ${port}`);
});
