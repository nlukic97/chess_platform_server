// Nikola - not sure what type the "app" is
export function RouterInit(app) {
  app.get("/", (_, res) => res.status("200").end("The server is functioning."));
  app.get("*", (_, res) => res.status("404").end("Not found."));
}
