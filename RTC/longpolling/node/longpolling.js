import http from "http"

const server = http.createServer((req, res) => {
    if (req.url === "/poll") {
        setTimeout(() => {
          res.writeHead(200, {
            "content-type": "application/json",
          });
            res.end(JSON.stringify({
                message:"polling..."
            }))
        }, 3000);
    } else {
        res.writeHead(200)
        res.end("server is up")
    }
})

server.listen(3000 , ()=>console.log("server running at 3000"))

//res.writehead(statuscode , statusmessage, headers)

//Content-Type is an HTTP response header that tells the client:

// “What kind of data am I sending you?”
// So the client knows how to parse the response body.

//code from the client side to hit the end point every 5 sec ,simulation of how actual long polling works:

// import axios from "axios";

// async function longPoll() {
//   try {
//     const res = await axios.get("http://localhost:3000/poll");
//     console.log(res.data);
//   } catch (err) {
//     console.error("Error:", err.message);
//   }

//   // wait 5 seconds AFTER response
//   setTimeout(longPoll, 5000);
// }

// longPoll();

