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
