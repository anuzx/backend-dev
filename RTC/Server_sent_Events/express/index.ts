import express from "express";

const app = express();

app.get("/events", (req, res) => {
  // Required SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Flush headers immediately (important)
  res.flushHeaders?.();

  const interval = setInterval(() => {
    res.write(`data: ${Date.now()}\n\n`);
  }, 2000);

  // Cleanup when client disconnects
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(3000, () => console.log("server started at 3000"));

//flushHeaders() forces the server to immediately send HTTP response headers to the client, instead of waiting.