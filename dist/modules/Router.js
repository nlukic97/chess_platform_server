"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterInit = void 0;
// Nikola - not sure what type the "app" is
function RouterInit(app) {
    app.get("/", (_, res) => res.status("200").end("The server is functioning."));
    app.get("*", (_, res) => res.status("404").end("Not found."));
}
exports.RouterInit = RouterInit;
