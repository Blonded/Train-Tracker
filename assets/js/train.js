console.log('ready!')


var config = {
    apiKey: "AIzaSyCwYyAxPb23sUBo5nY56Z-J2ZrbVfRi36s",
    authDomain: "train-tracker-6b699.firebaseapp.com",
    databaseURL: "https://train-tracker-6b699.firebaseio.com",
    projectId: "train-tracker-6b699",
    storageBucket: "",
    messagingSenderId: "903485904165"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

  var dataArray = []
  console.log('this is our array of data at the beginning', tomDataArray)
 


$('#submitButton').on('click', function() {
console.log("we got clicked!");

    var thingTOSave =  {
        name: $('#train-name-input').val(),
        destination: $('#destination-input').val(),
        frequency: $('#frequency-input').val(),
        trainStart: $('#start-input').val(),
    }

     // to save to firebase
  database.ref('/trains').push(thingTOSave);
  //tomDataArray.push(thingTOSave)

    console.log('this is our array of data!', dataArray);
})




//grabbing out of firebase database
  database.ref('/trains').on('child_added', function(childSnapshot) {


    console.log('from the database', childSnapshot.val());

    //append childSnapshot.val().name to htmlpage
  })