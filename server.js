const app = require("./app");
const port = process.env.PORT;
const dbConnector = require("./config/dbConnector");

app.listen(port, async () => {
  console.log(`Server is Running on port ${port}`);
  await dbConnector();
});
