
import http from "http"

const server = http.createServer((req, res) => {
    if (req.url === "/events"){
        res.writeHead(200, {
            "content-type": "text/event-stream",//streaming event (server keeps on sending events)
            "cache-control": "no-cache",
            "connection": "keep-alive" //imp
        })

        const interval = setInterval(() => {
            res.write(`date: ${Date.now()}\n\n `)
        }, 2000)

        // to clean the interval
        req.on('close', () => {
            clearInterval(interval)
            res.end()
        })
    } else {
        res.writeHead(200)
        res.end("server is up")
    }

})


server.listen(3000, () => console.log("server started at 3000"));

//res.write : can be called multiple times , require res.end to termiante the response
//used to send chunks of the response body to the client. It is primarily used for streaming data or sending a response in multiple parts


//curl http://localhost:3000/events