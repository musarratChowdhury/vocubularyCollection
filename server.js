//requiring different modules here
const express = require("express");
const path = require("path");
const app = express(); //creating an app instance from express module 🎉
const fs = require("fs");
const server = require("http").Server(app);
const io = require("socket.io")(server);

//variables
const port = 3000;
let words;
let word_count = 0;

app.use(express.static(path.join(__dirname, "./")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
  console.log(`new socket connected ${socket.id}`);

  //
  //lets count the current total word;
  fs.readFile("./data/info.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      words = JSON.parse(data);
      word_count = words.length;
      //console.log(word_count);
      //sending the total number of words to the client side
      socket.emit("connected", word_count);
    }
  });

  //
  socket.on("form-data", (data_server) => {
    fs.readFile("./data/info.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        const information = JSON.parse(data);
        //before pushing the new data we need to do some checks like if it is a duplicate data or entered before

        //lets take the present date
        let today = new DateFormatter(Date());
        data_server.date = today.getFormattedDate();
        //we can also insert the current word count

        information.push(data_server);
        data_server.wordCount = information.length;
        //console.log(information.length);

        fs.writeFile(
          "./data/info.json",
          JSON.stringify(information, null, 4),
          (err) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log("json updated!!");
            }
          }
        );
        // now we want to inform the client about the update

        socket.emit("newData", data_server);
      }
    });
  });
});

server.listen(process.env.PORT || port, () => {
  console.log(`Express server running on ${process.env.PORT || port}`);
});

//our date formatter
class DateFormatter extends Date {
  getFormattedDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
  }
}
