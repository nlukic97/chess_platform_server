import { appMaker } from "./app";

const app = appMaker();

if (process.env.PORT === undefined) {
  throw new Error("process.env.PORT is undefined.");
}
const port: String = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
