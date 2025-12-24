Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/poll") {
      // simulate long polling (wait 3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return new Response(JSON.stringify({ message: "polling..." }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });
    }

    return new Response("server is up", { status: 200 });
  },
});

console.log("server running at 3000");
