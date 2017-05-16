
var config = {
  apiKey: "AIzaSyDdHq3pquTHo6mG1xyu42JHGL_-P_UHMKQ",
  authDomain: "trains-d2482.firebaseapp.com",
    databaseURL: "https://trains-d2482.firebaseio.com",
    projectId: "trains-d2482",
    storageBucket: "trains-d2482.appspot.com",
    messagingSenderId: "617868903560"
  };

firebase.initializeApp(config);

var trainData = firebase.database();


$("#add-train-btn").on("click", function() {


  var trainName = $("#train-name-input").val().trim();
  var target = $("#target-input").val().trim();
  var firstTrainOS = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();

  
  var newTrain = {

    name: trainName,
    target: target,
    firstTrain: firstTrainOS,
    frequency: frequency
  };

  
  trainData.ref().push(newTrain);

 
  console.log(newTrain.name);
  console.log(newTrain.target);
  console.log(firstTrainOS);
  console.log(newTrain.frequency);

  
  alert("Train successfully added");

 
  $("#train-name-input").val("");
  $("#target-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  // Determine when the next train arrives.
  return false;
});


trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().target;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

 
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;


  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

 
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

