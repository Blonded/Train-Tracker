// firebase
var config = {
    apiKey: "AIzaSyCwYyAxPb23sUBo5nY56Z-J2ZrbVfRi36s",
    authDomain: "train-tracker-6b699.firebaseapp.com",
    databaseURL: "https://train-tracker-6b699.firebaseio.com",
    projectId: "train-tracker-6b699",
    storageBucket: "",
    messagingSenderId: "903485904165"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


// submission button for information added in the input
$('#submitButton').on('click', function(event) {
  // keeps the page from refreshing when the button is clicked
event.preventDefault();
console.log("we got clicked!");

//storing inputs into an object using jquery 
// .trim is to trim whatever value the user inputs on the page.
    var thingTOSave =  {
        name: $('#train-name-input').val().trim(),
        destination: $('#destination-input').val().trim(),
        frequency: $('#frequency-input').val().trim(),
        trainStart: $('#start-input').val().trim(),
    }

  // to save to firebase
  database.ref('/trains').push(thingTOSave);

    
})


//grabbing out of firebase database
  database.ref('/trains').on('child_added', function(childSnapshot) {

// split the train time by the ':' symbol to decipher what is hours and what is minutes.
    var splitTIme =  childSnapshot.val().trainStart.split(':');

    //test
    // console.log('start time', splitTIme[1]);

    //using moment.js to create timing calculations

//train start time
    var trainStartTime = moment().hours(splitTIme[0]).minutes(splitTIme[1])

    var minutesDifference = moment().diff(trainStartTime, "minutes")

    var remainder = minutesDifference % childSnapshot.val().frequency

    var minuteUntil = childSnapshot.val().frequency - remainder

    // test
    // console.log('how many minutes until next train!!', minuteUntil);

// appending data to the page, on the table rows/heading, while 'adding child' to the firebase database
// this will make it so all of your data is stored and will be there when the page is refreshed.

$("#placeToAppend").append("<tr><th>"+  childSnapshot.val().name +"</th><th>"+  childSnapshot.val().destination + "</th><th>"+  childSnapshot.val().frequency +"</th><th>" + childSnapshot.val().trainStart + "</th><th>" + minuteUntil + "</th></tr>");
     console.log('from the database', childSnapshot.val());

  })