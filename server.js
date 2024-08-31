const express = require("express")
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('Client connected')

    socket.on('disconnect', ()=>{
        console.log('Client disconnected now')
    })

    socket.on('message', msg => {
        io.emit('message', msg)
    })
})

// app.listen(port, ()=>{
//     console.log(`App listening on port ${port}`)
// })
http.listen(port, ()=>{
    console.log(`App listening on port ${port}`)

})