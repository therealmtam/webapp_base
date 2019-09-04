// HELPFUL JQuery INFO:
//-----------------------------------------------
// GETTING STARTED:

  1) DOWNLOAD - via server or via CDN

    https://code.jquery.com/
  CDN:
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    OR
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  DOWNLOAD AND SERVER FROM YOUR SERVER:
    <script src="jquery-3.3.1.min.js"></script>

  2) Include the script to retrieve the library in the <head> tag of the document
  so that it can download and be available before your script files which should be placed
  at the base of the <body> tag.

  3) In your JS files, use the following event handler:

    $(document).ready(function(){
      //all jQuery methods
      //Set event listeners for On Click etc. in this callback
    });

    In order to make sure selectors fire only after the DOMContentLoaded event has fired.

      The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.A very different event load should be used only to detect a fully - loaded page.It is an incredibly popular mistake to use load where DOMContentLoaded would be much more appropriate, so be cautious.

    This makes sure the DOM has selectable nodes before any JS selects it. Otherwise, if the JS and the jQuery library are in the head tag, and the JS is loaded synchronously, blocking the parser, the script will execute the selector commands before before the HTML document is fully parsed and will return 'undefined' for any Selection.


//-----------------------------------------------
// USEFUL jQUERY:

  $('.<class>' or '#<id>' or 'div.<class>'...etc).<method>()...


  // METHODS:
  //-------------------------------------
  .html() - Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.

    ex. let x = $('div.app').html();
    //x = 'Hello! \n <p>Hello2</p> \n <p>Hello3</p> \n <p>Hello4</p> \n' since it is html inside the selected element

    <div class="app">
      Hello!
      <p>Hello2</p>
      <p>Hello3</p>
      <div>Hello4</div>
    </div>

  //-------------------------------------
  .text() - Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.

    ex. let x = $('div.app').text();
    //x = 'Hello!\nHello2\nHello3\nHello4' since it is all the text inside the selected element

    <div class="app">
      Hello!
      <p>Hello2</p>
      <p>Hello3</p>
      <div>Hello4</div>
    </div>
  //-------------------------------------

$("p").click(function () {
  var htmlString = $(this).html();
  $(this).text(htmlString);
});

var $newdiv1 = $("<div id='object1'></div>"),
  newdiv2 = document.createElement("div"),
  existingdiv1 = document.getElementById("foo");

$("body").append($newdiv1, [newdiv2, existingdiv1]);


//jQuery Short-hand AJAX
$.get("ajax/test.html", function (data) {
  $(".result").html(data);
  alert("Load was performed.");
});

//jQuery AJAX in REACT
loadCommentsFromServer: function() {
  $.ajax({
    url: this.props.url,
    dataType: 'json',
    cache: false,
    success: function (data) {
      this.setState({ data: data }); // Notice this
    }.bind(this),
    error: function (xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
}

//Creating elements and appending elements using different methods
function appendText() {
  var txt1 = "<p>Text.</p>";               // Create element with HTML
  var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
  var txt3 = document.createElement("p");  // Create with DOM
  txt3.innerHTML = "Text.";
  $("body").append(txt1, txt2, txt3);      // Append the new elements
}

//Dynanmic Page Selection without Page refresh
https://www.youtube.com/watch?v=ytKc0QsVRY4


$.get("/header", function (data) {
  callback(data);
});

$.ajax({
  url: `http://localhost:3000/${endpoint}`,
  success: function (data) {
    callback(data);
  }
});


//AJAX - Asynchronous XML and Javascript

Ajax is intended to allow web pages to make calls to the server and retreive data without
having to refresh the page to change state.

Ajax can be used to create a single page application by using .load()

$( "#result" ).load( "ajax/test.html" );
//it retrieves data from ajax/test.html endpoint and sets the contents of the selector to the new html