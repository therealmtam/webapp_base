## WEB APP SCAFFOLDING
  These instructions are for creating the scaffolding of a React + Node + Express + (Choice of DB(s)).

## Table of Contents
<a name="part1"></a>
[**PART I**](#1) - Development Setup:
1. [Create file structure](#1-1)
1. [Initialize Node Project](#1-2)
1. [Add scripts to package.json](#1-3)
1. [Add Webpack and Babel](#1-4)
1. [Add .gitignore file](#1-5)
1. [Add Airbnb ESLint](#1-6)

<a name="part2"></a>
[**PART II**](#2) - Technology Setup:
1. [Setup Express](#2-express)
1. [Setup React](#2-react)
1. [Setup Database](#2-database)
    1. [Setup MongoDB](#2-mongodb)
    1. [Setup PostgreSQL](#2-postgresql)
    1. [Setup Redis](#2-redis)
1. [Setup Mocha & Chai](#2-mocha)
1. [Setup Jest & Enzyme](#2-jest)

<a name="1"></a>
## Part I
  <a name="1-1"></a>
  - ([1](#part1)) Create the following File Structure:

    - `client`
      - `dist`  //folder contains all files that will be distributed
        - `index.html`
        - `style.css`
      - `src`
        - `components`  //folder to contains all React Components
        - `index.jsx` //file creates initial React component
    - `database`
      - `index.js`  //file contains CRUD functions and DB initialization
    - `server`
      - `index.js` //file contains routing and setting up server connection

  <a name="1-2"></a>
  - ([2](#part1)) Initialize node project by running:

    `npm init`

    >It creates the package.json file.
    To save dependencies and  development dependencies:

    - `npm install --save-dev ____`
    - `npm install --save ____`

    >What you specify as "main": in package.json will be the file that is searched for if you run nodemon without specifying the target (e.g., nodemon => will search for the "main" document to run);

  <a name="1-3"></a>
  - ([3](#part1)) Add scripts to package.json:

    ```javascript
    "scripts": {
      "start": "node server/index.js",
      "server": "nodemon server/index.js"  //make sure nodemon is npm installed
    }
    ```
  <a name="1-4"></a>
  - ([4](#part1)) Add Webpack to bundle React modules and Babel to transpile the modules before bundling:

    > Create a webpack.config.js file in the root directory with the following code:

    ```javascript
    const path = require('path');
    const SRC_DIR = path.join(__dirname, '/client/src');
    const DIST_DIR = path.join(__dirname, '/client/dist');

    module.exports = {
      entry: `${SRC_DIR}/index.jsx`,
      output: {
        filename: 'bundle.js',
        path: DIST_DIR
      },
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            include: SRC_DIR,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    };
    ```

    >Then npm install the following:

    ```javascript
    npm install --save-dev babel-core
    npm install --save-dev babel-loader
    npm install --save-dev babel-preset-es2015  //transpiles ES6 to ES5
    npm install --save-dev babel-preset-react   //transpiles JSX to JS
    npm install --save-dev webpack

    //OR
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack
    ```

    >Then add a script to package.json to run webpack:

    ```javascript
    "scripts": {
      "build": "webpack -p",
      "react-dev": "webpack -d --watch" //it is set to watch for automating bundling in development
    }
    ```
<a name="1-5"></a>
- ([5](#part1)) Add .gitignore file to ignore:

  - `node_modules`
  - `bundle.js`

<a name="1-6"></a>
- ([6](#part1)) Add Airbnb ESLint:

  >Create a .eslintrc.js file in the root directory and store the following:

  ```javascript
  module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "jsx-a11y",
        "react",
        "import"
    ]
  };
  ```

  >Then npm install the following:

  ```javascript
  npm install --save-dev eslint
  npm install --save-dev eslint-config-airbnb
  npm install --save-dev eslint-plugin-jsx-a11y
  npm install --save-dev eslint-plugin-import
  npm install --save-dev eslint-plugin-react  //React specific linting rules for ESLint https://github.com/yannickcr/eslint-plugin-react

  //OR
  npm install --save-dev eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react
  ```

  >Reference: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

  >[The ESlint extension in VScode will read the .eslintrc file and work.](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6)
  To disable the linter in any document of code, write the following at the top of the document:
  ```javascript
  /*eslint-disable */
  ```

<a name="2"></a>
## PART II
  <a name="2-express"></a>
  - [**Setup Express**](#part2)
    - (1) In <code>webapp > server > index.js</code>, scaffold the following:
      ```javascript
      // MODULES:
      const express = require('express');

      const app = express();
      //-------------------------------------------------------------------
      // HELPER MODULES:
      /*
        These modules are functions developed by us.
        Note: the relative file path.
      */
      const helperModule = require('./helpers/helper1.js');
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

      app.use(express.static(`${__dirname}/../client/dist`));
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

      //------------------------------------------
      app.get('/testget', (request, response) => {
        response.send('TEST /testget');
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
      const port = 3000;

      app.listen(port, () => {
        console.log(`Connected to http://127.0.0.1:${port}`);
      });
      ```

    - (2) For Additional Helpful Node Info, see the ever-evolving document

        in <code>webapp > server > helpfulNodeInfo.js</code>

  <a name="2-react"></a>
  - [**Setup React**](#part2)
    - (1) In index.html, add the initial element for React to target:
      ```html
      <div id="app"></div>

      <script type="text/javascript" src="bundle.js"></script>
      ```
      Make sure that bundle.js is AFTER the element. Otherwise if is is in
      the head, the html parser will read the bundle's React code but
      won't be able to find the targeted element on the DOM yet and throw a runtime error.

    - (2) In index.jsx, add the initial React script that renders the React Components
      ```javascript
      import React from 'react';
      import ReactDOM from 'react-dom';
      import App from './components/app.jsx';

      ReactDOM.render(<App /> , document.getElementById('app'));
      ```
      ...And npm install the modules:
      ```javascript
      npm install --save react
      npm install --save react-dom
      OR
      npm install --save react react-dom
      ```
      ...And create a <code>app.jsx</code> file in the <code>components</code> folder.

      App.jsx will be the initial React component.

    - (3) App.jsx scaffold:
      ```javascript
      import React, { Component } from 'react';
      import PropTypes from 'prop-types';
      import Component1 from './Component1.jsx';
      import Component2 from './Component2.jsx';

      /**
       * Description:
       * App component renders all views for the application.
       * Its State holds all data and disseminates it to all
       * React sub-components.
       *
       * @prop - none.
       */
      class App extends Component {
        constructor(props) {
          super(props);
          this.state = {
          };
        }

        //Fires before render()
        componentWillMount() {
        }

        //Fires after render()
        componentDidMount() {
        }

        //Test Function
        fn() {
          console.log('fn fired');
          this.setState({
            test: 'setting state',
          });
        }

        //Notes on Render Function:
        /* Make sure return has its opening parenthesis on the same line. */
        render() {
          return (
            <div>
              <h1>HELLO</h1>
              <Component1
                state={this.state}
                fn={this.fn.bind(this)}
              />
              <Component2
                list = {['1','2','3']}
                doThis = {()=>10}
                hashTable = {{obj:1}}
              />
            </div>
          )
        }
      }

      App.propTypes = {
      };

      export default App;
      ```
      Notes:
      - Add documentation to all functions and components
      - Add Prop Types and npm install the module
        ```javascript
        npm install --save prop-types
        ```
        Prop Types will throw warnings into the console in case
        an incorrect prop is passed in.

    - (4) For Additional Helpful React Info, see the ever-evolving document

        in <code>webapp > client > components > helpfulReactInfo.js</code>

  <a name="2-database"></a>
  - [**Setup Database**](#part2)

      <a name="2-mongodb"></a>
    - [**Setup MongoDB**](#part2)
      Use the MongoDB scaffolding in the MongoDB folder <code>database > mongodb</code>
      ```javascript
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
        read: read,
        create: create,
      };
      ```

      <a name="2-postgresql"></a>
    - [**Setup PostgreSQL**](#part2)
      Use Postgres scaffolding in the Postgres folder <code>database > postgres</code>.
      Note that the CRUD functions are located in each individual model instead of in
      the index.js file.
      ```javascript
      // README:
      // This file contains the initialization of the Postgres DB.
      // Import the models to access the CRUD functions for each table in the DB.
      // The models will use this file as a dependency.
      /*
        BEFORE USING:
        1) Make sure Postgres is installed.
          one source: https://gist.github.com/sgnl/609557ebacd3378f3b72

          Check by using:
          postgres -V (OR) postgres --version
          into the commandline.

        2) npm install the Sequalize ORM:
          npm install --save sequalize

        3) Before sequalize can connect to the DB, the DB must be
        created. Initially, there is no specific database for this
        application in Postgres. You must either create it manually
        via the commandline or by running a script that can execute
        sql commands and create the database.

          Option 1) via the commandline:
          > psql
          DefaultDB=# CREATE DATABASE <database name>;
          DefaultDB=# \q
      */
      //------------------------------------------

      const Sequelize = require('sequelize');
      const Config = require('../../config/config.js');

      // Parameters are database name, username ,password
      /*
      const sequelize = new Sequelize(`${database}`, `${username}`, `${password}`, {
        host: `${host}`,
        dialect: 'postgres',
        dialectOptions: {
          ssl: true,
          native: true,
        },
        pool: {
          max: 1000000,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
      */

      const sequelize = new Sequelize(`${Config.db.database}`, `${Config.db.username}`, `${Config.db.password}`, {
        host: `${Config.db.host}`,
        dialect: `${Config.db.dialect}`,
      });

      //------------------------------------------
      // CONNECTION TO POSTGRES DB
      sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch((err) => {
          console.error('Unable to connect to the database:', err);
        });

      //------------------------------------------
      module.exports = {
        Sequelize,
        DB: sequelize,
      };
      ```

      <a name="2-redis"></a>
    - [**Setup Redis**](#part2)
      Use Redis scaffolding in the Redis folder <code>database > redis</code>
      ```javascript
      //README:
      //This file contains database CRUD functions.
      /*
        BEFORE USING:
        1) Make sure Redis is installed.

        2) npm install the Redis client for Node:
          npm install --save redis

        3) Create a script in package.json to start Redis:

          "redis": "redis-server"

          Redis must be started before the server can connect to it.
      */
      //------------------------------------------
      const redis = require('redis');
      //------------------------------------------
      const client = redis.createClient();  //Note: Async process
      //------------------------------------------
      //CRUD FUNCTIONS:

      const create = (id, val, callback) => {
        client.set(id, val, (err, result) => {
          if (err) {
            console.log(err); // error handle
          }
          console.log('created new cache entry');
          if (callback) {
            callback(result);
          }
        });
      };

      const read = (id, callback) => {
        client.get(id, (err, result) => {
          if (err) {
            console.log(err); // error handle
          }
          callback(result);
        });
      };

      module.exports = {
        create: create,
        read: read,
      }
      ```

  <a name="2-mocha"></a>
  - [**Setup Mocha & Chai**](#part2)
    Use Mocha/Chai scaffolding in the db folder <code>test > db</code>.
    ```javascript
    // HELPFUL MOCHA CHAI TESTING INFO:
    //-----------------------------------------------
    // Instructions for using Mocha & Chai:
    /*
      1) npm install:

      npm install --save-dev mocha
      npm install --save-dev chai

      OR

      npm install --save-dev mocha chai

      2) Create a script in package.json to run all tests
      contained in the test > db folder:

      "test-db": "mocha -- tests/db/*.js"

      (Make sure to comment all text because the script will read
      this document as well)
    */
    //-----------------------------------------------
    ```
  <a name="2-jest"></a>
  - [**Setup Jest & Enzyme**](#part2)
    Use Jest/Enzyme scaffolding in the component folder <code>test > components</code>.
    ```javascript
    // HELPFUL REACT TESTING INFO:
    //-----------------------------------------------
    // Instructions for using Jest/Enzyme:
    /*
      References:
      https://facebook.github.io/jest/docs/en/webpack.html
      https://www.youtube.com/watch?v=bMmntkVM4wQ

      1) npm install:

        npm install --save-dev jest
        npm install --save-dev babel-jest  //this is so jest can read transpiled jsx
        npm install --save-dev enzyme
        npm install --save-dev enzyme-adapter-react-16
        npm install --save-dev identity-obj-proxy
        npm install --save-dev babel-plugin-transform-es2015-modules-commonjs

        OR

        npm install --save-dev jest babel-jest enzyme enzyme-adapter-react-16 identity-obj-proxy babel-plugin-transform-es2015-modules-commonjs

      2) Add the following to package.json:

        "dependencies": {
        }
        "devDependencies": {
        }
        "jest": {
          "moduleNameMapper": {
            "\\.css$": "identity-obj-proxy"
          },
          "setupFiles": [
            "raf/polyfill"
          ]
        }

      3) Create a .babelrc file in the root directory and insert the following:

      {
        "presets": ["react"],
          "env": {
          "test": {
            "plugins": ["transform-es2015-modules-commonjs"]
          }
        }
      }

      4) Create a script in package.json to run the Jest tests
      contained in the test > components folder:

        "test-jest": "jest"
    */
    //-----------------------------------------------
    ```

