var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
const socket = require("socket.io");
var app = express();
app.use(express.static('assets'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://", host, port)
});

app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/" + 'index.html' );
});
// app.get('/node_modules/*', function (req, res) {
//   res.sendFile( __dirname +  "/node" + 'index.html' );
// });


const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  socket.on("send-message", function (data) {
    // io.emit("new-notification", data);
    socket.broadcast.emit("new-message", data)
  });

  socket.on("comment", (msg) => {
    socket.broadcast.emit("new-notification", msg)
  });
  socket.on("savePost", (msg) => {
    socket.broadcast.emit("new-notification", msg)
  });

});
