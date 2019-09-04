// HELPFUL REACT NATIVE INFO:

//-----------------------------------------------
// NOTES:

  //Differences between React Native and Android Studio:
    - you don't need to compile the code to run it in simulator. You can just hit CMD-R to refresh the view with the new code.

  //Development in React-Native:
  1) npm install into the global scope, react-native-cli

    > npm install -g react-native-cli

  2) install yarn into the global scope:

    > npm install -g yarn

  3) Initialize the app: (this uses yarn to initialize the app)

    > react-native init _your app name_(e.g. myapp)_

  4) Cd into the app you just initialized and then run the React Packager which allows you to run the app in simulator:

    > cd myapp
    > react-native start

  5) Then to open up the initialized app:
    (in a new terminal)
    > react-native run-ios (or)  > react-native run-android

    //this will set the Platform.select property in React native to either ios or android, and if embedded into the App.js code (the initial file's code) you can toggle different features for the different app types.

  6) Use VScode to edit the code in myapp (or whatever name the app is)

  //------------------------------
  Setup for Android Development on Mac the step are:
  - Install Android Studio
  - Download the SDK 6.0 (Android Marshmallow) and its build tools and other related items for rendering a virtual device.
  - Create a virtual device through Android Studio
  - Run 'react-native run-android' command within your app folder

  Follow the instructions until 9:50 in this tutorial:

  https://www.youtube.com/watch?v=Q0dERWCzoi0

  And supplement with:

  https://facebook.github.io/react-native/docs/getting-started.html

  (select the Android and Mac setting to see the instructions for Android setup on a Mac.)

  Then go to step (5) above to run react-native run-android once an android virtual device is available to display the react-native code.

  //------------------------------
  For the console run the following command in the terminal:

    > react-native log-android

    This will then output console.logs to the terminal.
  //------------------------------
  // Limitations:
    Certain styling attributes are not available on all elements.

    Example:
      <View style={{color: 'red'}}></View>
      //color is not a valid attribute of View elements but it is on text elements
      <Text style={{color: 'red'}}></Text>
