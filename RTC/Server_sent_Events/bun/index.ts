Bun.serve({
  port: 3000,

  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/events") {
      const stream = new ReadableStream({
        start(controller) {
          // send data every 2 seconds
          const interval = setInterval(() => {
            const data = `data: ${Date.now()}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));
          }, 2000);

          // cleanup when client disconnects
          req.signal.addEventListener("abort", () => {
            clearInterval(interval);
            controller.close();
          });
        },
      });

      return new Response(stream, {
        headers: {
          "content-type": "text/event-stream",
          "cache-control": "no-cache",
          connection: "keep-alive",
        },
      });
    }
    else {
        return new Response("server is up");
      }

    
  },
});

console.log("server started at 3000");

//When you create a ReadableStream, JavaScript gives you a controller.The controller is your remote control for the stream. It lets you send data and stop stream