//server side code

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 })

//whenever there is a connection call a fn 
wss.on("connection", (ws) => {
    console.log("user connected")

    ws.send("hello")//if the connection is made send this to client 

    //when a client send message
    ws.on("message", (data) => {
        //we have to stringify this data argument or else it shows buffer data
        console.log(data.toString())
    })
})


console.log(`ws server at port 8080`);
