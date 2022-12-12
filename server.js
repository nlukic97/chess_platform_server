// const appMaker = require("./srcOldInJs/app")
const { appMaker } = require("./dist/app");

const app = appMaker();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
