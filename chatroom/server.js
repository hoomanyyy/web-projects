const express = require("express")
const app = express()
const {Server} = require("socket.io")
app.use(express.static("public"))
const server = app.listen(3000 , () => {
    console.log("server is listening on port 5000")
})
app.get("/" , (req , res) => {
    res.sendFile("index.html")
})
let users = []
const io = new Server(server)
online_users = 0
io.on("connection" , (socket) => {
    console.log("connected: " , socket.id)
    online_users += 1
    socket.emit("online_users" , online_users)
    users.push(socket.id)
    console.log(users)
    socket.on("Message" , (value) => {
        console.log("Recived Message: " , value)
        socket.broadcast.emit("SendMessage" , value)
    })
})