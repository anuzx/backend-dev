import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("user connected");
    
    ws.on("message", (data) => {
        if (data.toString() === "ping") {
            ws.send("pong")
        }
    })
});

console.log("server running at port 8080")