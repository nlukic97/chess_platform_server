export function Router(app, __dir) {
  app.get("*", (req, res) => res.status("404").end("Not found."));
}
