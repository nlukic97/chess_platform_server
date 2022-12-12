// const appMaker = require("./srcOldInJs/app")
const appMaker = require("./public/app")

const app = appMaker()
const port = process.env.PORT || 8081

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});