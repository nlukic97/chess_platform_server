"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = (0, app_1.appMaker)();
if (process.env.PORT === undefined) {
    throw new Error("process.env.PORT is undefined.");
}
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
