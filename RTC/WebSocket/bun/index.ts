Bun.serve({
  port: 8080,

  // REQUIRED for TypeScript
  fetch(req) {
    return new Response("WebSocket server");
  },

  websocket: {
    open(ws) {
      console.log("user connected");
    },

    message(ws, message) {
      // Bun sends string | Uint8Array
      const msg =
        typeof message === "string"
          ? message
          : new TextDecoder().decode(message);

      if (msg === "ping") {
        ws.send("pong");
      }
    },

    close(ws) {
      console.log("user disconnected");
    },
  },
});

console.log("server running at port 8080");
