const express = require("express")
const http = require("http")
const url = require("url")
const WebSocket = require("ws")

const app = express()
const server = http.createServer(app)
const io = new WebSocket.Server({ server })

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"))

io.on('connection', socket => {
  console.log("Client has connected!")
  socket.on('message', data => {
    console.log("New message!")
    io.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});


server.listen(process.env.PORT,  () => {
    console.log(`Server is running on port 3000`)
})

