//selectors

//global variables
let firstName, lastName, id;
// creating an instance for socket io
const socket = io();
//updating the DOM with asynchronous javascript
//promises
let myPromise = new Promise(function (myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open("GET", "data/info.json");
  req.onload = function () {
    if (req.status == 200) {
      myResolve(req.response);
    } else {
      myReject("File not Found");
    }
  };
  req.send();
});
//if promise is successful then..
myPromise.then(
  function (value) {
    let serverDATA = JSON.parse(value);
    serverDATA.forEach((element) => {
      let row = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      td1.innerText = `${element.firstName}`;
      td2.innerText = `${element.lastName}`;
      td3.innerText = `${element.sentence}`;
      td4.innerText = `${element.date}`;
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      $("#data-table").append(row);
    });
    console.log(serverDATA);
  },
  function (error) {
    console.log(error);
  }
);
//jquery
$(document).ready(() => {
  $("#form").submit((e) => {
    e.preventDefault();
    //generating a random number as an id
    id = Math.floor(Math.random() * 1000 + 1);
    // showing the id to the console
    //console.log(id);
    // taking the input from the form element
    firstName = $("#first-name").val();
    lastName = $("#last-name").val();
    sentence = $("#sentence").val();
    //console.log(firstName, lastName);
    $("#first-name").val("");
    $("#last-name").val("");
    $("#sentence").val("");
    //emitting the data from the client side to the server side
    socket.emit("form-data", { id, firstName, lastName, sentence });
  });
});
//socket emitter
socket.on("connected", (data) => {
  console.log(data);
  $(".word-count").text(data);
});
//socket receiver
socket.on("newData", (information) => {
  //console.log(information);
  let row = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  td1.innerText = `${information.firstName}`;
  td2.innerText = `${information.lastName}`;
  td3.innerText = `${information.sentence}`;
  td4.innerText = `${information.date}`;
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  $("#data-table").append(row);
  $(".word-count").text(information.wordCount);
  //console.log(information.wordCount);
});
