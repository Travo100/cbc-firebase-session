// Initialize Firebase
var config = {
    apiKey: "AIzaSyAARehyngOtOOcyaYQGIYt6I7FgzuQoa6o",
    authDomain: "cbc-extended-session.firebaseapp.com",
    databaseURL: "https://cbc-extended-session.firebaseio.com",
    projectId: "cbc-extended-session",
    storageBucket: "",
    messagingSenderId: "316492141487"
};
firebase.initializeApp(config);

// connect to firebase
var database = firebase.database();

// Get user info from the form 
$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var user = {
        username: $("#username").val().trim(),
        email: $("#email").val().trim(),
        password: $("#pwd").val().trim()
    };

    console.log(user);
    // Send that info to firebase
    // set will override our users 
    // to add multiple records we have to push
    database.ref().push(user);

    // clear out input fields
    $("#username").val("");
    $("#email").val("");
    $("#pwd").val("");
});

// get data from firebase
// value gets up everything in the database
// where child_added will get us each record
// one at a time
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    // make a dynamic <tr> element in jQuery
    var tr = $("<tr>");
    var td1 = $("<td>").text(snapshot.val().username);
    var td2 = $("<td>").text(snapshot.val().email);
    tr.append(td1, td2);
    // display data in the table 
    $("tbody").append(tr);
});