export function Router(app, __dir) {
  app.get("/", (_, res) => res.status("200").end("The server is functioning."));
  app.get("*", (_, res) => res.status("404").end("Not found."));
}
